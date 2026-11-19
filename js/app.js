{
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const hl=s=>esc(s).replace(/\{([^}]+)\}/g,'<span class="hl">$1</span>');
const plain=s=>String(s).replace(/[{}]/g,"").replace(/<[^>]+>/g," ");
const norm=s=>String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/đ/g,"d");
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const SPK='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H2v6h4l5 4V5z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M19 5a10 10 0 0 1 0 14"/></svg>';
const sayBtn=t=>`<button class="say" data-act="say" data-t="${esc(plain(t))}" aria-label="Nghe phát âm" title="Nghe">${SPK}</button>`;
const DAY=864e5, IV=[0,1,3,7,14,30];

/* ---------- lưu trữ ---------- */
const KEY="topik2-advanced-v1";
const S={theme:"",rate:1,srs:{},gram:{},mistakes:[],tests:[],days:[],drafts:{},lib:{tr:[],ip:[]},tr:{},ip:{}};
try{const o=JSON.parse(localStorage.getItem(KEY)||"null");if(o&&typeof o==="object")Object.assign(S,o)}catch(e){}
if(!S.lib||typeof S.lib!=="object")S.lib={tr:[],ip:[]};S.lib.tr=S.lib.tr||[];S.lib.ip=S.lib.ip||[];S.tr=S.tr||{};S.ip=S.ip||{};
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){toast("Không lưu được — bộ nhớ trình duyệt có thể đã đầy.")}};

/* ---------- bài biên dịch / phiên dịch: dữ liệu repo + bài tự nhập ---------- */
const allTR=()=>(typeof TRANSLATIONS!=="undefined"?TRANSLATIONS:[]).concat(S.lib.tr);
const allIP=()=>(typeof INTERPRETS!=="undefined"?INTERPRETS:[]).concat(S.lib.ip);
TOPICS.push({id:"tl",name:"Từ bài biên – phiên dịch",ko:"번역·통역"});
/* Đưa từ vựng trong phần tổng hợp của mọi bài vào kho từ vựng chung (flashcard, tìm kiếm) */
function mergeVocab(){const have=new Set(VOCAB.map(v=>v.w)),added=[];
 allTR().concat(allIP()).forEach(it=>(it.vocab||[]).forEach(x=>{if(!x||!x.ko||have.has(x.ko))return;have.add(x.ko);
  const v={t:"tl",w:x.ko,h:x.hv||"",m:(x.vi||"")+(x.en?" ("+x.en+")":""),s:x.syn||"",a:x.ant||"",c:Array.isArray(x.str)?x.str:(x.str?[x.str]:[]),e:(x.ex&&x.ex[0])||"",ev:(x.ex&&x.ex[1])||"",src:it.title};
  VOCAB.push(v);added.push(v)}));return added}
mergeVocab();
const dkey=d=>d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");
const today=()=>dkey(new Date());
const touch=()=>{if(!S.days.includes(today())){S.days.push(today());save()}};
const streak=()=>{const set=new Set(S.days);const d=new Date();if(!set.has(dkey(d)))d.setDate(d.getDate()-1);let n=0;while(set.has(dkey(d))){n++;d.setDate(d.getDate()-1)}return n};
const known=w=>(S.srs[w]&&S.srs[w].box>=3);
function addMistake(m){const ex=S.mistakes.find(x=>x.key===m.key);if(ex){ex.pick=m.pick;ex.t=today();ex.n=(ex.n||1)+1}else S.mistakes.unshift({...m,t:today(),n:1});if(S.mistakes.length>300)S.mistakes.length=300;save()}
const removeMistake=k=>{S.mistakes=S.mistakes.filter(x=>x.key!==k);save()};

/* ---------- thông báo & hộp thoại trong trang ---------- */
let tt;function toast(m){const t=$("#toast");t.textContent=m;t.classList.add("on");clearTimeout(tt);tt=setTimeout(()=>t.classList.remove("on"),2600)}
function confirmDlg(msg,yes){const d=document.createElement("div");d.className="dlg";d.innerHTML=`<div class="card" role="dialog" aria-modal="true"><p>${esc(msg)}</p><div class="row" style="justify-content:flex-end"><button class="btn" data-x="0">Hủy</button><button class="btn pri" data-x="1">Đồng ý</button></div></div>`;document.body.appendChild(d);d.addEventListener("click",e=>{const b=e.target.closest("[data-x]");if(e.target===d||b){if(b&&b.dataset.x==="1")yes();d.remove()}});$("[data-x='1']",d).focus()}

/* ---------- phát âm (Web Speech API) ---------- */
let voice=null,warned=false,tok=0;
const hasTTS="speechSynthesis" in window;
function pickVoice(){if(!hasTTS)return;const vs=speechSynthesis.getVoices();voice=vs.find(v=>/ko[-_]KR/i.test(v.lang))||vs.find(v=>/^ko/i.test(v.lang))||null}
if(hasTTS){pickVoice();speechSynthesis.onvoiceschanged=pickVoice}
function speak(text,onend){
 if(!hasTTS){toast("Trình duyệt này không hỗ trợ đọc văn bản.");onend&&onend();return}
 try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(plain(text));u.lang="ko-KR";if(voice)u.voice=voice;u.rate=S.rate;
  let done=false;const fin=()=>{if(!done){done=true;onend&&onend()}};u.onend=fin;u.onerror=fin;speechSynthesis.speak(u);
  if(!voice&&!warned){warned=true;toast("Chưa thấy giọng ko-KR trên máy — hãy cài giọng tiếng Hàn để nghe chuẩn hơn.")}}catch(e){onend&&onend()}
}
function stopSpeak(){tok++;if(hasTTS)try{speechSynthesis.cancel()}catch(e){}$$(".line.now").forEach(x=>x.classList.remove("now"));const st=$("#shstat");if(st)st.textContent=""}
function playSeq(items,{pause=350,onLine}={}){stopSpeak();const my=tok;let i=0;
 const next=()=>{if(my!==tok)return;if(i>=items.length){onLine&&onLine(-1);return}onLine&&onLine(i);const t=items[i];
  speak(t,()=>{if(my!==tok)return;const p=typeof pause==="function"?pause(t):pause;i++;setTimeout(next,p)})};next()}

/* ---------- trạng thái giao diện ---------- */
const U={vt:"list",topic:"all",fc:null,gt:"list",gq:"",hq:"",it:"sa",game:null,rp:0,wt:"5152",w53:0,w54:0,lt:0,hideT:true,test:null,mr:false,mf:"all"};
const QREG={};
let pending=null;

/* ---------- điều hướng ---------- */
const VIEWS=[["home","Tổng quan","개요"],["hanja","Từ Hán Hàn","한자어"],["vocab","Từ vựng chuyên đề","어휘"],["grammar","Ngữ pháp cao cấp","문법"],["idioms","Thành ngữ – tục ngữ","관용 표현"],["reading","Đọc hiểu","읽기"],["writing","Luyện viết","쓰기"],["listening","Nghe – nói","듣기·말하기"],["translate","Luyện biên dịch","번역"],["interpret","Luyện phiên dịch","통역"],["summary","Tổng hợp từ & ngữ pháp","정리"],["test","Thi thử","모의고사"],["progress","Tiến độ & lỗi","학습 현황"]];
let view="home";
function route(){const h=location.hash.slice(1);view=VIEWS.some(v=>v[0]===h)?h:"home";stopSpeak();closePop();
 $("#nav").innerHTML=VIEWS.map(v=>`<a href="#${v[0]}" class="${v[0]===view?"on":""}" ${v[0]===view?'aria-current="page"':""}>${v[1]}<span class="n">${v[2]}</span></a>`).join("");
 render();if(!pending)window.scrollTo(0,0);
 const a=$("#nav .on");if(a&&a.scrollIntoView&&innerWidth<900)a.scrollIntoView({inline:"center",block:"nearest"})}
function render(){$("#main").innerHTML=R[view]();if(AFTER[view])AFTER[view]();focusPending()}
function focusPending(){if(!pending)return;const el=document.getElementById("it-"+pending);pending=null;if(!el)return;if(el.tagName==="DETAILS")el.open=true;
 setTimeout(()=>{el.scrollIntoView({block:"center"});el.classList.remove("flash");void el.offsetWidth;el.classList.add("flash")},30)}
function go(v,id){pending=id||null;if(location.hash.slice(1)===v)route();else location.hash=v}

/* ---------- câu hỏi trắc nghiệm dùng chung ---------- */
function quiz(qid,q,opts,a,src,ex,extra){QREG[qid]={key:qid,src,q,o:opts,a,ex,...(extra||{})};
 return `<div class="q" id="q-${qid}"><div class="qt kr">${q}</div><div class="opts">${opts.map((o,i)=>`<button class="opt" data-act="opt" data-q="${qid}" data-i="${i}">${i+1}. ${esc(o)}</button>`).join("")}</div><div class="fb"></div></div>`}

/* ================= TRANG ================= */
const R={},AFTER={};

