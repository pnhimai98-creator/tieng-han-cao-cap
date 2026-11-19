/* =====================================================================
   KẾT NỐI GEMINI (Google AI Studio) — dùng khóa API miễn phí của chính bạn
   Khóa chỉ lưu trong trình duyệt (localStorage), KHÔNG nằm trong repo,
   KHÔNG nằm trong file sao lưu tiến độ.
   ===================================================================== */
(()=>{
const P=window.APP, {$,esc,A,toast}=P;
const GKEY="topik2-gemini";
const API="https://generativelanguage.googleapis.com/v1beta";
const DEFAULT_MODEL="gemini-3.6-flash";
const G={key:"",model:DEFAULT_MODEL,models:[]};
try{Object.assign(G,JSON.parse(localStorage.getItem(GKEY)||"{}"))}catch(e){}
const saveG=()=>{try{localStorage.setItem(GKEY,JSON.stringify(G))}catch(e){}};
P.gemOK=()=>!!G.key;

/* ---------- gọi Gemini ----------
   parts: mảng phần nội dung, ví dụ [{text:"…"}] hoặc [{file_data:{file_uri:"https://www.youtube.com/watch?v=…"}},{text:"…"}]
   opt.json = true → yêu cầu trả JSON và tự phân tích */
P.gemini=async(parts,opt={})=>{
 if(!G.key){openSettings();throw new Error("Chưa có khóa Gemini API — hãy dán khóa vào ô Cài đặt Gemini.")}
 const ctl=new AbortController(),to=setTimeout(()=>ctl.abort(),opt.timeout||240000);
 const body={contents:[{role:"user",parts}],generationConfig:{temperature:opt.temperature??0.2}};
 if(opt.json)body.generationConfig.responseMimeType="application/json";
 let res;
 try{res=await fetch(`${API}/models/${encodeURIComponent(G.model||DEFAULT_MODEL)}:generateContent`,{method:"POST",signal:ctl.signal,
   headers:{"Content-Type":"application/json","x-goog-api-key":G.key},body:JSON.stringify(body)})}
 catch(e){clearTimeout(to);throw new Error(e.name==="AbortError"?"Gemini xử lý quá lâu, đã hủy. Thử đoạn video ngắn hơn.":"Không kết nối được Gemini — kiểm tra mạng.")}
 clearTimeout(to);
 let data={};try{data=await res.json()}catch(e){}
 if(!res.ok){const m=(data.error&&data.error.message)||res.statusText;
  if(res.status===429)throw new Error("Đã hết lượt miễn phí (429). Đợi một lúc hoặc sang ngày mai rồi thử lại. Chi tiết: "+m);
  if(res.status===400&&/API key/i.test(m))throw new Error("Khóa API không hợp lệ. Kiểm tra lại trong Cài đặt Gemini.");
  if(res.status===403)throw new Error("Khóa bị từ chối (403): "+m);
  if(res.status===404)throw new Error(`Không có mô hình “${G.model}”. Mở Cài đặt Gemini → Kiểm tra khóa để chọn mô hình khác.`);
  throw new Error(`Gemini báo lỗi ${res.status}: ${m}`)}
 const c=data.candidates&&data.candidates[0];
 const text=c&&c.content&&c.content.parts?c.content.parts.filter(p=>!p.thought).map(p=>p.text||"").join(""):"";
 if(!text){const r=(c&&c.finishReason)||(data.promptFeedback&&data.promptFeedback.blockReason)||"không rõ";throw new Error("Gemini không trả nội dung (lý do: "+r+"). Video có thể quá dài, bị chặn hoặc không công khai.")}
 if(c.finishReason==="MAX_TOKENS"&&opt.json)throw new Error("Kết quả quá dài nên bị cắt. Hãy chọn đoạn video ngắn hơn (khoảng 3–8 phút).");
 if(!opt.json)return text;
 try{return P.parseJSON(text)}catch(e){throw new Error("Gemini trả về JSON lỗi. Bấm tạo lại một lần nữa.")}
};

/* nút đang chạy: khóa nút, hiện trạng thái */
P.busy=async(btn,label,fn)=>{const old=btn?btn.innerHTML:"";if(btn){btn.disabled=true;btn.innerHTML="⏳ "+label}
 try{return await fn()}catch(e){toast(e.message);console.warn(e);return null}finally{if(btn&&btn.isConnected){btn.disabled=false;btn.innerHTML=old}}};

/* hiển thị văn bản Markdown đơn giản (nhận xét của Gemini) */
P.mdLite=t=>esc(t).replace(/^#{1,4}\s*(.+)$/gm,"<b>$1</b>").replace(/\*\*(.+?)\*\*/g,"<b>$1</b>").replace(/^\s*[-*]\s+/gm,"• ").replace(/\n/g,"<br>");

/* ---------- hộp Cài đặt Gemini ---------- */
function openSettings(){if($(".dlg.gem"))return;const d=document.createElement("div");d.className="dlg gem";
 d.innerHTML=`<div class="card" role="dialog" aria-modal="true" aria-label="Cài đặt Gemini" style="max-width:560px">
 <h3 style="margin-top:0">✨ Cài đặt Gemini</h3>
 <ol class="small muted" style="padding-left:18px"><li>Mở <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener">aistudio.google.com/apikey</a>, đăng nhập Google.</li><li>Bấm <b>Create API key</b>, sao chép khóa (bắt đầu bằng <code>AIza…</code>).</li><li>Dán vào ô dưới → <b>Kiểm tra khóa</b> → chọn mô hình → <b>Lưu</b>.</li></ol>
 <label class="small" for="g-key">Khóa API</label><div class="row" style="flex-wrap:nowrap"><input type="password" id="g-key" value="${esc(G.key)}" placeholder="AIza…" autocomplete="off"><button class="btn sm" data-x="show">Hiện</button></div>
 <label class="small" for="g-model" style="display:block;margin-top:10px">Mô hình</label>
 <div class="row" style="flex-wrap:nowrap"><input type="text" id="g-model" list="g-models" value="${esc(G.model)}"><button class="btn sm" data-x="test">Kiểm tra khóa</button></div>
 <datalist id="g-models">${(G.models.length?G.models:[DEFAULT_MODEL,"gemini-3.8-flash","gemini-3.5-flash-lite","gemini-flash-latest"]).map(m=>`<option value="${esc(m)}">`).join("")}</datalist>
 <div id="g-msg" class="small" style="margin-top:8px"></div>
 <p class="small muted">Khóa chỉ lưu trong trình duyệt này, không đưa lên GitHub và không có trong file sao lưu. Gói miễn phí giới hạn số lượt mỗi ngày và Google có thể dùng nội dung gửi lên để cải thiện sản phẩm — đừng gửi tài liệu nội bộ.</p>
 <div class="row" style="justify-content:flex-end"><button class="btn" data-x="del">Xóa khóa</button><button class="btn" data-x="0">Đóng</button><button class="btn pri" data-x="save">Lưu</button></div></div>`;
 document.body.appendChild(d);
 d.addEventListener("click",async e=>{const b=e.target.closest("[data-x]");if(e.target===d){d.remove();return}if(!b)return;const x=b.dataset.x,msg=$("#g-msg",d);
  if(x==="0")d.remove();
  else if(x==="show"){const i=$("#g-key",d);i.type=i.type==="password"?"text":"password";b.textContent=i.type==="password"?"Hiện":"Ẩn"}
  else if(x==="del"){G.key="";saveG();$("#g-key",d).value="";msg.textContent="Đã xóa khóa."}
  else if(x==="save"){G.key=$("#g-key",d).value.trim();G.model=$("#g-model",d).value.trim()||DEFAULT_MODEL;saveG();d.remove();toast(G.key?"Đã lưu cài đặt Gemini.":"Chưa có khóa.")}
  else if(x==="test"){const k=$("#g-key",d).value.trim();if(!k){msg.textContent="Hãy dán khóa trước.";return}msg.textContent="Đang kiểm tra…";
   try{const r=await fetch(`${API}/models?pageSize=200`,{headers:{"x-goog-api-key":k}});const j=await r.json();if(!r.ok)throw new Error((j.error&&j.error.message)||r.status);
    const ms=(j.models||[]).filter(m=>(m.supportedGenerationMethods||[]).includes("generateContent")&&/gemini/i.test(m.name)&&/flash/i.test(m.name)).map(m=>m.name.replace(/^models\//,""));
    G.models=ms;$("#g-models",d).innerHTML=ms.map(m=>`<option value="${esc(m)}">`).join("");
    const cur=$("#g-model",d);if(ms.length&&!ms.includes(cur.value))cur.value=ms.find(m=>!/preview|exp|lite|tts|image|live|audio/i.test(m))||ms[0];
    msg.innerHTML=`<span style="color:var(--ok)">✓ Khóa hợp lệ.</span> ${ms.length} mô hình Flash dùng được. Đang chọn: <b>${esc(cur.value)}</b> (bấm vào ô mô hình để đổi).`}
   catch(err){msg.innerHTML=`<span style="color:var(--bad)">✗ ${esc(String(err.message||err))}</span>`}}});
 setTimeout(()=>{const i=$("#g-key",d);if(i)i.focus()},30)}
P.gemSettings=openSettings;
A.gset=()=>openSettings();

/* ---------- lời nhắc ---------- */
const VOCAB_SPEC=`"vocab": [{"ko":"từ Hàn","rom":"phiên âm Latin (Revised Romanization)","hv":"âm Hán Việt nếu là từ Hán Hàn, nếu không để \\"\\"","vi":"nghĩa tiếng Việt","en":"nghĩa tiếng Anh","str":["cụm kết hợp / cấu trúc hay dùng với từ này"],"syn":"từ đồng nghĩa tiếng Hàn","ant":"từ trái nghĩa tiếng Hàn","ex":["câu ví dụ tiếng Hàn","dịch tiếng Việt","dịch tiếng Anh"]}],
 "grammar": [{"f":"mẫu ngữ pháp / cấu trúc","m":"nghĩa tiếng Việt","ex":"câu trong bài có mẫu này","vi":"cách dịch tự nhiên sang tiếng Việt"}],
 "notes": ["ghi chú dịch: bẫy số liệu (만/억/조), tên riêng, thuật ngữ, văn phong"]`;
P.gemVideoPrompt=(range)=>`Bạn là chuyên gia phiên dịch Hàn – Việt, soạn bài luyện phiên dịch cho người học trình độ TOPIK 5–6.
Hãy nghe video${range?` (chỉ đoạn ${range})`:""} và CHỈ trả về một đối tượng JSON hợp lệ theo mẫu:
{
 "title": "tiêu đề ngắn bằng tiếng Việt",
 "kind": "news" nếu là bản tin, "daily" nếu là hội thoại / phỏng vấn / radio / podcast,
 "segments": [{"who":"vai người nói bằng tiếng Hàn (앵커, 기자, 진행자, 게스트, 시민…)","ko":"lời nói tiếng Hàn chép đúng nguyên văn","vi":"bản dịch tiếng Việt tự nhiên, đúng văn phong","start":12.4,"end":18.9}],
 ${VOCAB_SPEC}
}
Quy tắc:
- Chép lời CHÍNH XÁC những gì nghe được, không tóm tắt, không bỏ câu. Từ nghe không rõ thì ghi [?].
- Mỗi segment là 1 câu hoặc 1 ý trọn vẹn, dài khoảng 3–20 giây. start / end tính bằng GIÂY (số thập phân), là thời điểm TUYỆT ĐỐI tính từ đầu video, tăng dần, không chồng lên nhau.
- Bỏ qua nhạc nền, quảng cáo, phần không có lời.
- vocab: 8–15 từ cấp trung – cao cấp và thuật ngữ quan trọng trong video. grammar: 4–8 cấu trúc tiêu biểu. notes: 2–5 ghi chú.`;
P.gemTextPrompt=it=>`${P.summaryPrompt(it)}`;
P.gemFixPrompt=(t,ans,head)=>`Bạn là giảng viên biên dịch Hàn – Việt. Hãy chữa bản dịch của người học (trình độ TOPIK 5–6) theo từng câu:
1) lỗi sai hoặc thiếu nghĩa, 2) thuật ngữ, 3) văn phong báo chí tiếng Việt, 4) đề xuất bản dịch tốt hơn.
Cuối cùng chấm điểm /10 cho từng tiêu chí (chính xác, thuật ngữ, văn phong, trôi chảy) và liệt kê các từ vựng, cấu trúc cần ôn.
Trả lời bằng tiếng Việt, dùng tiêu đề ngắn và gạch đầu dòng, KHÔNG dùng bảng.

Bài: ${t.title} — ${t.source||""}
${t.headline?`Tiêu đề gốc: ${t.headline.ko}\nNgười học dịch tiêu đề: ${head||"(chưa dịch)"}\n`:""}
${t.segments.map((g,i)=>`[${i+1}] KO: ${g.ko}\n    Bản dịch của người học: ${ans[i]||"(bỏ trống)"}`).join("\n")}`;

/* chuẩn hóa kết quả phiên dịch từ Gemini thành dữ liệu bài */
P.gemToSegments=(o,offset)=>{const segs=(o&&o.segments||[]).map(s=>({who:String(s.who||""),ko:String(s.ko||"").trim(),vi:String(s.vi||"").trim(),start:+s.start,end:+s.end}))
  .filter(s=>s.ko&&isFinite(s.start));
 segs.sort((a,b)=>a.start-b.start);
 /* nếu đã chọn đoạn video mà Gemini trả mốc tính từ đầu đoạn → cộng bù */
 if(offset>0&&segs.length&&segs[0].start<offset-5)segs.forEach(s=>{s.start+=offset;if(isFinite(s.end))s.end+=offset});
 segs.forEach((s,i)=>{const nx=segs[i+1];if(!isFinite(s.end)||s.end<=s.start)s.end=nx?nx.start:s.start+6;if(nx&&s.end>nx.start)s.end=nx.start;s.start=Math.round(s.start*10)/10;s.end=Math.round(s.end*10)/10});
 return segs};
})();
