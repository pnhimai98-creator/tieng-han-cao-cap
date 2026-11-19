/* =====================================================================
   LUYỆN BIÊN DỊCH — bài báo Hàn Quốc → tiếng Việt
   ===================================================================== */
(()=>{
const P=window.APP, {$,esc,sayBtn,S,U,R,A,IN,toast,confirmDlg,save,touch,today,allTR}=P;
U.tr=U.tr||null;U.trSum=U.trSum||"after";
const SOURCES=["YTN","KBS","SBS","MBC","JTBC","연합뉴스","한겨레","조선일보","정책브리핑 (korea.kr)","Khác"];
const CRIT=["Chính xác về nghĩa","Thuật ngữ","Văn phong báo chí tiếng Việt","Trôi chảy, tự nhiên"];
const st=id=>(S.tr[id]=S.tr[id]||{ans:[],head:"",done:false,rate:{},rev:{}});

/* ---------- chia câu tiếng Hàn ---------- */
P.splitKo=(text,mode)=>{text=String(text).replace(/\r/g,"").trim();if(!text)return[];
 if(mode==="para")return text.split(/\n\s*\n|\n/).map(s=>s.trim()).filter(Boolean);
 const t=text.replace(/\s*\n\s*/g," ").replace(/(\d)\.(\d)/g,"$1⁣$2");
 return (t.match(/[^.?!。]+(?:[.?!。]+["”’』」)]*|$)/g)||[]).map(s=>s.replace(/⁣/g,".").trim()).filter(s=>s.length>1)};

/* ---------- so sánh theo từ ---------- */
const tok=s=>String(s||"").split(/\s+/).filter(Boolean);
const nw=w=>w.toLowerCase().replace(/[.,;:!?“”"'‘’()\[\]…–—-]/g,"");
function lcsMarks(a,b){const A=a.map(nw),B=b.map(nw),n=A.length,m=B.length,d=Array.from({length:n+1},()=>new Uint16Array(m+1));
 for(let i=n-1;i>=0;i--)for(let j=m-1;j>=0;j--)d[i][j]=A[i]&&A[i]===B[j]?d[i+1][j+1]+1:Math.max(d[i+1][j],d[i][j+1]);
 const ia=new Array(n).fill(false),ib=new Array(m).fill(false);let i=0,j=0;
 while(i<n&&j<m){if(A[i]&&A[i]===B[j]){ia[i]=ib[j]=true;i++;j++}else if(d[i+1][j]>=d[i][j+1])i++;else j++}
 return {ia,ib,common:d[0][0]}}
P.lcsMarks=lcsMarks;
function refHTML(s,ans){if(!s.vi)return `<p class="muted small" style="margin:0">Chưa có bản dịch mẫu. Bấm “Chép lời nhắc tạo tổng hợp” ở cuối trang, dán vào Claude, rồi dán kết quả JSON vào ô bên dưới.</p>`;
 const r=tok(s.vi),u=tok(ans);if(!u.length)return `<div class="small muted">Bản mẫu</div><div>${esc(s.vi)}</div>`;
 const {ia,ib,common}=lcsMarks(r,u);const pct=Math.round(common/Math.max(r.length,1)*100);
 return `<div class="small muted">Bản mẫu <span class="pill">${pct}% từ trùng</span> — <mark class="miss">tô vàng</mark>: có trong bản mẫu, bạn chưa dùng</div><div>${r.map((w,i)=>ia[i]?esc(w):`<mark class="miss">${esc(w)}</mark>`).join(" ")}</div>
 <div class="small muted" style="margin-top:6px">Bản của bạn — <span class="extra">gạch chân</span>: khác bản mẫu (chưa chắc là sai)</div><div>${u.map((w,i)=>ib[i]?esc(w):`<span class="extra">${esc(w)}</span>`).join(" ")}</div>`}

/* ---------- danh sách bài ---------- */
function card(t){const s=S.tr[t.id];const filled=s?s.ans.filter(x=>x&&x.trim()).length:0;const local=P.isLocal(t);
 return `<article class="card"><div class="row"><span class="pill">${esc(t.source||"")}</span>${t.topic?`<span class="pill r">${esc(t.topic)}</span>`:""}${local?'<span class="pill">bài của tôi</span>':""}</div>
 <h3 style="margin:8px 0 4px">${esc(t.title)}</h3><p class="muted small" style="margin:0 0 10px">${esc(t.date||"")} · ${t.segments.length} câu · ${(t.vocab||[]).length} từ · ${(t.grammar||[]).length} cấu trúc${s&&s.done?" · ✓ đã nộp":filled?` · đã dịch ${filled}/${t.segments.length}`:""}</p>
 <div class="row"><button class="btn sm pri" data-act="tropen" data-id="${esc(t.id)}">${filled?"Tiếp tục":"Bắt đầu"}</button>${local?`<button class="btn sm" data-act="trdel" data-id="${esc(t.id)}">Xóa</button>`:""}</div></article>`}
function listView(){return `<h1>Luyện biên dịch <span class="kr muted" style="font-size:.6em">번역</span></h1>
 <p class="lead">Dịch bài báo Hàn → Việt từng câu, so với bản mẫu, tự chấm theo 4 tiêu chí. Bài nào cũng kết thúc bằng bảng tổng hợp từ vựng và cấu trúc – ngữ pháp.</p>
 <div class="grid">${allTR().map(card).join("")}</div>
 <h2>Thêm bài luyện</h2><div class="two"><div class="card"><h3>Dán bài báo của tôi</h3>
 <p class="muted small">Dán bài từ YTN, KBS, SBS… Toàn văn chỉ lưu trong trình duyệt này, không đưa lên GitHub.</p>
 <div style="display:grid;gap:8px"><input type="text" id="nt-title" placeholder="Tiêu đề (tiếng Hàn hoặc Việt)" aria-label="Tiêu đề">
 <div class="row" style="flex-wrap:nowrap"><select id="nt-src" aria-label="Nguồn">${SOURCES.map(s=>`<option>${esc(s)}</option>`).join("")}</select><input type="text" id="nt-url" placeholder="Link bài gốc (không bắt buộc)" aria-label="Link bài gốc"></div>
 <textarea id="nt-text" class="kr" rows="7" placeholder="Dán nội dung bài báo tiếng Hàn…" aria-label="Nội dung bài báo"></textarea>
 <div class="row"><label class="small muted" for="nt-mode">Chia theo</label><select id="nt-mode"><option value="sent">Câu</option><option value="para">Đoạn (xuống dòng)</option></select><button class="btn pri" data-act="trnew">Tạo bài luyện</button></div></div>
 <p class="muted small" style="margin-bottom:0">Sau khi tạo, dùng nút “Chép lời nhắc tạo tổng hợp” để Claude soạn bản dịch mẫu + bảng từ vựng, ngữ pháp, rồi dán JSON trả về vào bài.</p></div>
 <div class="card"><h3>Nhập bài hoàn chỉnh từ JSON</h3><p class="muted small">Dán một bài (hoặc mảng nhiều bài) đúng định dạng trong <code>data/translation.js</code>, ví dụ do Claude soạn. Muốn bài hiện cho mọi thiết bị: dán khối đó vào file <code>data/translation.js</code> trên GitHub.</p>
 <textarea id="tr-json" rows="9" placeholder='{"id":"t3","title":"…","segments":[{"ko":"…","vi":"…"}],"vocab":[…],"grammar":[…]}' aria-label="JSON bài biên dịch"></textarea>
 <div class="row" style="margin-top:8px"><button class="btn" data-act="trimp">Nhập bài</button></div></div></div>`}

/* ---------- một bài ---------- */
function exView(t){const s=st(t.id);const local=P.isLocal(t);const showSum=U.trSum==="before"||s.done;
 return `<button class="btn sm" data-act="trback">← Danh sách bài</button>
 <h1 style="margin-top:14px">${esc(t.title)}</h1>
 <div class="row small muted" style="margin-bottom:14px"><span class="pill">${esc(t.source||"")}</span>${t.topic?`<span>${esc(t.topic)}</span>`:""}${t.level?`<span>· ${esc(t.level)}</span>`:""}<span>· ${esc(t.date||"")}</span>${t.url?`<a href="${esc(t.url)}" target="_blank" rel="noopener">Mở bài gốc ↗</a>`:""}</div>
 ${t.headline?`<section class="card" style="margin-bottom:14px"><p class="muted small" style="margin:0">Bước 1 · Giải mã tiêu đề báo</p><div class="row" style="margin:6px 0"><span class="kr" style="font-size:22px;font-weight:700">${esc(t.headline.ko)}</span>${sayBtn(t.headline.ko)}</div>
  <input type="text" data-in="trhead" value="${esc(s.head)}" placeholder="Bạn hiểu tiêu đề này thế nào?" aria-label="Dịch tiêu đề"><div class="row" style="margin-top:8px"><button class="btn sm" data-act="toggle" data-t="hd-ans">Xem gợi ý và bản dịch</button></div>
  <div class="ans note" id="hd-ans" style="margin-top:8px">${t.headline.hint?`<p class="small" style="margin:0 0 4px"><b>Gợi ý:</b> <span class="kr">${esc(t.headline.hint)}</span></p>`:""}<p style="margin:0">${esc(t.headline.vi||"")}</p></div></section>`:""}
 <div class="tabs"><button class="${U.trSum==="before"?"on":""}" data-act="trsum" data-v="before">Xem tổng hợp trước khi dịch (dễ)</button><button class="${U.trSum==="after"?"on":""}" data-act="trsum" data-v="after">Mở tổng hợp sau khi nộp (khó)</button></div>
 ${U.trSum==="before"?P.summaryHTML(t,{empty:local?"Xem cuối trang để thêm.":""}):""}
 <h2>${t.headline?"Bước 2 · ":""}Dịch từng câu</h2>
 ${t.segments.map((g,i)=>`<div class="card seg2"><div class="sno">${i+1}</div><div><div class="row" style="flex-wrap:nowrap;align-items:flex-start">${sayBtn(g.ko)}<div class="ex">${esc(g.ko)}</div></div>
  <textarea data-in="trans" data-i="${i}" rows="2" placeholder="Bản dịch của bạn…" aria-label="Bản dịch câu ${i+1}">${esc(s.ans[i]||"")}</textarea>
  <div class="row" style="margin-top:6px"><button class="btn sm" data-act="trrev" data-i="${i}">${s.rev[i]||s.done?"Ẩn bản mẫu":"So với bản mẫu"}</button></div>
  <div class="ref ${s.rev[i]||s.done?"on":""}" id="ref-${i}">${refHTML(g,s.ans[i])}</div></div></div>`).join("")}
 <section class="card" style="margin:16px 0">${!s.done?`<div class="row"><button class="btn pri" data-act="trdone">Nộp bài & mở tổng hợp</button><span class="muted small">Đã dịch ${s.ans.filter(x=>x&&x.trim()).length}/${t.segments.length} câu</span></div>`:
  `<h3>Tự chấm</h3><div class="scroll"><table><tbody>${CRIT.map((c,k)=>`<tr><td>${c}</td><td style="width:160px"><select data-in="trrate" data-c="${k}" aria-label="${c}">${["—",1,2,3,4,5].map(v=>`<option ${String(s.rate[k]??"—")===String(v)?"selected":""}>${v}</option>`).join("")}</select></td></tr>`).join("")}</tbody></table></div>
  <p class="small muted">1 = còn nhiều lỗi · 5 = gần như bản mẫu. Muốn được chữa chi tiết, chép lời nhắc gửi Claude.</p>
  <div class="row"><button class="btn pri" data-act="trfix">Chép lời nhắc nhờ Claude chữa</button><button class="btn" data-act="trreset">Làm lại bài</button></div>`}</section>
 ${showSum&&t.notes&&t.notes.length?`<div class="note" style="margin-bottom:14px"><b>Ghi chú kỹ thuật dịch</b><ul style="margin:6px 0 0;padding-left:18px">${t.notes.map(n=>`<li>${esc(n)}</li>`).join("")}</ul></div>`:""}
 ${U.trSum==="after"?(s.done?P.summaryHTML(t,{empty:""}):`<section class="card sum"><h3>Tổng hợp từ vựng & ngữ pháp</h3><p class="muted" style="margin:0">Sẽ mở sau khi bạn nộp bài (${(t.vocab||[]).length} từ · ${(t.grammar||[]).length} cấu trúc).</p></section>`):""}
 ${local?`<section class="card" style="margin-top:14px"><h3>Phần tổng hợp & bản dịch mẫu từ Claude</h3><p class="muted small">1) Chép lời nhắc → 2) dán vào Claude → 3) dán JSON trả về vào ô dưới.</p>
  <div class="row"><button class="btn" data-act="trsumprompt">Chép lời nhắc tạo tổng hợp</button></div>
  <textarea id="tr-sumjson" rows="6" style="margin-top:8px" placeholder='{"segments_vi":[…],"vocab":[…],"grammar":[…]}' aria-label="JSON tổng hợp"></textarea>
  <div class="row" style="margin-top:8px"><button class="btn pri" data-act="trsumimp">Thêm vào bài</button></div></section>`:""}`}

const cur=()=>U.tr?allTR().find(x=>x.id===U.tr):null;
R.translate=()=>{const t=cur();if(!t){U.tr=null;return listView()}return exView(t)};

/* ---------- sự kiện ---------- */
Object.assign(A,{
 tropen:el=>{U.tr=el.dataset.id;P.render();window.scrollTo(0,0)},
 trback:()=>{U.tr=null;P.render();window.scrollTo(0,0)},
 trdel:el=>confirmDlg("Xóa bài này và bản dịch của bạn?",()=>{const id=el.dataset.id;S.lib.tr=S.lib.tr.filter(x=>x.id!==id);delete S.tr[id];save();P.render()}),
 trnew:()=>{const text=$("#nt-text").value,title=$("#nt-title").value.trim();const segs=P.splitKo(text,$("#nt-mode").value);
  if(segs.length<1){toast("Hãy dán nội dung bài báo.");return}
  const it={id:"my-t"+Date.now().toString(36),kind:"own",source:$("#nt-src").value,url:$("#nt-url").value.trim(),date:today(),topic:"",level:"",title:title||segs[0].slice(0,40)+"…",segments:segs.map(ko=>({ko,vi:""})),notes:[],vocab:[],grammar:[]};
  S.lib.tr.push(it);save();P.refreshLibrary();U.tr=it.id;P.render();window.scrollTo(0,0);toast(`Đã tạo bài ${segs.length} câu.`)},
 trimp:()=>{if(P.importItems("tr",$("#tr-json").value))P.render()},
 trsum:el=>{U.trSum=el.dataset.v;P.render()},
 trrev:el=>{const t=cur(),s=st(t.id),i=+el.dataset.i;const r=document.getElementById("ref-"+i);const show=!r.classList.contains("on");s.rev[i]=show;save();r.classList.toggle("on",show);r.innerHTML=refHTML(t.segments[i],s.ans[i]);el.textContent=show?"Ẩn bản mẫu":"So với bản mẫu"},
 trdone:()=>{const t=cur(),s=st(t.id);const go2=()=>{s.done=true;save();touch();P.render();const el=document.getElementById("sum-"+t.id);if(el)el.scrollIntoView({block:"start"})};
  const miss=t.segments.length-s.ans.filter(x=>x&&x.trim()).length;if(miss)confirmDlg(`Còn ${miss} câu chưa dịch. Vẫn nộp bài?`,go2);else go2()},
 trreset:()=>confirmDlg("Xóa bản dịch và làm lại từ đầu?",()=>{const t=cur();S.tr[t.id]={ans:[],head:"",done:false,rate:{},rev:{}};save();P.render();window.scrollTo(0,0)}),
 trfix:()=>{const t=cur(),s=st(t.id);P.copyText(`Bạn là giảng viên biên dịch Hàn – Việt. Hãy chữa bản dịch của tôi theo từng câu:
1) lỗi sai hoặc thiếu nghĩa, 2) thuật ngữ, 3) văn phong báo chí tiếng Việt, 4) đề xuất bản dịch tốt hơn.
Cuối cùng: chấm điểm /10 cho từng tiêu chí, rồi tổng hợp từ vựng và cấu trúc tôi cần ôn thành bảng
KOR (phiên âm) | VN | ENG | Cấu trúc hay dùng | Từ đồng nghĩa / trái nghĩa KOR, kèm bảng cấu trúc – ngữ pháp.

Bài: ${t.title} — ${t.source||""} ${t.url||""}
${t.headline?`Tiêu đề gốc: ${t.headline.ko}\nTôi dịch tiêu đề: ${s.head||"(chưa dịch)"}\n`:""}
${t.segments.map((g,i)=>`[${i+1}] KO: ${g.ko}\n    Bản dịch của tôi: ${s.ans[i]||"(bỏ trống)"}`).join("\n")}`)},
 trsumprompt:()=>P.copyText(P.summaryPrompt(cur())),
 trsumimp:()=>{const t=cur();if(P.applySummary(t,$("#tr-sumjson").value))P.render()}
});
let dt;
IN.trans=el=>{const t=cur();if(!t)return;const s=st(t.id),i=+el.dataset.i;s.ans[i]=el.value;
 if(s.rev[i]||s.done){const r=document.getElementById("ref-"+i);if(r)r.innerHTML=refHTML(t.segments[i],el.value)}clearTimeout(dt);dt=setTimeout(()=>{save();touch()},500)};
IN.trhead=el=>{const t=cur();if(!t)return;st(t.id).head=el.value;clearTimeout(dt);dt=setTimeout(save,500)};
IN.trrate=el=>{const t=cur();const v=el.value;st(t.id).rate[el.dataset.c]=v==="—"?undefined:+v;save()};
})();