/* --- Tổng quan --- */
const SECS=[["hanja","한자어","Từ Hán Hàn",`${HANJA.length} gốc chữ, tra theo âm Hán Việt, từ “giống chữ khác nghĩa”.`],
 ["vocab","어휘","Từ vựng chuyên đề",`${VOCAB.length} từ / ${TOPICS.length} chủ đề, 연어, flashcard lặp lại ngắt quãng.`],
 ["grammar","문법","Ngữ pháp cao cấp",`${GRAMMAR.length} mẫu, ràng buộc, lỗi thường gặp, ${COMPARE.length} bảng phân biệt.`],
 ["idioms","관용 표현","Thành ngữ – tục ngữ",`${IDIOMS.length} mục 사자성어, 속담, 관용어 và trò chơi ghép.`],
 ["reading","읽기","Đọc hiểu",`${READINGS.length} bài tin tức, xã luận, học thuật kèm câu hỏi kiểu TOPIK.`],
 ["writing","쓰기","Luyện viết",`Câu 51–54, bộ đếm ký tự, đồng hồ 50 phút, bảng tự chấm.`],
 ["listening","듣기·말하기","Nghe – nói",`Hội thoại, bài giảng, shadowing, chuyển cấp độ kính ngữ.`],
 ["translate","번역","Luyện biên dịch",`${allTR().length} bài báo · dịch từng câu, so bản mẫu, tổng hợp từ vựng – ngữ pháp.`],
 ["interpret","통역","Luyện phiên dịch",`${allIP().length} bài hội thoại & tin tức · dịch đuổi, ghi âm, luyện số liệu.`],
 ["summary","정리","Tổng hợp từ & ngữ pháp",`Gom từ vựng, cấu trúc của mọi bài; xuất bảng Markdown.`],
 ["test","모의고사","Thi thử",`${MOCK.length} câu rút gọn, chấm điểm tự động.`]];
R.home=()=>{const kn=VOCAB.filter(v=>known(v.w)).length,gm=GRAMMAR.filter(g=>S.gram[g.id]).length,lt=S.tests.length?S.tests[S.tests.length-1].s:"—";
 return `<section class="hero"><div><p class="ko">고급 한국어</p><h1>Luyện tiếng Hàn cao cấp cho người Việt</h1><p class="lead">Hướng tới TOPIK II cấp 5–6 và tiếng Hàn học thuật, công việc. Tận dụng lợi thế âm Hán Việt, luyện văn viết trang trọng, nghe – nhại theo giọng ko-KR.</p>
 <div class="row"><a class="btn pri" href="#vocab" data-act="startfc">Ôn flashcard hôm nay</a><a class="btn" href="#writing">Luyện viết câu 54</a></div></div>
 <svg class="bridge" viewBox="0 0 400 320" role="img" aria-label="Chữ Hán 法 nối âm Hán Hàn 법 và âm Hán Việt pháp">
  <defs><pattern id="gp" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" style="stroke:var(--line)" stroke-width="1"/></pattern></defs>
  <rect width="400" height="320" fill="url(#gp)"/>
  <rect x="30" y="70" width="150" height="150" rx="14" style="fill:var(--red2);stroke:var(--red)" stroke-width="3"/>
  <text x="105" y="187" text-anchor="middle" style="fill:var(--red);font-family:var(--kr)" font-size="112" font-weight="700">法</text>
  <path d="M182 110 C 225 100, 235 90, 262 88" fill="none" style="stroke:var(--ink)" stroke-width="1.5" stroke-dasharray="4 4"/>
  <path d="M182 185 C 225 200, 235 215, 262 218" fill="none" style="stroke:var(--ink)" stroke-width="1.5" stroke-dasharray="4 4"/>
  <text x="270" y="108" style="fill:var(--ink);font-family:var(--kr)" font-size="58" font-weight="700">법</text>
  <text x="272" y="130" style="fill:var(--mute)" font-size="13">âm Hán Hàn</text>
  <text x="270" y="230" style="fill:var(--acc);font-family:Georgia,serif" font-size="46" font-style="italic">pháp</text>
  <text x="272" y="252" style="fill:var(--mute)" font-size="13">âm Hán Việt</text>
  <text x="30" y="282" style="fill:var(--ink);font-family:var(--kr)" font-size="17">헌법 hiến pháp · 위법 vi pháp · 입법 lập pháp</text>
 </svg></section>
 <div class="stats"><div class="stat"><b>${streak()}</b><span>ngày học liên tiếp</span></div><div class="stat"><b>${kn}/${VOCAB.length}</b><span>từ đã thuộc</span></div><div class="stat"><b>${gm}/${GRAMMAR.length}</b><span>mẫu ngữ pháp đã nắm</span></div><div class="stat"><b>${lt}</b><span>điểm thi thử gần nhất</span></div></div>
 <h2>Các phần luyện tập</h2><div class="grid">${SECS.map(s=>`<a class="card sec" href="#${s[0]}"><div class="kr">${s[1]}</div><h3>${s[2]}</h3><p class="muted small" style="margin:0">${s[3]}</p></a>`).join("")}</div>
 <p class="muted small" style="margin-top:24px">Tiến độ được lưu trên trình duyệt này. Phát âm dùng giọng tiếng Hàn có sẵn trên thiết bị.</p>`};

/* --- Từ Hán Hàn --- */
function hanjaList(){const q=norm(U.hq.trim());const out=[];
 HANJA.forEach((r,i)=>{const rootHit=!q||norm(r.v).includes(q)||norm(r.k).includes(q)||r.h.includes(U.hq.trim())||norm(r.m).includes(q);
  const hits=r.w.map(w=>!!q&&(norm(w[1]).includes(q)||norm(w[0]).includes(q)||norm(w[2]).includes(q)));
  if(!rootHit&&!hits.some(Boolean))return;
  out.push(`<article class="card root" id="it-hj-${i}"><div class="han" aria-hidden="true">${r.h}</div><div><div class="row"><span class="kr" style="font-size:26px;font-weight:700">${r.k}</span>${sayBtn(r.k)}<span class="pill">${r.v}</span><span class="muted small">${esc(r.m)}</span></div>
  <div class="words">${r.w.map((w,j)=>`<button class="w ${hits[j]?"match":""}" data-act="say" data-t="${esc(w[0])}" title="${esc(w[2])}"><b>${w[0]}</b><span>${w[1]}</span></button>`).join("")}</div>
  <p class="muted small" style="margin:8px 0 0">${r.w.map(w=>`${w[0]}: ${esc(w[2])}`).join(" · ")}</p></div></article>`)});
 return out.length?out.join(""):`<p class="muted">Không tìm thấy gốc nào khớp “${esc(U.hq)}”. Thử gõ không dấu, ví dụ “phap”, “kinh te”.</p>`}
R.hanja=()=>`<h1>Từ Hán Hàn <span class="kr muted" style="font-size:.6em">한자어</span></h1><p class="lead">Khoảng 60% từ vựng tiếng Hàn là từ gốc Hán — người Việt có thể đoán nghĩa qua âm Hán Việt. Học theo gốc chữ, mỗi gốc mở ra cả một họ từ.</p>
 <div class="row" style="margin-bottom:16px"><input type="search" data-in="hq" value="${esc(U.hq)}" placeholder="Tra theo âm Hán Việt: pháp, kinh tế, phát triển…" aria-label="Tra theo âm Hán Việt" style="max-width:460px"></div>
 <div id="hlist" class="grid" style="grid-template-columns:repeat(auto-fill,minmax(min(100%,460px),1fr))">${hanjaList()}</div>
 <h2>Giống mặt chữ nhưng khác nghĩa</h2><p class="muted small">Cùng chữ Hán nhưng nghĩa trong tiếng Hàn khác hẳn nghĩa quen dùng trong tiếng Việt — nguồn lỗi phổ biến của người Việt.</p>
 <div class="scroll"><table class="stack"><thead><tr><th>Từ Hàn</th><th>Chữ Hán</th><th>Âm Hán Việt</th><th>Nghĩa trong tiếng Hàn</th><th>Lưu ý</th></tr></thead><tbody>
 ${FALSE_FRIENDS.map((f,i)=>`<tr id="it-ff-${i}"><td data-l="Từ Hàn"><span class="kr" style="font-size:18px;font-weight:700">${f[0]}</span> ${sayBtn(f[0])}</td><td data-l="Chữ Hán" class="kr">${f[1]}</td><td data-l="Hán Việt">${f[2]}</td><td data-l="Nghĩa Hàn"><b>${esc(f[3])}</b></td><td data-l="Lưu ý" class="muted">${esc(f[4])}</td></tr>`).join("")}</tbody></table></div>`;

/* --- Từ vựng --- */
const topicName=id=>(TOPICS.find(t=>t.id===id)||{}).name||"";
const srsOf=w=>S.srs[w]||{box:0,due:0,wrong:0,seen:0};
function vocabCard(v,i){const s=S.srs[v.w];const st=!s?'<span class="pill">mới</span>':s.box>=3?'<span class="pill">đã thuộc</span>':`<span class="pill r">đang học · sai ${s.wrong}</span>`;
 return `<article class="card" id="it-vc-${i}"><div class="row"><span class="vw">${v.w}</span>${sayBtn(v.w)}<span class="kr muted">${v.h}</span><span style="margin-left:auto">${st}</span></div>
 <p style="margin:4px 0 6px"><b>${esc(v.m)}</b> <span class="muted small">· ${topicName(v.t)}</span></p>
 ${v.s||v.a?`<p class="small" style="margin:0 0 6px">${v.s?`<span class="muted">Đồng nghĩa:</span> <span class="kr">${v.s}</span> `:""}${v.a?` <span class="muted">Trái nghĩa:</span> <span class="kr">${v.a}</span>`:""}</p>`:""}
 <div class="coll">${v.c.map(c=>`<span>${c}</span>`).join("")}</div>
 <div class="row" style="align-items:flex-start;flex-wrap:nowrap;margin-top:8px">${sayBtn(v.e)}<div><div class="ex">${esc(v.e)}</div><div class="muted small">${esc(v.ev)}</div></div></div></article>`}
function buildQueue(topic,cram){const now=Date.now();const idx=VOCAB.map((v,i)=>i).filter(i=>topic==="all"||VOCAB[i].t===topic);
 if(cram)return idx.filter(i=>S.srs[VOCAB[i].w]).sort((a,b)=>srsOf(VOCAB[b].w).wrong-srsOf(VOCAB[a].w).wrong||srsOf(VOCAB[a].w).box-srsOf(VOCAB[b].w).box).slice(0,12);
 const due=[],fresh=[];idx.forEach(i=>{const s=S.srs[VOCAB[i].w];if(!s)fresh.push(i);else if(s.due<=now)due.push(i)});
 due.sort((a,b)=>srsOf(VOCAB[b].w).wrong-srsOf(VOCAB[a].w).wrong||srsOf(VOCAB[a].w).box-srsOf(VOCAB[b].w).box);return due.concat(fresh).slice(0,20)}
