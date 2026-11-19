/* =====================================================================
   LUYỆN PHIÊN DỊCH — chỉ dùng ÂM THANH GỐC (video YouTube hoặc file radio / podcast)
   hội thoại hằng ngày & tin tức
   ===================================================================== */
(()=>{
const P=window.APP, {$,$$,esc,sayBtn,SPK,S,U,R,AFTER,A,IN,toast,confirmDlg,save,touch,today,addMistake,allIP}=P;
U.ip=U.ip||null;U.ipTab=U.ipTab||"cons";U.ipPos=0;U.ipSize=U.ipSize||1;U.ipShow=false;
U.num=U.num||{type:"money",cur:null,ok:0,n:0};
const SRC=window.SpeechRecognition||window.webkitSpeechRecognition;
const st=id=>{const o=(S.ip[id]=S.ip[id]||{ans:{},note:"",marks:[]});o.ans=o.ans||{};o.marks=o.marks||[];return o};
const cur=()=>U.ip&&U.ip!=="__num"?allIP().find(x=>x.id===U.ip):null;
const timed=it=>it.segments.filter(s=>s.start!=null);
const groups=it=>{const T=timed(it),g=[];for(let i=0;i<T.length;i+=U.ipSize)g.push(T.slice(i,i+U.ipSize).map((s,k)=>({...s,idx:i+k})));return g};
const fmtS=s=>s==null?"":Math.floor(s/60)+":"+(s%60).toFixed(1).padStart(4,"0");
const hasSrc=it=>!!(it&&(it.youtube||it.audio));
const isAudioURL=u=>/^https?:\/\/.+\.(mp3|m4a|aac|ogg|oga|wav|opus)(\?|#|$)/i.test(u);

/* =====================================================================
   TRÌNH PHÁT: YouTube (IFrame API) hoặc file âm thanh (thẻ <audio>)
   ===================================================================== */
let yt=null,au=null,segTimer=null,clock=null,runTok=0;
function loadYT(){if(window.YT&&window.YT.Player)return Promise.resolve();
 if(!loadYT.p)loadYT.p=new Promise(res=>{const prev=window.onYouTubeIframeAPIReady;window.onYouTubeIframeAPIReady=()=>{prev&&prev();res()};
  const s=document.createElement("script");s.src="https://www.youtube.com/iframe_api";s.onerror=()=>toast("Không tải được YouTube — kiểm tra kết nối mạng.");document.head.appendChild(s)});return loadYT.p}
function mount(it){yt=null;au=null;clearInterval(clock);
 if(it.youtube)loadYT().then(()=>{if(!document.getElementById("ytp"))return;yt=new window.YT.Player("ytp",{videoId:it.youtube,playerVars:{rel:0,playsinline:1,modestbranding:1},
  events:{onError:()=>toast("Video không phát được (có thể chủ kênh chặn nhúng). Hãy mở trên YouTube hoặc chọn video khác.")}})});
 else if(it.audio){au=$("#aup");if(au)au.onerror=()=>toast("Không mở được file âm thanh — kiểm tra lại link.")}
 clock=setInterval(()=>{const e=$("#ptime");if(e)e.textContent=fmtS(PL.time())},200)}
const PL={
 ready:()=>!!((yt&&yt.seekTo)||au),
 time:()=>{try{return yt&&yt.getCurrentTime?yt.getCurrentTime():au?au.currentTime:0}catch(e){return 0}},
 dur:()=>{try{return yt&&yt.getDuration?yt.getDuration():au&&isFinite(au.duration)?au.duration:0}catch(e){return 0}},
 seek:t=>{t=Math.max(0,t);if(yt&&yt.seekTo)yt.seekTo(t,true);else if(au)au.currentTime=t},
 play:()=>{if(yt&&yt.playVideo)yt.playVideo();else if(au)au.play().catch(()=>toast("Trình duyệt chặn phát — bấm phát trực tiếp trên trình phát."))},
 pause:()=>{try{if(yt&&yt.pauseVideo)yt.pauseVideo();else if(au)au.pause()}catch(e){}},
 playing:()=>{try{return yt&&yt.getPlayerState?yt.getPlayerState()===1:au?!au.paused:false}catch(e){return false}}
};
/* phát đoạn [a, b] rồi dừng */
function playRange(a,b,onend){if(!PL.ready()){toast("Trình phát chưa sẵn sàng, thử lại sau giây lát.");onend&&onend();return}
 clearInterval(segTimer);PL.seek(a);PL.play();segTimer=setInterval(()=>{if(PL.time()>=b-0.05){PL.pause();clearInterval(segTimer);onend&&onend()}},80)}
function playGroup(it,segs,onend){if(!hasSrc(it)){toast("Bài chưa có nguồn âm thanh gốc.");onend&&onend();return}
 const a=segs[0],b=segs[segs.length-1];playRange(a.start,b.end!=null?b.end:b.start+8,onend)}
function stopAll(){runTok++;clearInterval(segTimer);PL.pause();markLine(-1);status("")}
const status=t=>{const e=$("#ipstat");if(e)e.textContent=t};
function markLine(i){$$(".line").forEach((x,j)=>x.classList.toggle("now",j===i))}

/* ---------- ghi âm & nhận diện giọng nói ---------- */
let mr=null,chunks=[],recURL={},sr=null;
const recKey=()=>U.ip+"|"+U.ipSize+"|"+U.ipPos;

/* ---------- đọc transcript (hỗ trợ định dạng “Hiện bản chép lời” của YouTube) ---------- */
P.parseTranscript=txt=>{const lines=String(txt).replace(/\r/g,"").split("\n").map(s=>s.trim()).filter(Boolean);
 const tre=/^(?:(\d{1,2}):)?(\d{1,2}):(\d{2})(?:[.,]\d+)?(?:\s*[-–]\s*(?:\d{1,2}:)?\d{1,2}:\d{2}(?:[.,]\d+)?)?\s*(.*)$/,segs=[];let pend=null;
 const add=(text,t)=>{let who="";const m=text.match(/^([^:：\s]{1,8}(?:\s[^:：\s]{1,8})?)\s*[:：]\s*(.+)$/);if(m){who=m[1];text=m[2]}
  if(t==null&&segs.length&&segs[segs.length-1].start!=null&&!who)segs[segs.length-1].ko+=" "+text;else segs.push({who,ko:text,vi:"",start:t})};
 lines.forEach(l=>{const m=l.match(tre);if(m){const t=(+(m[1]||0))*3600+(+m[2])*60+(+m[3]);if(m[4])add(m[4],t);else pend=t}else{add(l,pend);pend=null}});
 segs.forEach((s,i)=>{if(s.start==null){delete s.start;return}const nx=segs.slice(i+1).find(x=>x.start!=null);s.end=nx?nx.start:s.start+8});
 return segs};

/* =====================================================================
   DANH SÁCH BÀI
   ===================================================================== */
function card(t){const local=P.isLocal(t);const s=S.ip[t.id];const done=s?Object.keys(s.ans).length:0;const T=timed(t).length;
 return `<article class="card"><div class="row"><span class="pill">${t.kind==="news"?"Tin tức":"Hội thoại"}</span><span class="pill r">${t.youtube?"YouTube":t.audio?"Âm thanh":"thiếu nguồn"}</span>${local?'<span class="pill">bài của tôi</span>':""}</div>
 <h3 style="margin:8px 0 4px">${esc(t.title)}</h3><p class="muted small" style="margin:0 0 10px">${esc(t.source||"")} · ${T} đoạn${t.segments.some(x=>x.ko)?"":" · chưa có transcript"} · ${(t.vocab||[]).length} từ · ${(t.grammar||[]).length} cấu trúc${done?" · đã luyện "+done+" đoạn":""}</p>
 <div class="row"><button class="btn sm pri" data-act="ipopen" data-id="${esc(t.id)}">Luyện</button>${local?`<button class="btn sm" data-act="ipdel" data-id="${esc(t.id)}">Xóa</button>`:""}</div></article>`}
function listView(){const L=allIP();
 return `<h1>Luyện phiên dịch <span class="kr muted" style="font-size:.6em">통역</span></h1>
 <p class="lead">Chỉ dùng âm thanh gốc: video YouTube của YTN, KBS, SBS… hoặc file radio, podcast. Nghe từng đoạn, dịch thành tiếng, ghi âm, so với transcript. Bài nào cũng có bảng tổng hợp từ vựng và cấu trúc – ngữ pháp.</p>
 ${L.length?`<h2>Hội thoại hằng ngày <span class="muted small">radio · podcast · phỏng vấn</span></h2><div class="grid">${L.filter(x=>x.kind!=="news").map(card).join("")||'<p class="muted">Chưa có bài.</p>'}</div>
 <h2>Tin tức</h2><div class="grid">${L.filter(x=>x.kind==="news").map(card).join("")||'<p class="muted">Chưa có bài.</p>'}</div>`:
 `<div class="note">Chưa có bài nào. Thêm bài đầu tiên ở khung bên dưới: chọn một video YouTube hoặc tập podcast, dán link, rồi dán bản chép lời.</div>`}
 <h2>Thêm bài từ nguồn thật</h2><div class="two"><div class="card"><h3>Tạo bài luyện</h3>
 <ol class="small muted" style="padding-left:18px;margin-top:0"><li>Mở video trên YouTube → <b>…Thêm</b> → <b>Hiện bản chép lời</b> (Show transcript), chọn tiếng Hàn → bôi đen và sao chép <b>cả mốc thời gian</b>.</li>
 <li>Dán link và bản chép lời vào đây. Không có bản chép lời: vẫn tạo được, rồi dùng tab <b>Chia đoạn</b> để tự cắt đoạn khi nghe.</li></ol>
 <div style="display:grid;gap:8px"><input type="text" id="ni-title" placeholder="Tiêu đề bài" aria-label="Tiêu đề">
 <div class="row" style="flex-wrap:nowrap"><select id="ni-kind" aria-label="Loại"><option value="daily">Hội thoại hằng ngày</option><option value="news">Tin tức</option></select><input type="text" id="ni-src" placeholder="Nguồn: KBS 뉴스, SBS 라디오…" aria-label="Nguồn"></div>
 <input type="text" id="ni-link" placeholder="Link YouTube hoặc link file âm thanh (.mp3, .m4a)" aria-label="Link nguồn">
 <textarea id="ni-text" class="kr" rows="7" placeholder="0:03&#10;안녕하십니까, 9시 뉴스입니다.&#10;0:07&#10;오늘 서울은…&#10;(không bắt buộc)" aria-label="Bản chép lời"></textarea>
 <div class="row"><button class="btn pri" data-act="ipnew">Tạo bài luyện</button></div></div></div>
 <div class="card"><h3>Nhập bài hoàn chỉnh từ JSON</h3><p class="muted small">Định dạng như trong <code>data/interpretation.js</code> (ví dụ do Claude soạn từ link + bản chép lời bạn gửi). Muốn bài hiện trên mọi thiết bị: dán khối đó vào file trên GitHub.</p>
 <textarea id="ip-json" rows="9" aria-label="JSON bài phiên dịch" placeholder='{"id":"i1","kind":"news","title":"…","youtube":"mã video","segments":[{"who":"앵커","ko":"…","vi":"…","start":3.2,"end":9.8}],"vocab":[…],"grammar":[…]}'></textarea>
 <div class="row" style="margin-top:8px"><button class="btn" data-act="ipimp">Nhập bài</button></div></div></div>
 <h2>Kỹ năng bổ trợ</h2><div class="grid"><article class="card"><h3>Luyện số liệu</h3><p class="muted small">Đổi nhanh 만, 억, 조, % sang tiếng Việt — bẫy lớn nhất khi phiên dịch tin tức. (Phần này dùng giọng máy vì số được tạo ngẫu nhiên.)</p><button class="btn sm pri" data-act="ipopen" data-id="__num">Luyện ngay</button></article></div>`}

/* =====================================================================
   MỘT BÀI
   ===================================================================== */
const SYMBOLS=[["→","dẫn đến, chuyển sang"],["↑ / ↓","tăng / giảm"],["≈","khoảng, xấp xỉ"],["∵ / ∴","vì / cho nên"],["○","người, dân"],["□","quốc gia, nước"],["Gov","chính phủ, nhà nước"],["$","kinh tế, tiền"],["!","quan trọng, nhấn mạnh"],["?","vấn đề, câu hỏi"],["✓ / ✗","đồng ý / phản đối"],["//","kết thúc ý"]];
const needSeg=`<div class="note warn">Bài chưa được chia đoạn. Vào tab <b>Chia đoạn</b> để cắt đoạn khi nghe, hoặc dán bản chép lời có mốc thời gian ở tab <b>Tổng hợp</b>.</div>`;
function consBody(it){const G=groups(it),n=G.length;if(!n)return needSeg;U.ipPos=Math.min(U.ipPos,n-1);const g=G[U.ipPos],s=st(it.id),k=g[0].idx;const last=U.ipPos===n-1;
 return `<div class="row" style="margin-bottom:10px"><b>Đoạn ${U.ipPos+1}/${n}</b><label class="small muted" for="ipsize">Mỗi lượt</label><select id="ipsize" data-in="ipsize">${[1,2,3].map(v=>`<option value="${v}" ${U.ipSize===v?"selected":""}>${v} đoạn</option>`).join("")}</select>
  <span class="muted small">${fmtS(g[0].start)} – ${fmtS(g[g.length-1].end)}</span></div>
 <div class="meter" style="margin-bottom:12px"><i style="width:${(U.ipPos+1)/n*100}%"></i></div>
 <section class="card"><div class="row"><button class="btn pri" data-act="ipplay">${SPK} Nghe đoạn</button><button class="btn" data-act="iprec" id="recbtn">${mr&&mr.state==="recording"?"⏹ Dừng ghi":"🎙 Ghi âm lời dịch"}</button>
  <button class="btn" data-act="ipplayrec" ${recURL[recKey()]?"":"disabled"}>Nghe bản ghi</button>${SRC?`<button class="btn" data-act="ipsr" id="srbtn">${sr?"⏹ Dừng nhận diện":"Nhận diện giọng nói (vi)"}</button>`:""}<button class="btn" data-act="ipstop">Dừng</button><span id="ipstat" class="muted small" aria-live="polite"></span></div>
  <textarea data-in="ipans" data-k="${k}" rows="3" style="margin-top:10px" placeholder="Ghi lại lời dịch của bạn (gõ, hoặc bấm nhận diện giọng nói rồi nói tiếng Việt)…" aria-label="Lời dịch">${esc(s.ans[k]||"")}</textarea>
  <div class="row" style="margin-top:8px"><button class="btn sm" data-act="ipshow">${U.ipShow?"Ẩn":"Hiện"} transcript & bản dịch mẫu</button></div>
  <div class="ans ${U.ipShow?"on":""}" id="ipref" style="margin-top:10px">${g.map(x=>`<div class="line" style="cursor:default"><span class="who">${esc(x.who||"")}</span><div><div class="txt">${esc(x.ko||"(chưa có transcript)")}</div><div class="muted">${esc(x.vi||"(chưa có bản dịch mẫu — xem tab Tổng hợp)")}</div></div></div>`).join("")}</div>
  <div class="row" style="margin-top:12px;justify-content:space-between"><button class="btn" data-act="ipnav" data-d="-1" ${U.ipPos?"":"disabled"}>◀ Đoạn trước</button><button class="btn ${last?"":"pri"}" data-act="ipnav" data-d="1" ${last?"disabled":""}>Đoạn tiếp ▶</button></div></section>
 <details class="card" style="margin-top:12px" open><summary><b>Giấy ghi chép</b> <span class="muted small">노트테이킹 — ghi ký hiệu trong lúc nghe</span></summary>
  <textarea data-in="ipnote" rows="4" style="margin-top:8px" aria-label="Ghi chép">${esc(s.note||"")}</textarea>
  <div class="phr" style="margin-top:8px">${SYMBOLS.map(x=>`<div><b>${x[0]}</b>${x[1]}</div>`).join("")}</div></details>
 ${last&&U.ipShow?`<div class="note" style="margin-top:14px">Bạn đã đến đoạn cuối. Hãy ôn phần tổng hợp bên dưới.</div>${P.summaryHTML(it)}`:""}`}
function shadowBody(it){const T=timed(it);if(!T.length)return needSeg;
 return `<section class="card"><div class="row"><button class="btn pri" data-act="iprun" data-v="0">${SPK} Nghe lần lượt</button><button class="btn" data-act="iprun" data-v="1">Shadowing</button><button class="btn" data-act="ipstop">Dừng</button><button class="btn" data-act="iphide">${U.hideT?"Hiện":"Ẩn"} transcript</button><span id="ipstat" class="muted small" aria-live="polite"></span></div>
 <div class="${U.hideT?"hide":""}" style="margin-top:10px">${T.map((x,i)=>`<div class="line" id="ln-${i}" data-act="ipline" data-i="${i}"><span class="who">${esc(x.who||"")}<br><span class="small">${fmtS(x.start)}</span></span><span class="txt">${esc(x.ko||"(chưa có transcript)")}</span></div>`).join("")}</div>
 <p class="muted small" style="margin-bottom:0">Shadowing: phát một đoạn, dừng đúng bằng độ dài đoạn đó để bạn nhại lại. Bấm vào một dòng để nghe riêng.</p></section>`}
/* --- chia đoạn trên âm thanh gốc --- */
function marksList(it){const m=st(it.id).marks;
 return m.length?`<ol class="small" style="padding-left:20px;margin:8px 0">${m.slice(0,-1).map((t,i)=>`<li>${fmtS(t)} – ${fmtS(m[i+1])} <button class="btn sm" data-act="mkplay" data-i="${i}">Nghe</button></li>`).join("")}</ol>
  <div class="row small muted">Điểm cắt: ${m.map((t,i)=>`<span class="pill" style="margin:2px">${fmtS(t)} <button data-act="mkdel" data-i="${i}" aria-label="Xóa điểm cắt" style="border:0;background:none;color:inherit;cursor:pointer;padding:0 2px">×</button></span>`).join("")}</div>`:`<p class="muted small">Chưa có điểm cắt nào.</p>`}
function markBody(it){
 return `<section class="card"><p class="small muted" style="margin-top:0">Phát âm thanh gốc, bấm <b>✂ Cắt tại đây</b> (hoặc phím <b>C</b>) ở <b>đầu đoạn đầu tiên</b>, <b>sau mỗi câu / ý</b>, và ở <b>cuối</b>. n điểm cắt tạo ra n − 1 đoạn luyện.</p>
 <div class="row"><button class="btn" data-act="mkback">⏪ 3 giây</button><button class="btn pri" data-act="mktoggle">▶ / ⏸</button><button class="btn pri" data-act="mkcut">✂ Cắt tại đây</button><span class="timer" style="font-size:24px" id="ptime">0:00.0</span></div>
 <div id="mklist">${marksList(it)}</div>
 <div class="row" style="margin-top:10px"><button class="btn pri" data-act="mksave">Lưu thành các đoạn luyện</button><button class="btn" data-act="mkclear">Xóa hết điểm cắt</button></div>
 ${P.isLocal(it)?"":`<p class="note warn small">Đây là bài trong repo: thay đổi chỉ lưu trên trình duyệt này. Muốn lưu lâu dài, chép JSON ở tab Tổng hợp rồi cập nhật file <code>data/interpretation.js</code>.</p>`}</section>`}
function sumBody(it){const noKo=!it.segments.some(x=>x.ko);
 return `${it.notes&&it.notes.length?`<div class="note" style="margin-bottom:14px"><b>Ghi chú phiên dịch</b><ul style="margin:6px 0 0;padding-left:18px">${it.notes.map(n=>`<li>${esc(n)}</li>`).join("")}</ul></div>`:""}
 ${P.summaryHTML(it,{empty:"Dùng khung bên dưới để thêm."})}
 <section class="card" style="margin-top:14px"><h3>${noKo?"1. Dán bản chép lời":"Cập nhật bản chép lời"}</h3><p class="muted small">Bản chép lời tiếng Hàn từ YouTube (giữ mốc thời gian). Có mốc thời gian thì web tự chia đoạn theo đúng câu.</p>
  <textarea id="ip-trans" class="kr" rows="5" aria-label="Bản chép lời" placeholder="0:03&#10;안녕하십니까…"></textarea><div class="row" style="margin-top:8px"><button class="btn" data-act="iptrans">Lưu bản chép lời</button></div></section>
 <section class="card" style="margin-top:14px"><h3>${noKo?"2. ":""}Phần tổng hợp & bản dịch mẫu từ Claude</h3><p class="muted small">Chép lời nhắc → dán vào Claude → dán JSON trả về vào ô dưới.</p>
  <div class="row"><button class="btn" data-act="ipsumprompt" ${noKo?"disabled":""}>Chép lời nhắc tạo tổng hợp</button></div><textarea id="ip-sumjson" rows="6" style="margin-top:8px" aria-label="JSON tổng hợp" placeholder='{"segments_vi":[…],"vocab":[…],"grammar":[…]}'></textarea>
  <div class="row" style="margin-top:8px"><button class="btn pri" data-act="ipsumimp">Thêm vào bài</button><button class="btn" data-act="ipcopyjson">Chép JSON cả bài (để đưa lên GitHub)</button></div></section>`}
function body(it){return U.ipTab==="shadow"?shadowBody(it):U.ipTab==="sum"?sumBody(it):U.ipTab==="mark"?markBody(it):consBody(it)}
function player(it){if(it.youtube)return `<div class="yt"><div id="ytp"></div></div>`;
 if(it.audio)return `<audio id="aup" controls preload="metadata" src="${esc(it.audio)}" style="width:100%;max-width:720px"></audio>`;
 return `<div class="note warn">Bài này chưa có nguồn âm thanh gốc. Thêm trường <code>youtube</code> hoặc <code>audio</code> trong dữ liệu, hoặc tạo lại bài với link nguồn.</div>`}
function exView(it){return `<button class="btn sm" data-act="ipback">← Danh sách bài</button>
 <h1 style="margin-top:14px">${esc(it.title)}</h1><div class="row small muted" style="margin-bottom:12px"><span class="pill">${it.kind==="news"?"Tin tức":"Hội thoại hằng ngày"}</span><span>${esc(it.source||"")}</span>${it.level?`<span>· ${esc(it.level)}</span>`:""}${it.url?`<a href="${esc(it.url)}" target="_blank" rel="noopener">Mở nguồn gốc ↗</a>`:""}</div>
 ${player(it)}
 <div class="tabs" style="margin-top:14px">${[["cons","Dịch đuổi"],["shadow","Nghe & shadowing"],["mark","Chia đoạn"],["sum","Tổng hợp từ & ngữ pháp"]].map(t=>`<button class="${U.ipTab===t[0]?"on":""}" data-act="iptab" data-v="${t[0]}">${t[1]}</button>`).join("")}</div>
 <div id="ipbody">${body(it)}</div>`}

/* =====================================================================
   LUYỆN SỐ LIỆU
   ===================================================================== */
const rnd=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
P.koNum=n=>{const jo=Math.floor(n/1e12),ek=Math.floor(n%1e12/1e8),man=Math.floor(n%1e8/1e4),rest=n%1e4,p=[];if(jo)p.push(jo+"조");if(ek)p.push(ek+"억");if(man)p.push(man+"만");if(rest)p.push(String(rest));return p.join(" ")||"0"};
const fmtVi=x=>x.toLocaleString("vi-VN",{maximumFractionDigits:3});
P.viWords=n=>n>=1e9?fmtVi(n/1e9)+" tỷ":n>=1e6?fmtVi(n/1e6)+" triệu":n>=1e4?fmtVi(n/1e3)+" nghìn":fmtVi(n);
P.parseVi=s=>{s=String(s).toLowerCase().replace(/đồng|won|người|₩|원|명/g," ");const U2={"nghìn tỷ":1e12,"ngàn tỷ":1e12,"tỷ":1e9,"tỉ":1e9,"triệu":1e6,"nghìn":1e3,"ngàn":1e3};
 const re=/(\d[\d.,]*)\s*(nghìn tỷ|ngàn tỷ|tỷ|tỉ|triệu|nghìn|ngàn)?/g;let m,t=0,found=false;
 while((m=re.exec(s))){let x=m[1].replace(/[.,]+$/,"");
  if(/^\d{1,3}(\.\d{3})+$/.test(x))x=x.replace(/\./g,"");            // 1.200.000 (dấu chấm phân cách nghìn)
  else if(!m[2]&&/^\d{1,3}(,\d{3})+$/.test(x))x=x.replace(/,/g,"");  // 1,200,000 kiểu Anh, không kèm đơn vị
  else if(x.includes(","))x=x.replace(/\./g,"").replace(",",".");    // 1,5 tỷ (dấu phẩy thập phân)
  const v=parseFloat(x);if(isNaN(v))continue;t+=v*(U2[m[2]]||1);found=true}
 return found?Math.round(t):NaN};
function genNum(type){if(type==="mix")type=["money","money","people","pct"][rnd(0,3)];
 if(type==="pct"){const a=rnd(1,999)/10;return{type,a,ko:a+"퍼센트",vi:fmtVi(a)+"%"}}
 if(type==="people"){const a=rnd(1,9999)*1000+(Math.random()<.5?rnd(1,999):0);return{type,a,ko:P.koNum(a)+" 명",vi:P.viWords(a)+" người ("+fmtVi(a)+")"}}
 const r=Math.random();const a=r<.35?rnd(1,9999)*1e4:r<.75?rnd(1,999)*1e8+rnd(0,99)*1e6:rnd(1,99)*1e12+rnd(0,9999)*1e8;
 return{type:"money",a,ko:P.koNum(a)+" 원",vi:P.viWords(a)+" won ("+fmtVi(a)+")"}}
function numView(){const N=U.num;
 return `<button class="btn sm" data-act="ipback">← Danh sách bài</button><h1 style="margin-top:14px">Luyện số liệu <span class="kr muted" style="font-size:.6em">숫자 통역</span></h1>
 <p class="lead">Nghe con số tiếng Hàn rồi gõ sang tiếng Việt, ví dụ “352 triệu”, “1.200 tỷ”, “12,5”. Quy tắc: 만 = 10 nghìn · 억 = 100 triệu · 조 = 1 nghìn tỷ. (Số tạo ngẫu nhiên nên dùng giọng máy.)</p>
 <section class="card"><div class="row"><select data-in="numtype" aria-label="Loại số">${[["money","Tiền (원)"],["people","Số người (명)"],["pct","Phần trăm"],["mix","Trộn lẫn"]].map(o=>`<option value="${o[0]}" ${N.type===o[0]?"selected":""}>${o[1]}</option>`).join("")}</select>
  <button class="btn pri" data-act="numnew">${SPK} Số mới</button><button class="btn" data-act="numagain" ${N.cur?"":"disabled"}>Nghe lại</button><span class="muted small" id="num-stat">Đúng ${N.ok}/${N.n}</span></div>
  <div class="row" style="margin-top:12px;flex-wrap:nowrap"><input type="text" id="num-ans" placeholder="Gõ số tiếng Việt rồi nhấn Enter" aria-label="Đáp án" autocomplete="off"><button class="btn" data-act="numchk">Kiểm tra</button></div>
  <div id="num-fb" style="margin-top:10px"></div></section>
 <h2>Bảng quy đổi nhanh</h2><div class="scroll"><table class="stack"><thead><tr><th>Tiếng Hàn</th><th>Giá trị</th><th>Tiếng Việt</th></tr></thead><tbody>
 ${[["1만","10.000","mười nghìn"],["10만","100.000","một trăm nghìn"],["100만","1.000.000","một triệu"],["1000만 (천만)","10.000.000","mười triệu"],["1억","100.000.000","một trăm triệu"],["10억","1.000.000.000","một tỷ"],["100억","10.000.000.000","mười tỷ"],["1000억 (천억)","100.000.000.000","một trăm tỷ"],["1조","1.000.000.000.000","một nghìn tỷ"]].map(r=>`<tr><td data-l="Hàn" class="kr"><b>${r[0]}</b></td><td data-l="Giá trị">${r[1]}</td><td data-l="Việt">${r[2]}</td></tr>`).join("")}</tbody></table></div>`}
function numCheck(){const N=U.num,inp=$("#num-ans"),fb=$("#num-fb");if(!N.cur){toast("Bấm “Số mới” trước.");return}if(!inp.value.trim())return;
 const c=N.cur;const v=c.type==="pct"?parseFloat(inp.value.replace(",",".").replace(/[^\d.]/g,"")):P.parseVi(inp.value);const ok=c.type==="pct"?Math.abs(v-c.a)<1e-9:v===c.a;
 N.n++;if(ok)N.ok++;else addMistake({key:"num-"+c.ko,src:"Luyện số",q:c.ko,o:null,a:c.vi});touch();
 fb.innerHTML=`<div class="note ${ok?"":"warn"}"><b>${ok?"Chính xác!":"Chưa đúng."}</b> <span class="kr">${esc(c.ko)}</span> = <b>${esc(c.vi)}</b>${ok?"":` · bạn gõ: ${esc(inp.value)}${isNaN(v)?"":" (= "+fmtVi(v)+")"}`}</div>`;
 const s=$("#num-stat");if(s)s.textContent=`Đúng ${N.ok}/${N.n}`;N.cur=ok?null:N.cur}

R.interpret=()=>{if(U.ip==="__num")return numView();const it=cur();if(!it){U.ip=null;return listView()}return exView(it)};
AFTER.interpret=()=>{const it=cur();if(it&&hasSrc(it))mount(it)};
const reBody=()=>{const it=cur(),b=$("#ipbody");if(it&&b)b.innerHTML=body(it)};

/* =====================================================================
   SỰ KIỆN
   ===================================================================== */
Object.assign(A,{
 ipopen:el=>{stopAll();U.ip=el.dataset.id;U.ipPos=0;U.ipShow=false;const it=cur();U.ipTab=it&&!timed(it).length?"mark":"cons";P.render();window.scrollTo(0,0)},
 ipback:()=>{stopAll();clearInterval(clock);U.ip=null;P.render();window.scrollTo(0,0)},
 ipdel:el=>confirmDlg("Xóa bài này?",()=>{const id=el.dataset.id;S.lib.ip=S.lib.ip.filter(x=>x.id!==id);delete S.ip[id];save();P.render()}),
 ipnew:()=>{const link=$("#ni-link").value.trim();const ytv=P.ytId(link);const audio=!ytv&&isAudioURL(link)?link:"";
  if(!ytv&&!audio){toast("Cần link YouTube hoặc link file âm thanh (.mp3, .m4a…).");return}
  const segs=P.parseTranscript($("#ni-text").value);
  const it={id:"my-i"+Date.now().toString(36),kind:$("#ni-kind").value,source:$("#ni-src").value.trim(),url:link,youtube:ytv,audio,date:today(),title:$("#ni-title").value.trim()||(segs[0]?segs[0].ko.slice(0,40)+"…":"Bài phiên dịch "+today()),segments:segs,notes:[],vocab:[],grammar:[]};
  S.lib.ip.push(it);save();P.refreshLibrary();U.ip=it.id;U.ipPos=0;const hasT=timed(it).length;U.ipTab=hasT?"sum":"mark";P.render();window.scrollTo(0,0);
  toast(hasT?`Đã tạo ${hasT} đoạn theo mốc thời gian. Tiếp theo: tạo phần tổng hợp.`:"Đã tạo bài. Hãy chia đoạn khi nghe.")},
 ipimp:()=>{if(P.importItems("ip",$("#ip-json").value))P.render()},
 iptab:el=>{stopAll();U.ipTab=el.dataset.v;$$(".tabs [data-act=iptab]").forEach(b=>b.classList.toggle("on",b===el));reBody()},
 ipplay:()=>{const it=cur();const g=groups(it)[U.ipPos];stopAll();status("Đang phát…");touch();playGroup(it,g,()=>status("Đến lượt bạn dịch — có thể bấm ghi âm."))},
 ipstop:()=>stopAll(),
 ipnav:el=>{stopAll();U.ipPos+=+el.dataset.d;U.ipShow=false;reBody()},
 ipshow:()=>{U.ipShow=!U.ipShow;reBody()},
 iprec:async el=>{if(mr&&mr.state==="recording"){mr.stop();return}
  if(!navigator.mediaDevices||!window.MediaRecorder){toast("Trình duyệt này không hỗ trợ ghi âm.");return}
  try{const stream=await navigator.mediaDevices.getUserMedia({audio:true});chunks=[];const key=recKey();mr=new MediaRecorder(stream);
   mr.ondataavailable=e=>{if(e.data.size)chunks.push(e.data)};
   mr.onstop=()=>{stream.getTracks().forEach(t=>t.stop());if(recURL[key])URL.revokeObjectURL(recURL[key]);recURL[key]=URL.createObjectURL(new Blob(chunks,{type:mr.mimeType||"audio/webm"}));mr=null;reBody();toast("Đã ghi xong — bấm “Nghe bản ghi”.")};
   mr.start();el.textContent="⏹ Dừng ghi";status("🎙 Đang ghi âm…")}catch(e){toast("Không truy cập được micro — hãy cho phép quyền micro.")}},
 ipplayrec:()=>{const u=recURL[recKey()];if(u){stopAll();new Audio(u).play()}},
 ipsr:el=>{if(sr){sr.stop();return}const ta=$("[data-in=ipans]");const base=ta.value?ta.value.trim()+" ":"";sr=new SRC();sr.lang="vi-VN";sr.continuous=true;sr.interimResults=true;
  sr.onresult=e=>{let t="";for(let i=0;i<e.results.length;i++)t+=e.results[i][0].transcript;ta.value=base+t;IN.ipans(ta)};
  sr.onend=()=>{sr=null;const b=$("#srbtn");if(b)b.textContent="Nhận diện giọng nói (vi)";status("")};sr.onerror=e=>{toast("Nhận diện giọng nói lỗi: "+e.error)};
  try{sr.start();el.textContent="⏹ Dừng nhận diện";status("Nói lời dịch tiếng Việt…")}catch(e){sr=null}},
 iphide:()=>{U.hideT=!U.hideT;reBody()},
 iprun:el=>{const it=cur(),T=timed(it),shadow=el.dataset.v==="1";stopAll();const my=++runTok;let i=0;touch();
  const step=()=>{if(my!==runTok)return;if(i>=T.length){markLine(-1);status(shadow?"Hoàn thành shadowing.":"");return}
   markLine(i);const s=T[i];status(`Đoạn ${i+1}/${T.length}`);const ln=document.getElementById("ln-"+i);if(ln&&!U.hideT)ln.scrollIntoView({block:"nearest"});
   playGroup(it,[s],()=>{if(my!==runTok)return;const wait=shadow?Math.max(1500,((s.end??s.start+5)-s.start)*1100):300;
    if(shadow)status("🎙 Đến lượt bạn nhại lại…");i++;setTimeout(step,wait)})};step()},
 ipline:el=>{const it=cur(),i=+el.dataset.i;stopAll();markLine(i);playGroup(it,[timed(it)[i]],()=>markLine(-1))},
 /* chia đoạn */
 mktoggle:()=>{if(PL.playing())PL.pause();else PL.play()},
 mkback:()=>PL.seek(PL.time()-3),
 mkcut:()=>{const it=cur();if(!PL.ready()){toast("Trình phát chưa sẵn sàng.");return}const t=Math.round(PL.time()*10)/10,m=st(it.id).marks;
  if(m.some(x=>Math.abs(x-t)<0.3))return;m.push(t);m.sort((a,b)=>a-b);save();$("#mklist").innerHTML=marksList(it);status("")},
 mkdel:el=>{const it=cur();st(it.id).marks.splice(+el.dataset.i,1);save();$("#mklist").innerHTML=marksList(it)},
 mkplay:el=>{const it=cur(),m=st(it.id).marks,i=+el.dataset.i;stopAll();playRange(m[i],m[i+1])},
 mkclear:()=>confirmDlg("Xóa hết điểm cắt?",()=>{const it=cur();st(it.id).marks=[];save();reBody()}),
 mksave:()=>{const it=cur(),m=st(it.id).marks;if(m.length<2){toast("Cần ít nhất 2 điểm cắt (đầu và cuối).");return}
  const old=it.segments,n=m.length-1,keep=old.length===n;
  const apply=()=>{it.segments=m.slice(0,-1).map((t,i)=>({who:keep?old[i].who||"":"",ko:keep?old[i].ko||"":"",vi:keep?old[i].vi||"":"",start:t,end:m[i+1]}));
   S.ip[it.id].ans={};save();U.ipPos=0;U.ipTab="cons";P.render();toast(`Đã tạo ${n} đoạn luyện.${keep?" Giữ nguyên transcript theo thứ tự.":""}`)};
  if(old.length&&!keep&&old.some(x=>x.ko))confirmDlg(`Số đoạn mới (${n}) khác số câu transcript (${old.length}); transcript cũ sẽ bị tách khỏi đoạn. Tiếp tục?`,apply);else apply()},
 /* tổng hợp */
 iptrans:()=>{const it=cur();const segs=P.parseTranscript($("#ip-trans").value);if(!segs.length){toast("Hãy dán bản chép lời.");return}
  if(!segs.some(s=>s.start!=null)&&timed(it).length===segs.length){segs.forEach((s,i)=>{const o=timed(it)[i];s.start=o.start;s.end=o.end})}
  it.segments=segs;save();P.refreshLibrary();reBody();toast(segs.some(s=>s.start!=null)?`Đã lưu ${segs.length} đoạn kèm mốc thời gian.`:"Đã lưu bản chép lời (chưa có mốc thời gian — dùng tab Chia đoạn).")},
 ipsumprompt:()=>P.copyText(P.summaryPrompt(cur())),
 ipsumimp:()=>{if(P.applySummary(cur(),$("#ip-sumjson").value))reBody()},
 ipcopyjson:()=>{const it=cur();const o={...it};P.copyText(JSON.stringify(o,null,1)+",")},
 numnew:()=>{U.num.cur=genNum(U.num.type);P.speak(U.num.cur.ko);const i=$("#num-ans");i.value="";i.focus();$("#num-fb").innerHTML="";const b=$("[data-act=numagain]");if(b)b.disabled=false},
 numagain:()=>{if(U.num.cur)P.speak(U.num.cur.ko)},
 numchk:()=>numCheck()
});
let dt;
IN.ipans=el=>{const it=cur();if(!it)return;st(it.id).ans[el.dataset.k]=el.value;clearTimeout(dt);dt=setTimeout(()=>{save();touch()},500)};
IN.ipnote=el=>{const it=cur();if(!it)return;st(it.id).note=el.value;clearTimeout(dt);dt=setTimeout(save,500)};
IN.ipsize=el=>{const first=groups(cur())[U.ipPos][0].idx;U.ipSize=+el.value;U.ipPos=Math.floor(first/U.ipSize);U.ipShow=false;reBody()};
IN.numtype=el=>{U.num.type=el.value;U.num.cur=null};
document.addEventListener("keydown",e=>{if(e.key==="Enter"&&e.target.id==="num-ans"){e.preventDefault();numCheck()}
 if((e.key==="c"||e.key==="C")&&P.view==="interpret"&&U.ipTab==="mark"&&!e.target.closest("input,textarea,select")){e.preventDefault();A.mkcut()}});
window.addEventListener("hashchange",()=>{clearInterval(segTimer);runTok++;try{PL.pause()}catch(e){}});
})();