function fcView(){const f=U.fc;
 if(!f){const now=Date.now();const idx=VOCAB.filter(v=>U.topic==="all"||v.t===U.topic);const due=idx.filter(v=>S.srs[v.w]&&S.srs[v.w].due<=now).length,fresh=idx.filter(v=>!S.srs[v.w]).length;
  return `<div class="card"><h3>Phiên ôn tập</h3><p class="muted">Đến hạn ôn: <b>${due}</b> · Từ mới: <b>${fresh}</b> · Từ đến hạn được xếp trước, từ hay sai được ưu tiên.</p>
  <div class="row"><button class="btn pri" data-act="fcstart">Bắt đầu (tối đa 20 thẻ)</button><button class="btn" data-act="fccram">Ôn riêng các từ hay sai</button></div>
  <p class="muted small" style="margin-bottom:0">Nhớ → giãn lịch 1, 3, 7, 14, 30 ngày · Khó → ôn lại ngày mai · Quên → quay lại ngay trong phiên và vào “Lỗi của tôi”.</p></div>`}
 if(f.pos>=f.q.length)return `<div class="card"><h3>Hoàn thành phiên ôn 🎯</h3><p>Đã ôn ${f.n} lượt thẻ. Quay lại vào ngày mai để ôn các thẻ đến hạn.</p><button class="btn pri" data-act="fcend">Xong</button></div>`;
 const v=VOCAB[f.q[f.pos]];
 return `<p class="muted small">Thẻ ${f.pos+1}/${f.q.length} · ${topicName(v.t)}</p>
 <div class="card fc" data-act="fcflip" role="button" tabindex="0" aria-label="Lật thẻ">${!f.flip?`<div><div class="big">${v.w}</div><p class="muted" style="background:var(--card)">Bấm để lật thẻ</p></div>`:
 `<div class="back"><div class="row"><span class="vw">${v.w}</span>${sayBtn(v.w)}<span class="kr muted">${v.h}</span></div><p style="margin:4px 0"><b>${esc(v.m)}</b></p><div class="coll">${v.c.map(c=>`<span>${c}</span>`).join("")}</div><div class="ex" style="font-size:17px">${esc(v.e)}</div><div class="muted small">${esc(v.ev)}</div></div>`}</div>
 ${f.flip?`<div class="grade"><button class="btn" data-act="grade" data-g="0" style="color:var(--bad)">Quên</button><button class="btn" data-act="grade" data-g="1">Khó</button><button class="btn pri" data-act="grade" data-g="2">Nhớ</button></div>`:`<div class="row" style="margin-top:12px;justify-content:center"><button class="btn" data-act="say" data-t="${esc(v.w)}">${SPK} Nghe</button><button class="btn pri" data-act="fcflip">Lật thẻ</button></div>`}`}
R.vocab=()=>`<h1>Từ vựng chuyên đề <span class="kr muted" style="font-size:.6em">주제별 어휘</span></h1><p class="lead">Từ vựng cấp 5–6 kèm 연어 (cụm kết hợp cố định) — chìa khóa để viết tự nhiên như người bản ngữ.</p>
 <div class="tabs" role="tablist"><button class="${U.vt==="list"?"on":""}" data-act="vt" data-v="list">Danh sách</button><button class="${U.vt==="cards"?"on":""}" data-act="vt" data-v="cards">Flashcard</button></div>
 <div class="row" style="margin-bottom:16px"><label class="small muted" for="tsel">Chủ đề</label><select id="tsel" data-in="topic"><option value="all">Tất cả (${VOCAB.length})</option>${TOPICS.map(t=>`<option value="${t.id}" ${U.topic===t.id?"selected":""}>${t.name} · ${t.ko}</option>`).join("")}</select></div>
 ${U.vt==="list"?`<div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(min(100%,420px),1fr))">${VOCAB.map((v,i)=>U.topic==="all"||v.t===U.topic?vocabCard(v,i):"").join("")}</div>`:fcView()}`;

/* --- Ngữ pháp --- */
function gItem(g){return `<details class="g" id="it-${g.id}"><summary><span class="f">${g.f}</span><span class="muted">${esc(g.m)}</span>${S.gram[g.id]?'<span class="pill" style="margin-left:auto">✓ đã nắm</span>':""}</summary>
 <div class="gb"><label class="chk" style="margin:0 0 10px"><input type="checkbox" data-act="gm" data-id="${g.id}" ${S.gram[g.id]?"checked":""}> Tôi đã nắm mẫu này</label><dl class="kv"><dt>Ý nghĩa</dt><dd>${esc(g.m)}</dd><dt>Sắc thái</dt><dd>${esc(g.n)}</dd><dt>Ràng buộc</dt><dd>${esc(g.r)}</dd><dt style="color:var(--red)">Lỗi hay gặp</dt><dd>${esc(g.err)}</dd></dl>
 <ul class="exl">${g.ex.map(e=>`<li>${sayBtn(e[0])}<div><div class="ex">${hl(e[0])}</div><div class="vi">${esc(e[1])}</div></div></li>`).join("")}</ul></div></details>`}
function gList(){const q=norm(U.gq.trim());const items=GRAMMAR.filter(g=>!q||norm(g.f+" "+g.m+" "+g.n).includes(q));return items.length?items.map(gItem).join(""):`<p class="muted">Không có mẫu nào khớp.</p>`}
R.grammar=()=>`<h1>Ngữ pháp cao cấp <span class="kr muted" style="font-size:.6em">고급 문법</span></h1><p class="lead">${GRAMMAR.length} mẫu thường gặp ở TOPIK II cấp 5–6. Phần <span class="hl">tô đỏ</span> trong ví dụ là cấu trúc đang học.</p>
 <div class="tabs"><button class="${U.gt==="list"?"on":""}" data-act="gt" data-v="list">Danh sách mẫu</button><button class="${U.gt==="cmp"?"on":""}" data-act="gt" data-v="cmp">Phân biệt mẫu gần nghĩa</button></div>
 ${U.gt==="list"?`<div class="row" style="margin-bottom:10px"><input type="search" data-in="gq" value="${esc(U.gq)}" placeholder="Lọc mẫu: 바람에, nguyên nhân, mặc dù…" aria-label="Lọc mẫu ngữ pháp" style="max-width:420px"><span class="muted small">Đã nắm ${GRAMMAR.filter(g=>S.gram[g.id]).length}/${GRAMMAR.length}</span></div><div id="glist">${gList()}</div>`:
 COMPARE.map(c=>`<section class="card" id="it-${c.id}" style="margin-bottom:16px"><h3 class="kr" style="color:var(--red)">${c.title}</h3>
  <div class="scroll"><table class="stack"><thead><tr>${c.cols.map(h=>`<th>${h}</th>`).join("")}</tr></thead><tbody>${c.rows.map(r=>`<tr>${r.map((x,j)=>`<td data-l="${esc(c.cols[j])}" class="${/[가-힣]/.test(x)?"kr":""}">${esc(x)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>
  <h4 style="margin:16px 0 4px">Bài tập chọn mẫu đúng</h4>${c.q.map((q,k)=>quiz(`${c.id}-${k}`,esc(q[0]).replace("___",'<span class="hl">　___　</span>'),q[1],q[2],"Phân biệt ngữ pháp",q[3])).join("")}</section>`).join("")}`;

/* --- Thành ngữ --- */
const ITYPE={sa:"사자성어 · thành ngữ 4 chữ",sd:"속담 · tục ngữ",gw:"관용어 · quán dụng ngữ"};
function newGame(){const pool=shuffle(IDIOMS.map((x,i)=>i)).slice(0,6);U.game={l:pool,r:shuffle(pool),sl:null,sr:null,done:[],wrong:0,t:Date.now()}}
function gameView(){const g=U.game;const fin=g.done.length===g.l.length;
 return `<div class="card"><div class="row"><h3 style="margin:0">Ghép thành ngữ với nghĩa</h3><span class="muted small">Đúng ${g.done.length}/${g.l.length} · Sai ${g.wrong}</span><button class="btn sm" data-act="newgame" style="margin-left:auto">Ván mới</button></div>
 <p class="muted small">Chọn một thành ngữ bên trái, rồi chọn nghĩa tương ứng bên phải.</p>
 ${fin?`<div class="note">Hoàn thành! Sai ${g.wrong} lần trong ${Math.round((Date.now()-g.t)/1000)} giây. Các cặp ghép sai đã được đưa vào “Lỗi của tôi”.</div>`:""}
 <div class="game" style="margin-top:10px"><div style="display:grid;gap:8px">${g.l.map(i=>`<button class="l ${g.done.includes(i)?"done":""} ${g.sl===i?"sel":""}" data-act="gl" data-i="${i}" ${g.done.includes(i)?"disabled":""}>${IDIOMS[i].k}</button>`).join("")}</div>
 <div style="display:grid;gap:8px">${g.r.map(i=>`<button class="${g.done.includes(i)?"done":""} ${g.sr===i?"sel":""}" data-act="gr" data-i="${i}" ${g.done.includes(i)?"disabled":""}>${esc(IDIOMS[i].m)}</button>`).join("")}</div></div></div>`}
R.idioms=()=>{if(!U.game)newGame();return `<h1>Thành ngữ, tục ngữ, quán dụng ngữ</h1><p class="lead">Dùng đúng chỗ một 사자성어 hay 관용어 giúp bài viết và bài nói tự nhiên, có chiều sâu hơn hẳn.</p>
 <div class="tabs">${Object.keys(ITYPE).map(k=>`<button class="${U.it===k?"on":""}" data-act="it" data-v="${k}">${ITYPE[k].split(" · ")[0]} <span class="muted small">${ITYPE[k].split(" · ")[1]}</span></button>`).join("")}<button class="${U.it==="game"?"on":""}" data-act="it" data-v="game">Trò chơi ghép</button></div>
 ${U.it==="game"?`<div id="game">${gameView()}</div>`:`<div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(min(100%,420px),1fr))">${IDIOMS.map((d,i)=>d.type!==U.it?"":`<article class="card" id="it-id-${i}"><div class="row"><span class="kr" style="font-size:24px;font-weight:700">${d.k}</span>${sayBtn(d.k)}</div>
 ${d.h?`<p style="margin:2px 0" class="small"><span class="kr" style="color:var(--red);font-size:17px">${d.h}</span> · <i>${d.v}</i></p>`:""}<p style="margin:4px 0"><b>${esc(d.m)}</b></p><p class="muted small" style="margin:0 0 8px">Dùng khi: ${esc(d.u)}</p>
 <div class="row" style="flex-wrap:nowrap;align-items:flex-start">${sayBtn(d.e)}<div class="ex" style="font-size:17px">${esc(d.e)}</div></div></article>`).join("")}</div>`}`};

/* --- Đọc hiểu --- */
function passageHTML(r){return esc(r.text).replace(/\{([^}]+)\}/g,(m,w)=>`<button class="gl" data-act="gloss" data-w="${w}">${w}</button>`).replace(/([㉠㉡㉢㉣])/g,'<span class="mark">$1</span>')}
R.reading=()=>{const r=READINGS[U.rp];const len=r.text.replace(/[{}]/g,"").length;
 return `<h1>Đọc hiểu <span class="kr muted" style="font-size:.6em">읽기</span></h1><p class="lead">Bấm vào từ gạch chấm để xem nghĩa. Câu hỏi theo dạng TOPIK II: ý chính, điền câu, thái độ tác giả, chi tiết.</p>
 <div class="tabs">${READINGS.map((x,i)=>`<button class="${U.rp===i?"on":""}" data-act="rp" data-v="${i}">${x.type}</button>`).join("")}</div>
 <article class="card"><p class="muted small" style="margin:0">${r.type} · khoảng ${len} ký tự</p><h2 class="kr" style="margin:6px 0 14px">${esc(r.title)}</h2><div class="passage">${passageHTML(r)}</div>
 <div class="row" style="margin-top:12px"><button class="btn sm" data-act="readall">${SPK} Nghe toàn bài</button><button class="btn sm" data-act="stop">Dừng</button></div></article>
 <h2>Từ khó</h2><div class="phr">${Object.entries(r.gloss).map(([k,v])=>`<div><b>${k}</b>${esc(v)}</div>`).join("")}</div>
 <h2>Câu hỏi</h2><div class="card">${r.q.map((q,k)=>`<div class="muted small" style="margin-top:${k?18:0}px"><span class="pill">${q[3]}</span></div>`+quiz(`${r.id}-${k}`,`${k+1}. ${q[0]}`,q[1],q[2],"Đọc hiểu: "+r.title)).join("")}</div>`};
let pop=null;function closePop(){if(pop){pop.remove();pop=null}}
function showGloss(el){closePop();const r=READINGS[U.rp];pop=document.createElement("div");pop.className="pop";pop.innerHTML=`<b class="kr">${esc(el.dataset.w)}</b><br>${esc(r.gloss[el.dataset.w]||"")}`;document.body.appendChild(pop);
 const b=el.getBoundingClientRect();const pw=pop.offsetWidth;let x=b.left+scrollX;if(x+pw>scrollX+innerWidth-10)x=scrollX+innerWidth-pw-10;pop.style.left=Math.max(10,x)+"px";pop.style.top=(b.bottom+scrollY+6)+"px"}

/* --- Luyện viết --- */
function countText(t){return{all:t.replace(/\r?\n/g,"").length,nos:t.replace(/\s/g,"").length,han:(t.match(/[가-힣]/g)||[]).length,sen:(t.match(/[.?!。](\s|$)/g)||[]).length}}
function counterHTML(t,min,max){const c=countText(t);const pct=Math.min(100,Math.round(c.all/max*100));const col=c.all<min?"var(--mute)":c.all<=max?"var(--ok)":"var(--red)";
 return `<div class="counter"><div><b style="color:${col}">${c.all}</b><span>ký tự (có dấu cách) · mục tiêu ${min}–${max}</span></div><div><b>${c.nos}</b><span>ký tự không dấu cách</span></div><div><b>${c.han}</b><span>âm tiết Hangul</span></div><div><b>${c.sen}</b><span>câu</span></div></div><div class="meter"><i style="width:${pct}%;background:${col}"></i></div>`}
function spokenCheck(t){const out=[];const yo=(t.match(/요(?=[.?!,\s]|$)/g)||[]).length;if(yo)out.push(`đuôi “-요” × ${yo}`);
 ["근데","너무","진짜","엄청","되게","거든","이건","그건","저는","제가","그래서"].forEach(m=>{const n=t.split(m).length-1;if(n)out.push(`“${m}” × ${n}`)});
 return out.length?`<div class="note warn small"><b>Dấu hiệu văn nói:</b> ${out.join(", ")}. Hãy chuyển sang văn viết (-다, 그러나, 매우, 필자는, 따라서…).</div>`:`<div class="note small">Không phát hiện dấu hiệu văn nói phổ biến.</div>`}
function chartSVG(c){const W=560,H=320,L=48,Rr=16,T=34,B=46,iw=W-L-Rr,ih=H-T-B;let body="";
 const vals=c.type==="line"?c.data.map(d=>d[1]):c.data.flatMap(d=>d.slice(1));const max=Math.ceil(Math.max(...vals)*1.2/10)*10;const y=v=>T+ih-v/max*ih;
 for(let k=0;k<=4;k++){const v=max/4*k;body+=`<line x1="${L}" x2="${W-Rr}" y1="${y(v)}" y2="${y(v)}" style="stroke:var(--line)"/><text x="${L-8}" y="${y(v)+5}" text-anchor="end" font-size="13" style="fill:var(--mute)">${v}</text>`}
 const step=iw/c.data.length;
 if(c.type==="line"){const pts=c.data.map((d,i)=>[L+step*(i+.5),y(d[1])]);body+=`<polyline points="${pts.map(p=>p.join(",")).join(" ")}" fill="none" style="stroke:var(--acc)" stroke-width="3"/>`;
  pts.forEach((p,i)=>{body+=`<circle cx="${p[0]}" cy="${p[1]}" r="5" style="fill:var(--card);stroke:var(--acc)" stroke-width="3"/><text x="${p[0]}" y="${p[1]-12}" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--ink)">${c.data[i][1]}${c.unit}</text><text x="${p[0]}" y="${H-B+24}" text-anchor="middle" font-size="14" style="fill:var(--ink)">${c.data[i][0]}</text>`})}
 else{const bw=Math.min(34,step/3);c.data.forEach((d,i)=>{const cx=L+step*(i+.5);[1,2].forEach((s,j)=>{const x=cx+(j?2:-bw-2);body+=`<rect x="${x}" y="${y(d[s])}" width="${bw}" height="${T+ih-y(d[s])}" rx="3" style="fill:${j?"var(--red)":"var(--acc)"}"/><text x="${x+bw/2}" y="${y(d[s])-6}" text-anchor="middle" font-size="13" style="fill:var(--ink)">${d[s]}</text>`});
  body+=`<text x="${cx}" y="${H-B+24}" text-anchor="middle" font-size="14" style="fill:var(--ink);font-family:var(--kr)">${d[0]}</text>`});
  body+=`<rect x="${W-150}" y="6" width="12" height="12" style="fill:var(--acc)"/><text x="${W-132}" y="17" font-size="13" style="fill:var(--ink)">${c.series[0]}</text><rect x="${W-80}" y="6" width="12" height="12" style="fill:var(--red)"/><text x="${W-62}" y="17" font-size="13" style="fill:var(--ink)">${c.series[1]}</text>`}
 return `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(c.title)}"><text x="${L}" y="20" font-size="14" style="fill:var(--mute)">(단위: ${c.unit})</text>${body}</svg>`}
const fmtT=s=>String(Math.floor(s/60)).padStart(2,"0")+":"+String(s%60).padStart(2,"0");
const TM={left:3000,run:false,id:null};
function tick(){if(TM.left>0)TM.left--;const el=$("#timer");if(el){el.textContent=fmtT(TM.left);el.classList.toggle("low",TM.left<300)}if(TM.left<=0){clearInterval(TM.id);TM.run=false;toast("Hết 50 phút! Hãy dừng bút và tự chấm theo bảng tiêu chí.");const b=$("#tbtn");if(b)b.textContent="Bắt đầu"}}
function wTabs(){return `<div class="tabs">${[["5152","Câu 51–52"],["53","Câu 53 · biểu đồ"],["54","Câu 54 · nghị luận"],["style","Văn nói ↔ văn viết"]].map(t=>`<button class="${U.wt===t[0]?"on":""}" data-act="wt" data-v="${t[0]}">${t[1]}</button>`).join("")}</div>`}
function w5152(){return WRITE_5152.map((w,i)=>`<article class="card" style="margin-bottom:14px"><p class="muted small" style="margin:0">Câu ${w.no} · ${w.no===51?"văn bản thực dụng":"đoạn văn giải thích"}</p><h3 class="kr">${esc(w.title)}</h3>
 <p class="ex" style="font-size:17px">${esc(w.text).replace(/([㉠㉡])/g,'<span class="mark">$1</span>')}</p>
 <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr));gap:8px"><label class="small">㉠ <input type="text" class="kr" placeholder="Viết câu cho ㉠"></label><label class="small">㉡ <input type="text" class="kr" placeholder="Viết câu cho ㉡"></label></div>
 <div class="row" style="margin-top:10px"><button class="btn sm" data-act="toggle" data-t="a51-${i}">Xem đáp án mẫu</button></div>
 <div class="ans note" id="a51-${i}" style="margin-top:10px"><p class="kr" style="margin:0">㉠ ${esc(w.ans[0])}<br>㉡ ${esc(w.ans[1])}</p><p class="small muted" style="margin:6px 0 0">${esc(w.tip)}</p></div></article>`).join("")}
function w53(){const c=WRITE_53[U.w53];const k="w53-"+U.w53;const t=S.drafts[k]||"";
 return `<div class="tabs">${WRITE_53.map((x,i)=>`<button class="${U.w53===i?"on":""}" data-act="w53" data-v="${i}">Đề ${i+1}</button>`).join("")}</div>
 <div class="two"><div><article class="card"><p class="kr" style="margin-top:0">다음은 ‘${esc(c.title)}’에 대한 자료이다. 이 내용을 200~300자의 글로 쓰시오. 단, 글의 제목은 쓰지 마시오.</p>${chartSVG(c)}
 <ul class="kr small">${c.extra.map(e=>`<li>${esc(e)}</li>`).join("")}</ul><p class="muted small" style="margin:0">${esc(c.note)}</p></article>
 <div class="editor" style="margin-top:14px"><textarea data-in="draft" data-k="${k}" data-min="200" data-max="300" aria-label="Bài viết câu 53" style="min-height:240px" placeholder="조사 결과에 따르면…">${esc(t)}</textarea></div><div id="cnt-${k}">${counterHTML(t,200,300)}</div><div id="sp-${k}">${t?spokenCheck(t):""}</div>
 <div class="row" style="margin-top:10px"><button class="btn sm" data-act="toggle" data-t="m53">Xem bài mẫu</button></div><div class="ans note" id="m53" style="margin-top:10px"><p class="kr" style="margin:0;line-height:1.9">${esc(c.model)}</p><p class="small muted">${countText(c.model).all} ký tự</p></div></div>
 <aside class="card"><h3>Mẫu câu mô tả số liệu</h3><div class="phr" style="grid-template-columns:1fr">${PHRASES_53.map(p=>`<div><b>${esc(p[0])}</b>${esc(p[1])}</div>`).join("")}</div>
 <p class="small muted">Bố cục gợi ý: (1) giới thiệu khảo sát → (2) mô tả xu hướng chính, số liệu nổi bật → (3) nguyên nhân / so sánh → (4) dự báo hoặc kết luận.</p></aside></div>`}
function w54(){const p=WRITE_54[U.w54];const k="w54-"+U.w54;const t=S.drafts[k]||"";
 return `<div class="row" style="margin-bottom:12px"><label class="small muted" for="w54s">Đề bài</label><select id="w54s" data-in="w54">${WRITE_54.map((x,i)=>`<option value="${i}" ${U.w54===i?"selected":""}>${esc(x.title)}</option>`).join("")}</select></div>
 <div class="two"><div><article class="card"><p class="kr" style="margin-top:0;line-height:1.9">${esc(p.prompt)}</p><ul class="kr">${p.tasks.map(x=>`<li>${esc(x)}</li>`).join("")}</ul>
 <button class="btn sm" data-act="toggle" data-t="ol54">Dàn ý gợi ý (서론 – 본론 – 결론)</button><div class="ans" id="ol54" style="margin-top:10px"><dl class="kv">${Object.entries(p.outline).map(([a,b])=>`<dt class="kr">${a}</dt><dd class="kr">${esc(b)}</dd>`).join("")}</dl></div></article>
 <div class="row" style="margin:14px 0 8px"><span class="timer ${TM.left<300?"low":""}" id="timer" aria-live="off">${fmtT(TM.left)}</span><button class="btn pri" id="tbtn" data-act="timer">${TM.run?"Tạm dừng":"Bắt đầu"}</button><button class="btn" data-act="treset">Đặt lại 50:00</button></div>
 <div class="editor"><textarea data-in="draft" data-k="${k}" data-min="600" data-max="700" aria-label="Bài viết câu 54" placeholder="최근 …이/가 사회적 쟁점으로 떠오르고 있다.">${esc(t)}</textarea></div>
 <div id="cnt-${k}">${counterHTML(t,600,700)}</div><div id="sp-${k}" style="margin-top:8px">${t?spokenCheck(t):""}</div>
 <h3 style="margin-top:18px">Tự kiểm tra theo tiêu chí chấm</h3>${CHECKLIST.map(g=>`<div class="card" style="margin-bottom:8px"><b>${esc(g.g)}</b>${g.i.map(x=>`<label class="row small" style="margin-top:6px;flex-wrap:nowrap"><input type="checkbox" style="width:20px;height:20px;accent-color:var(--acc)"> ${esc(x)}</label>`).join("")}</div>`).join("")}</div>
 <aside class="card"><h3>Ngân hàng mẫu câu nghị luận</h3>${ESSAY_BANK.map(b=>`<p style="margin:12px 0 4px"><b>${esc(b.g)}</b></p>${b.p.map(x=>`<div class="kr small" style="padding:4px 0;border-bottom:1px dashed var(--line)">${esc(x)}</div>`).join("")}`).join("")}
 <p class="small muted">Bài được tự lưu trên trình duyệt khi bạn gõ.</p></aside></div>`}
function wStyle(){return `<div class="two"><div><h3>Luyện chuyển văn nói → văn viết</h3>${STYLE_PAIRS.map((p,i)=>`<div class="card" style="margin-bottom:8px"><div class="row" style="flex-wrap:nowrap">${sayBtn(p[0])}<span class="ex" style="font-size:17px">${esc(p[0])}</span></div>
 <input type="text" class="kr" style="margin-top:8px" placeholder="Viết lại bằng văn viết (-다)…" aria-label="Câu văn viết"><div class="row" style="margin-top:8px"><button class="btn sm" data-act="toggle" data-t="st-${i}">Xem đáp án</button></div><div class="ans note kr" id="st-${i}" style="margin-top:8px">${esc(p[1])}</div></div>`).join("")}
 <h3 style="margin-top:20px">Kiểm tra văn bản của bạn</h3><textarea data-in="spcheck" class="kr" rows="5" placeholder="Dán đoạn văn để phát hiện các biểu hiện văn nói…" aria-label="Kiểm tra văn nói"></textarea><div id="spout" style="margin-top:8px"></div></div>
 <aside class="card"><h3>Quy tắc chuyển đổi</h3><div class="scroll"><table class="stack"><thead><tr><th>Văn nói</th><th>Văn viết</th><th>Ví dụ</th></tr></thead><tbody>${STYLE_RULES.map(r=>`<tr><td data-l="Văn nói" class="kr">${esc(r[0])}</td><td data-l="Văn viết" class="kr"><b>${esc(r[1])}</b></td><td data-l="Ví dụ" class="kr small">${esc(r[2])}</td></tr>`).join("")}</tbody></table></div></aside></div>`}
R.writing=()=>`<h1>Luyện viết TOPIK II <span class="kr muted" style="font-size:.6em">쓰기</span></h1><p class="lead">Câu 51–52 điền câu, câu 53 mô tả biểu đồ (200–300 chữ), câu 54 nghị luận (600–700 chữ). Bộ đếm tính cả dấu cách như trên giấy 원고지.</p>
 ${wTabs()}${U.wt==="5152"?w5152():U.wt==="53"?w53():U.wt==="54"?w54():wStyle()}`;

/* --- Nghe – nói --- */
R.listening=()=>{const tabs=`<div class="tabs">${LISTEN.map((l,i)=>`<button class="${U.lt===i?"on":""}" data-act="lt" data-v="${i}">${l.type}</button>`).join("")}<button class="${U.lt==="reg"?"on":""}" data-act="lt" data-v="reg">Kính ngữ & văn phong</button></div>`;
 const head=`<h1>Nghe và nói <span class="kr muted" style="font-size:.6em">듣기·말하기</span></h1><p class="lead">Nghe với tốc độ tùy chỉnh ở góc trên (0.75x / 1x / 1.25x). Chế độ shadowing đọc từng câu rồi dừng để bạn nhại lại.</p>${tabs}`;
 if(U.lt==="reg")return head+`<p class="muted">Cùng một nội dung qua bốn cấp độ: 해체 (thân mật) → 해요체 (lịch sự thân thiện) → 합쇼체 (trang trọng) → văn viết trang trọng.</p>
  ${REGISTERS.map(r=>`<div class="card" style="margin-bottom:10px"><b>${esc(r.ctx)}</b><div class="reg" style="margin-top:8px">${r.s.map((s,j)=>`<div><span class="lv">${["해체","해요체","합쇼체","Văn viết trang trọng"][j]}</span><div class="row" style="flex-wrap:nowrap;align-items:flex-start">${sayBtn(s)}<span class="kr">${esc(s)}</span></div></div>`).join("")}</div></div>`).join("")}
  <h2>Từ vựng kính ngữ đặc biệt</h2><div class="scroll"><table class="stack"><thead><tr><th>Thường</th><th>Kính ngữ / khiêm nhường</th><th>Nghĩa</th></tr></thead><tbody>${HONORIFIC_WORDS.map(w=>`<tr><td data-l="Thường" class="kr">${w[0]}</td><td data-l="Kính ngữ" class="kr"><b>${w[1]}</b> ${sayBtn(w[1].split(" ")[0])}</td><td data-l="Nghĩa">${w[2]}</td></tr>`).join("")}</tbody></table></div>`;
 const l=LISTEN[U.lt];
 return head+`<article class="card"><h2 class="kr" style="margin-top:0">${esc(l.title)}</h2>
 <div class="row" style="margin-bottom:10px"><button class="btn pri" data-act="lplay">${SPK} Nghe toàn bài</button><button class="btn" data-act="lshadow">Shadowing</button><button class="btn" data-act="stop">Dừng</button><button class="btn" data-act="ltog">${U.hideT?"Hiện":"Ẩn"} transcript</button><span id="shstat" class="muted small" aria-live="polite"></span></div>
 <div id="lines" class="${U.hideT?"hide":""}">${l.lines.map((x,i)=>`<div class="line" id="ln-${i}" data-act="lline" data-i="${i}"><span class="who">${esc(x[0])}</span><span class="txt">${esc(x[1])}</span></div>`).join("")}</div>
 <p class="muted small" style="margin-bottom:0">Bấm vào một câu để nghe riêng câu đó.</p></article>
 <h2>Câu hỏi nghe hiểu</h2><div class="card">${l.q.map((q,k)=>quiz(`${l.id}-${k}`,`${k+1}. ${q[0]}`,q[1],q[2],"Nghe: "+l.title)).join("")}</div>`};

/* --- Thi thử --- */
R.test=()=>{const T=U.test;
 if(!T)return `<h1>Thi thử rút gọn <span class="kr muted" style="font-size:.6em">모의고사</span></h1><p class="lead">${MOCK.length} câu theo cấu trúc TOPIK II: nghe, ngữ pháp, tiêu đề báo, sắp xếp câu, điền chỗ trống, ý chính, thái độ tác giả, từ vựng – thành ngữ. Chấm tự động, câu sai vào “Lỗi của tôi”.</p>
  <div class="card"><p style="margin-top:0">Thời gian gợi ý: 25 phút. Câu nghe phát bằng giọng ko-KR của thiết bị — bấm nút loa để nghe (được nghe lại).</p><button class="btn pri" data-act="tstart">Bắt đầu làm bài</button></div>
  ${S.tests.length?`<h2>Lịch sử</h2><div class="card">${S.tests.slice(-8).reverse().map(t=>`<div class="row" style="justify-content:space-between;border-bottom:1px solid var(--line);padding:6px 0"><span>${t.d}</span><b>${t.s} điểm</b><span class="muted small">${t.c}/${t.t} câu đúng</span></div>`).join("")}</div>`:""}`;
 const res=T.done?(()=>{const c=MOCK.filter((q,n)=>T.p[n]===q.a).length;const secs={};MOCK.forEach((q,n)=>{const s=q.sec.split(" · ")[0];secs[s]=secs[s]||[0,0];secs[s][1]++;if(T.p[n]===q.a)secs[s][0]++});
  return `<div class="card" style="border-color:var(--acc);margin-bottom:16px"><div class="row"><span class="timer">${Math.round(c/MOCK.length*100)}</span><span>điểm / 100 · đúng ${c}/${MOCK.length} câu</span><button class="btn" data-act="treset2" style="margin-left:auto">Làm lại</button></div>
  <div class="bars">${Object.entries(secs).map(([k,v])=>`<div class="b"><span class="kr">${k}</span><span class="t"><i style="width:${v[0]/v[1]*100}%"></i></span><span>${v[0]}/${v[1]}</span></div>`).join("")}</div></div>`})():"";
 return `<h1>Thi thử rút gọn</h1>${res}${MOCK.map((q,n)=>{const p=T.p[n];return `<div class="card q" style="margin-bottom:10px"><div class="row"><b>Câu ${n+1}</b><span class="pill">${q.sec}</span>${q.audio?`<button class="btn sm" data-act="taudio" data-n="${n}">${SPK} Nghe</button>`:""}</div>
 <div class="qt kr" style="margin-top:8px;line-height:1.8">${q.q}</div><div class="opts">${q.o.map((o,i)=>{let c="";if(T.done){if(i===q.a)c="ok";else if(i===p)c="bad"}else if(i===p)c="sel";return `<button class="opt ${c}" data-act="mopt" data-n="${n}" data-i="${i}" ${T.done?"disabled":""}>${i+1}. ${esc(o)}</button>`}).join("")}</div>
 ${T.done&&q.audio?`<details class="small" style="margin-top:6px"><summary>Transcript</summary><div class="kr">${q.audio.map(a=>`${a[0]}: ${esc(a[1])}`).join("<br>")}</div></details>`:""}</div>`}).join("")}
 ${T.done?"":`<div class="row"><button class="btn pri" data-act="tsubmit">Nộp bài và chấm điểm</button><span class="muted small">Đã chọn ${Object.keys(T.p).length}/${MOCK.length}</span></div>`}`};

/* --- Tiến độ --- */
function scoreChart(){const ts=S.tests.slice(-12);if(!ts.length)return `<p class="muted">Chưa có bài thi thử nào. <a href="#test">Làm bài đầu tiên</a>.</p>`;
 const W=560,H=220,L=36,Rr=16,T=20,B=34,iw=W-L-Rr,ih=H-T-B;const x=i=>L+(ts.length===1?iw/2:iw*i/(ts.length-1)),y=v=>T+ih-v/100*ih;let b="";
 [0,50,100].forEach(v=>b+=`<line x1="${L}" x2="${W-Rr}" y1="${y(v)}" y2="${y(v)}" style="stroke:var(--line)"/><text x="${L-6}" y="${y(v)+4}" font-size="12" text-anchor="end" style="fill:var(--mute)">${v}</text>`);
 b+=`<polyline points="${ts.map((t,i)=>x(i)+","+y(t.s)).join(" ")}" fill="none" style="stroke:var(--acc)" stroke-width="3"/>`;
 ts.forEach((t,i)=>b+=`<circle cx="${x(i)}" cy="${y(t.s)}" r="5" style="fill:var(--acc)"/><text x="${x(i)}" y="${y(t.s)-10}" font-size="13" text-anchor="middle" style="fill:var(--ink)">${t.s}</text><text x="${x(i)}" y="${H-10}" font-size="12" text-anchor="middle" style="fill:var(--mute)">${t.d.slice(8)}/${t.d.slice(5,7)}</text>`);
 return `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="Điểm thi thử theo thời gian">${b}</svg>`}
function mistakesView(){const srcs=[...new Set(S.mistakes.map(m=>m.src.split(":")[0]))];const list=S.mistakes.filter(m=>U.mf==="all"||m.src.split(":")[0]===U.mf);
 if(!S.mistakes.length)return `<p class="muted">Chưa có lỗi nào được ghi lại. Các câu bạn trả lời sai ở mọi phần sẽ tự động xuất hiện ở đây.</p>`;
 const head=`<div class="row" style="margin-bottom:10px"><select data-in="mf" aria-label="Lọc theo nguồn"><option value="all">Tất cả (${S.mistakes.length})</option>${srcs.map(s=>`<option ${U.mf===s?"selected":""}>${esc(s)}</option>`).join("")}</select>
 <button class="btn ${U.mr?"pri":""}" data-act="mr">${U.mr?"Thoát chế độ ôn":"Ôn lại các lỗi"}</button><button class="btn" data-act="mclear">Xóa tất cả</button></div>`;
 if(U.mr)return head+`<p class="muted small">Trả lời đúng sẽ tự xóa câu khỏi danh sách.</p>`+list.map(m=>`<div class="card" style="margin-bottom:8px" id="mr-${esc(m.key)}"><span class="pill r">${esc(m.src)}</span>${m.o?quiz("mr::"+m.key,m.q,m.o,m.a,m.src,"",{retry:true}):
  `<div class="kr" style="font-size:22px;font-weight:700;margin:8px 0">${esc(m.q)}</div><div class="row"><button class="btn sm" data-act="toggle" data-t="ma-${esc(m.key)}">Hiện đáp án</button><button class="btn sm pri" data-act="mok" data-k="${esc(m.key)}">Đã nhớ ✓</button></div><div class="ans note" id="ma-${esc(m.key)}" style="margin-top:8px">${esc(m.a)}</div>`}</div>`).join("");
 return head+`<div class="scroll"><table class="stack"><thead><tr><th>Nguồn</th><th>Câu hỏi</th><th>Bạn chọn</th><th>Đáp án</th><th>Lần sai</th><th></th></tr></thead><tbody>${list.map(m=>`<tr><td data-l="Nguồn" class="small">${esc(m.src)}</td><td data-l="Câu hỏi" class="kr small" style="max-width:380px">${m.q}</td><td data-l="Bạn chọn" class="kr small" style="color:var(--bad)">${m.o&&m.pick!=null?esc(m.o[m.pick]):"—"}</td><td data-l="Đáp án" class="small" style="color:var(--ok)">${m.o?esc(m.o[m.a]):esc(m.a)}</td><td data-l="Lần sai">${m.n}</td><td data-l=""><button class="btn sm" data-act="mdel" data-k="${esc(m.key)}" aria-label="Xóa">Xóa</button></td></tr>`).join("")}</tbody></table></div>`}
R.progress=()=>{const set=new Set(S.days);const days=[...Array(28)].map((_,i)=>{const d=new Date();d.setDate(d.getDate()-27+i);return set.has(dkey(d))});
 return `<h1>Tiến độ & lỗi của tôi <span class="kr muted" style="font-size:.6em">학습 현황</span></h1>
 <div class="stats"><div class="stat"><b>${streak()}</b><span>ngày liên tiếp</span></div><div class="stat"><b>${VOCAB.filter(v=>known(v.w)).length}/${VOCAB.length}</b><span>từ đã thuộc</span></div><div class="stat"><b>${GRAMMAR.filter(g=>S.gram[g.id]).length}/${GRAMMAR.length}</b><span>mẫu ngữ pháp đã nắm</span></div><div class="stat"><b>${S.mistakes.length}</b><span>lỗi cần ôn</span></div></div>
 <div class="card" style="margin-bottom:14px"><b>28 ngày gần nhất</b><div style="display:grid;grid-template-columns:repeat(28,minmax(0,1fr));gap:3px;margin-top:8px">${days.map(x=>`<span style="aspect-ratio:1;border-radius:3px;background:${x?"var(--acc)":"var(--bg2)"};border:1px solid var(--line)"></span>`).join("")}</div></div>
 <div class="two"><div class="card"><b>Từ đã thuộc theo chủ đề</b><div class="bars">${TOPICS.map(t=>{const all=VOCAB.filter(v=>v.t===t.id),k=all.filter(v=>known(v.w)).length;return `<div class="b"><span>${t.name}</span><span class="t"><i style="width:${all.length?k/all.length*100:0}%"></i></span><span>${k}/${all.length}</span></div>`}).join("")}</div><p class="muted small" style="margin-bottom:0">“Đã thuộc” = trả lời “Nhớ” liên tiếp ít nhất 3 lần trong flashcard.</p></div>
 <div class="card"><b>Điểm thi thử theo thời gian</b>${scoreChart()}<p class="muted small" style="margin-bottom:0">Mẫu ngữ pháp đã nắm: ${GRAMMAR.filter(g=>S.gram[g.id]).map(g=>`<span class="kr">${g.f}</span>`).join(", ")||"chưa đánh dấu mẫu nào"}</p></div></div>
 <h2>Lỗi của tôi</h2><div id="mlist">${mistakesView()}</div>
 <h2>Sao lưu tiến độ</h2><div class="card"><p class="muted small" style="margin-top:0">Tiến độ, bản dịch, bài tự nhập chỉ nằm trong trình duyệt này. Xuất file để sao lưu hoặc chuyển sang máy khác.</p>
 <div class="row"><button class="btn" data-act="exp">Xuất file sao lưu (.json)</button><label class="btn">Nhập file sao lưu<input type="file" accept=".json,application/json" data-file="imp" hidden></label></div></div>`};

/* ================= SỰ KIỆN ================= */
const A={
 say:el=>{stopSpeak();speak(el.dataset.t);touch()},
 stop:()=>stopSpeak(),
 rate:el=>{S.rate=+el.dataset.v;save();$$("#rate button").forEach(b=>b.classList.toggle("on",+b.dataset.v===S.rate));toast("Tốc độ đọc: "+S.rate+"x")},
 theme:()=>{const cur=document.documentElement.dataset.theme||(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");S.theme=cur==="dark"?"light":"dark";document.documentElement.dataset.theme=S.theme;save()},
 toggle:el=>{const t=document.getElementById(el.dataset.t);if(t)t.classList.toggle("on")},
 vt:el=>{U.vt=el.dataset.v;render()},
 startfc:()=>{U.vt="cards";U.fc=null},
 fcstart:()=>{const q=buildQueue(U.topic);if(!q.length){toast("Không có thẻ đến hạn. Thử “Ôn riêng các từ hay sai”.");return}U.fc={q,pos:0,flip:false,n:0};render()},
 fccram:()=>{const q=buildQueue(U.topic,true);if(!q.length){toast("Chưa có từ nào đã học trong chủ đề này.");return}U.fc={q,pos:0,flip:false,n:0};render()},
 fcflip:()=>{if(U.fc&&!U.fc.flip){U.fc.flip=true;render();speak(VOCAB[U.fc.q[U.fc.pos]].w)}},
 fcend:()=>{U.fc=null;render()},
 grade:el=>{const f=U.fc,g=+el.dataset.g,i=f.q[f.pos],v=VOCAB[i],now=Date.now();const s=S.srs[v.w]||{box:0,due:0,wrong:0,seen:0};s.seen++;
  if(g===0){s.box=0;s.wrong++;s.due=now;f.q.splice(Math.min(f.q.length,f.pos+4),0,i);addMistake({key:"fc-"+v.w,src:"Flashcard",q:v.w,o:null,a:v.m+" — "+v.c.join(", ")})}
  else if(g===1){s.box=Math.max(1,s.box);s.due=now+DAY}else{s.box=Math.min(5,s.box+1);s.due=now+IV[s.box]*DAY}
  S.srs[v.w]=s;save();touch();f.pos++;f.n++;f.flip=false;render()},
 gt:el=>{U.gt=el.dataset.v;render()},
 gm:(el,e)=>{e.stopPropagation();S.gram[el.dataset.id]=el.checked;if(!el.checked)delete S.gram[el.dataset.id];save();touch();toast(el.checked?"Đã đánh dấu là đã nắm":"Đã bỏ đánh dấu")},
 opt:el=>{const qid=el.dataset.q,box=document.getElementById("q-"+qid),m=QREG[qid];if(!box||box.dataset.done)return;box.dataset.done="1";const i=+el.dataset.i;
  $$(".opt",box).forEach((b,j)=>{b.disabled=true;if(j===m.a)b.classList.add("ok");else if(j===i)b.classList.add("bad")});
  const fb=$(".fb",box);if(i===m.a){fb.className="fb ok";fb.textContent="Chính xác! "+(m.ex||"");if(m.retry){removeMistake(qid.slice(4));setTimeout(()=>{const c=box.closest(".card");if(c)c.remove()},900)}}
  else{fb.className="fb bad";fb.textContent="Chưa đúng. Đáp án: "+(m.a+1)+". "+(m.ex||"");addMistake({key:m.retry?qid.slice(4):qid,src:m.src,q:m.q,o:m.o,a:m.a,pick:i})}touch()},
 it:el=>{U.it=el.dataset.v;render()},
 newgame:()=>{newGame();$("#game").innerHTML=gameView()},
 gl:el=>{U.game.sl=+el.dataset.i;matchCheck()},
 gr:el=>{U.game.sr=+el.dataset.i;matchCheck()},
 rp:el=>{U.rp=+el.dataset.v;stopSpeak();render()},
 gloss:(el,e)=>{e.stopPropagation();showGloss(el);speak(el.dataset.w)},
 readall:()=>{const r=READINGS[U.rp];playSeq(r.text.replace(/[{}]|\(\s*[㉠㉡㉢㉣]\s*\)/g,"").match(/[^.?!]+[.?!]*/g).map(s=>s.trim()).filter(Boolean))},
 wt:el=>{U.wt=el.dataset.v;render()},
 w53:el=>{U.w53=+el.dataset.v;render()},
 timer:el=>{if(TM.run){clearInterval(TM.id);TM.run=false;el.textContent="Tiếp tục"}else{if(TM.left<=0)TM.left=3000;TM.id=setInterval(tick,1000);TM.run=true;el.textContent="Tạm dừng";touch()}},
 treset:()=>{clearInterval(TM.id);TM.run=false;TM.left=3000;const t=$("#timer");if(t){t.textContent=fmtT(3000);t.classList.remove("low")}const b=$("#tbtn");if(b)b.textContent="Bắt đầu"},
 lt:el=>{U.lt=el.dataset.v==="reg"?"reg":+el.dataset.v;render()},
 ltog:()=>{U.hideT=!U.hideT;render()},
 lline:el=>{const i=+el.dataset.i;stopSpeak();el.classList.add("now");speak(LISTEN[U.lt].lines[i][1],()=>el.classList.remove("now"));touch()},
 lplay:()=>{const l=LISTEN[U.lt];touch();playSeq(l.lines.map(x=>x[1]),{pause:450,onLine:markLine})},
 lshadow:()=>{const l=LISTEN[U.lt];touch();playSeq(l.lines.map(x=>x[1]),{pause:t=>{const st=$("#shstat");if(st)st.textContent="🎙 Đến lượt bạn nhại lại câu vừa nghe…";return Math.max(1800,t.length*170/S.rate)},onLine:i=>{markLine(i);const st=$("#shstat");if(st)st.textContent=i<0?"Hoàn thành shadowing.":`Câu ${i+1}/${l.lines.length} — nghe kỹ`}})},
 tstart:()=>{U.test={p:{},done:false};render()},
 mopt:el=>{U.test.p[+el.dataset.n]=+el.dataset.i;const card=el.closest(".q");$$(".opt",card).forEach(b=>b.classList.toggle("sel",b===el));const s=$("[data-act=tsubmit]+span");if(s)s.textContent=`Đã chọn ${Object.keys(U.test.p).length}/${MOCK.length}`},
 taudio:el=>{const q=MOCK[+el.dataset.n];playSeq(q.audio.map(a=>a[1]),{pause:500})},
 tsubmit:()=>{const T=U.test;const miss=MOCK.length-Object.keys(T.p).length;const go2=()=>{T.done=true;let c=0;MOCK.forEach((q,n)=>{if(T.p[n]===q.a)c++;else addMistake({key:"mk-"+n,src:"Thi thử",q:q.q,o:q.o,a:q.a,pick:T.p[n]??null})});
  S.tests.push({d:today(),s:Math.round(c/MOCK.length*100),c,t:MOCK.length});save();touch();render();window.scrollTo(0,0)};
  if(miss)confirmDlg(`Còn ${miss} câu chưa chọn. Vẫn nộp bài?`,go2);else go2()},
 treset2:()=>{U.test={p:{},done:false};render();window.scrollTo(0,0)},
 mr:()=>{U.mr=!U.mr;$("#mlist").innerHTML=mistakesView()},
 mdel:el=>{removeMistake(el.dataset.k);$("#mlist").innerHTML=mistakesView()},
 mok:el=>{removeMistake(el.dataset.k);const c=document.getElementById("mr-"+el.dataset.k);if(c)c.remove()},
 mclear:()=>confirmDlg("Xóa toàn bộ danh sách lỗi?",()=>{S.mistakes=[];save();$("#mlist").innerHTML=mistakesView()}),
 exp:()=>{const b=new Blob([JSON.stringify(S,null,1)],{type:"application/json"});const a=document.createElement("a");a.href=URL.createObjectURL(b);a.download="tieng-han-tien-do-"+today()+".json";document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},500)},
 sres:el=>{$("#gsearch").value="";$("#results").classList.remove("on");const e=IDX[+el.dataset.i];e.pre&&e.pre();go(e.view,e.id)}
};
function markLine(i){$$(".line").forEach((x,j)=>x.classList.toggle("now",j===i));const el=document.getElementById("ln-"+i);if(el&&!U.hideT)el.scrollIntoView({block:"nearest"})}
function matchCheck(){const g=U.game;if(g.sl!=null&&g.sr!=null){if(g.sl===g.sr){g.done.push(g.sl);touch()}else{g.wrong++;const d=IDIOMS[g.sl];addMistake({key:"gm-"+d.k,src:"Ghép thành ngữ",q:d.k,o:null,a:d.m});
  const bad=[g.sl,g.sr];g.sl=g.sr=null;$("#game").innerHTML=gameView();$$("#game button").forEach(b=>{if(b.dataset.act==="gl"&&+b.dataset.i===bad[0]||b.dataset.act==="gr"&&+b.dataset.i===bad[1])b.classList.add("no")});return}g.sl=g.sr=null}
 $("#game").innerHTML=gameView()}

document.addEventListener("click",e=>{const el=e.target.closest("[data-act]");if(!e.target.closest(".gl"))closePop();if(!e.target.closest(".search"))$("#results").classList.remove("on");
 if(el&&A[el.dataset.act]){if(el.tagName==="A"&&el.dataset.act!=="startfc")e.preventDefault();A[el.dataset.act](el,e)}});
document.addEventListener("keydown",e=>{if((e.key==="Enter"||e.key===" ")&&e.target.matches(".fc")){e.preventDefault();A.fcflip()}if(e.key==="Escape"){closePop();$("#results").classList.remove("on")}});
let dt;
const IN={
 hq:el=>{U.hq=el.value;$("#hlist").innerHTML=hanjaList()},
 gq:el=>{U.gq=el.value;$("#glist").innerHTML=gList()},
 topic:el=>{U.topic=el.value;U.fc=null;render()},
 w54:el=>{U.w54=+el.value;render()},
 mf:el=>{U.mf=el.value;$("#mlist").innerHTML=mistakesView()},
 draft:el=>{const k=el.dataset.k;S.drafts[k]=el.value;$("#cnt-"+k).innerHTML=counterHTML(el.value,+el.dataset.min,+el.dataset.max);$("#sp-"+k).innerHTML=el.value?spokenCheck(el.value):"";clearTimeout(dt);dt=setTimeout(()=>{save();touch()},600)},
 spcheck:el=>{$("#spout").innerHTML=el.value.trim()?spokenCheck(el.value):""}
};
document.addEventListener("input",e=>{const el=e.target.closest("[data-in]");if(el&&IN[el.dataset.in])IN[el.dataset.in](el)});

/* ---------- tìm kiếm chung ---------- */
const IDX=[];
HANJA.forEach((r,i)=>{IDX.push({tag:"Gốc Hán",label:`${r.h} ${r.k} – ${r.v}`,sub:r.m,view:"hanja",id:"hj-"+i,pre:()=>{U.hq=""}});r.w.forEach(w=>IDX.push({tag:"Hán Hàn",label:`${w[0]} – ${w[1]}`,sub:w[2],view:"hanja",id:"hj-"+i,pre:()=>{U.hq=""}}))});
FALSE_FRIENDS.forEach((f,i)=>IDX.push({tag:"Khác nghĩa",label:`${f[0]} (${f[2]})`,sub:f[3],view:"hanja",id:"ff-"+i}));
VOCAB.forEach((v,i)=>IDX.push({tag:"Từ vựng",label:v.w,sub:v.m+" · "+v.c.join(", "),view:"vocab",id:"vc-"+i,pre:()=>{U.vt="list";U.topic="all"}}));
GRAMMAR.forEach(g=>IDX.push({tag:"Ngữ pháp",label:g.f,sub:g.m,view:"grammar",id:g.id,pre:()=>{U.gt="list";U.gq=""}}));
COMPARE.forEach(c=>IDX.push({tag:"Phân biệt",label:c.title,sub:"bảng so sánh + bài tập",view:"grammar",id:c.id,pre:()=>{U.gt="cmp"}}));
IDIOMS.forEach((d,i)=>IDX.push({tag:{sa:"사자성어",sd:"속담",gw:"관용어"}[d.type],label:d.k+(d.v?" – "+d.v:""),sub:d.m,view:"idioms",id:"id-"+i,pre:()=>{U.it=d.type}}));
READINGS.forEach((r,i)=>IDX.push({tag:"Đọc hiểu",label:r.title,sub:r.type,view:"reading",pre:()=>{U.rp=i}}));
WRITE_54.forEach((w,i)=>IDX.push({tag:"Đề viết 54",label:w.title,sub:"nghị luận 600–700 chữ",view:"writing",pre:()=>{U.wt="54";U.w54=i}}));
LISTEN.forEach((l,i)=>IDX.push({tag:"Nghe",label:l.title,sub:l.type,view:"listening",pre:()=>{U.lt=i}}));
function idxItems(){
 allTR().forEach(t=>{if(IDX.some(e=>e.key==="tr-"+t.id))return;IDX.push({key:"tr-"+t.id,tag:"Biên dịch",label:t.title,sub:(t.source||"")+" · "+(t.topic||""),view:"translate",pre:()=>{U.tr=t.id}});
  (t.grammar||[]).forEach(g=>IDX.push({key:"trg-"+t.id+g.f,tag:"Cấu trúc (biên dịch)",label:g.f,sub:g.m+" · "+t.title,view:"translate",pre:()=>{U.tr=t.id}}))});
 allIP().forEach(t=>{if(IDX.some(e=>e.key==="ip-"+t.id))return;IDX.push({key:"ip-"+t.id,tag:"Phiên dịch",label:t.title,sub:(t.source||"")+" · "+(t.kind==="news"?"tin tức":"hội thoại"),view:"interpret",pre:()=>{U.ip=t.id}});
  (t.grammar||[]).forEach(g=>IDX.push({key:"ipg-"+t.id+g.f,tag:"Cấu trúc (phiên dịch)",label:g.f,sub:g.m+" · "+t.title,view:"interpret",pre:()=>{U.ip=t.id}}))});
 IDX.forEach(e=>{if(!e.n)e.n=norm(e.label+" "+e.sub)})}
idxItems();
/* gọi sau khi nhập bài mới: thêm từ vựng vào kho và vào chỉ mục tìm kiếm */
function refreshLibrary(){mergeVocab().forEach(v=>IDX.push({tag:"Từ vựng",label:v.w,sub:v.m+" · "+v.c.join(", "),view:"vocab",id:"vc-"+VOCAB.indexOf(v),pre:()=>{U.vt="list";U.topic="all"}}));idxItems()}
document.addEventListener("change",e=>{const el=e.target.closest("[data-file]");if(!el||!el.files||!el.files[0])return;const fr=new FileReader();
 fr.onload=()=>{try{const o=JSON.parse(fr.result);if(!o||typeof o!=="object"||!("srs" in o))throw 0;confirmDlg("Thay toàn bộ tiến độ hiện tại bằng file sao lưu này?",()=>{Object.keys(o).forEach(k=>S[k]=o[k]);save();location.reload()})}catch(x){toast("File không hợp lệ.")}};fr.readAsText(el.files[0]);el.value=""});
function doSearch(q){const box=$("#results");const n=norm(q.trim());if(!n){box.classList.remove("on");return}
 const hits=[];IDX.forEach((e,i)=>{if(e.n.includes(n))hits.push(i)});
 box.innerHTML=hits.length?hits.slice(0,40).map(i=>`<button data-act="sres" data-i="${i}"><span class="tag">${IDX[i].tag}</span><span class="kr">${esc(IDX[i].label)}</span> <span class="muted small">${esc(IDX[i].sub)}</span></button>`).join(""):`<div style="padding:12px 14px" class="muted">Không tìm thấy “${esc(q)}”.</div>`;box.classList.add("on")}
$("#gsearch").addEventListener("input",e=>doSearch(e.target.value));
$("#gsearch").addEventListener("focus",e=>{if(e.target.value)doSearch(e.target.value)});
$("#gsearch").addEventListener("keydown",e=>{if(e.key==="Enter"){const b=$("#results button");if(b)b.click()}if(e.key==="ArrowDown"){const b=$("#results button");if(b){e.preventDefault();b.focus()}}});
$("#results").addEventListener("keydown",e=>{if(e.key==="ArrowDown"||e.key==="ArrowUp"){e.preventDefault();const s=e.key==="ArrowDown"?"nextElementSibling":"previousElementSibling";const n=document.activeElement[s];if(n)n.focus()}});

/* ---------- khởi động ---------- */
if(S.theme)document.documentElement.dataset.theme=S.theme;
$("#rate").innerHTML=[0.75,1,1.25].map(v=>`<button data-act="rate" data-v="${v}" class="${S.rate===v?"on":""}" aria-label="Tốc độ ${v}x">${v}x</button>`).join("");
window.addEventListener("hashchange",route);

/* ---------- giao diện cho các mô-đun js/summary.js, js/translate.js, js/interpret.js ---------- */
window.APP={$,$$,esc,hl,plain,norm,shuffle,SPK,sayBtn,speak,playSeq,stopSpeak,toast,confirmDlg,S,U,save,touch,today,addMistake,quiz,R,AFTER,A,IN,render,go,allTR,allIP,refreshLibrary,
 get view(){return view}};
/* khởi động sau khi mọi file script đã nạp */
document.addEventListener("DOMContentLoaded",route);
}
