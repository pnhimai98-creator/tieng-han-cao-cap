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
const EXCLUDE_MODEL=/embedding|imagen|veo|aqa/i;

function pickFlashModels(rawModels){
  return (rawModels||[])
    .filter(m=>{
      const methods=m.supportedGenerationMethods||[];
      const name=String(m.name||"").replace(/^models\//,"");
      return methods.includes("generateContent") && /gemini/i.test(name) && !EXCLUDE_MODEL.test(name);
    })
    .map(m=>String(m.name||"").replace(/^models\//,""));
}

function fallbacks(cur){
  const pool=(G.models&&G.models.length?G.models:[DEFAULT_MODEL])
    .filter(m=>m && m!==cur && !EXCLUDE_MODEL.test(m));
  const unique=[...new Set(pool)];
  // Ưu tiên các bản flash chuẩn trước, sau đó đến bản lite
  return unique.sort((a,b)=>{
    const aLite=/lite/i.test(a)?1:0;
    const bLite=/lite/i.test(b)?1:0;
    return aLite-bLite;
  }).slice(0,6);
}

P.gemini=async(parts,opt={})=>{
  const cur=(G.model||DEFAULT_MODEL).trim()||DEFAULT_MODEL;
  const waits=[4000,10000];
  let lastErr=null;
  let sawQuota429=false;
  let sawOverload5xx=false;

  // 1) Thử lại model hiện tại nếu gặp lỗi tạm thời (5xx hoặc 429)
  for(let i=0;;i++){
    try{
      return await gemOnce(parts,opt,cur);
    }catch(e){
      lastErr=e;
      if(e.code===429)sawQuota429=true;
      if(e.is5xx)sawOverload5xx=true;
      if(!e.retry||i>=waits.length)break;
      const reason=e.code===429?"chạm giới hạn lượt/tốc độ (429)":"đang quá tải";
      toast(`Gemini (${cur}) ${reason}, thử lại lần ${i+1}/${waits.length} sau ${waits[i]/1000}s…`);
      await new Promise(r=>setTimeout(r,waits[i]));
    }
  }

  // Nếu là lỗi cấu hình/key/nội dung không thể thử lại bằng model khác thì ném luôn
  if(!lastErr||(!lastErr.retry&&!lastErr.canFallback))throw lastErr;

  // 2) Tự chuyển sang các mô hình dự phòng khác (không đổi model đã lưu của người dùng)
  const fbList=fallbacks(cur);
  for(const m of fbList){
    toast(`${cur} gặp sự cố — chuyển sang thử ${m}…`);
    try{
      const r=await gemOnce(parts,opt,m);
      toast(`Đã hoàn tất bằng mô hình ${m} (dự phòng cho ${cur}).`);
      return r;
    }catch(e){
      lastErr=e;
      if(e.code===429)sawQuota429=true;
      if(e.is5xx)sawOverload5xx=true;
      if(!e.retry&&!e.canFallback)throw e;
    }
  }

  if(sawQuota429 && !sawOverload5xx){
    throw new Error(`Các mô hình hiện tại đang chạm giới hạn lượt/tốc độ (429) của gói API hiện tại. Hãy đợi khoảng 1 phút, thử lại vào khung giờ khác, hoặc đổi sang tài khoản/API key khác.`);
  }

  throw new Error(
    `Các mô hình Gemini hiện đều đang quá tải hoặc tạm bận (503/429). ` +
    `Hãy thử lại sau vài phút, rút ngắn đoạn video (ví dụ 1–2 phút), hoặc dùng “Tạo thủ công” (.mp3 / dán bản chép lời / JSON).` +
    (G.models&&G.models.length?"":" Mẹo: mở ✨ Cài đặt Gemini → bấm “Kiểm tra khóa” để tải danh sách mô hình khả dụng.")
  );
};

async function gemOnce(parts,opt,model){
  if(!G.key){
    openSettings();
    throw new Error("Chưa có khóa Gemini API — hãy dán khóa vào ô Cài đặt Gemini.");
  }

  const ctl=new AbortController();
  const to=setTimeout(()=>ctl.abort(),opt.timeout||240000);
  const body={
    contents:[{role:"user",parts}],
    generationConfig:{temperature:opt.temperature??0.2}
  };
  if(opt.json)body.generationConfig.responseMimeType="application/json";
  if(opt.lowMedia)body.generationConfig.mediaResolution="MEDIA_RESOLUTION_LOW";

  let res;
  try{
    res=await fetch(`${API}/models/${encodeURIComponent(model)}:generateContent`,{
      method:"POST",
      signal:ctl.signal,
      headers:{"Content-Type":"application/json","x-goog-api-key":G.key},
      body:JSON.stringify(body)
    });
  }catch(e){
    clearTimeout(to);
    if(e.name==="AbortError"){
      const er=new Error("Gemini xử lý quá lâu và đã hủy yêu cầu. Hãy thử đoạn video ngắn hơn (1–2 phút).");
      er.canFallback=true;
      throw er;
    }
    throw new Error("Không kết nối được tới Gemini — vui lòng kiểm tra kết nối mạng.");
  }
  clearTimeout(to);

  let data={};
  try{data=await res.json()}catch(e){}

  if(!res.ok){
    const msg=(data.error&&data.error.message)||res.statusText||`HTTP ${res.status}`;
    if(res.status===429){
      const er=new Error(`Mô hình ${model} chạm giới hạn lượt/tốc độ (429): ${msg}`);
      er.code=429;
      er.retry=true;
      er.canFallback=true;
      throw er;
    }
    if(res.status===400&&/API key/i.test(msg)){
      throw new Error("Khóa API không hợp lệ. Hãy kiểm tra lại trong Cài đặt Gemini.");
    }
    if(res.status===403){
      throw new Error("Khóa API bị từ chối quyền truy cập (403): "+msg);
    }
    if(res.status===404){
      const er=new Error(`Mô hình “${model}” không khả dụng (404). Hãy mở Cài đặt Gemini → Kiểm tra khóa để chọn mô hình khác.`);
      er.code=404;
      er.canFallback=true;
      throw er;
    }
    if([500,502,503,504].includes(res.status)){
      const er=new Error(`Máy chủ Gemini (${model}) đang quá tải (${res.status}).`);
      er.code=res.status;
      er.is5xx=true;
      er.retry=true;
      er.canFallback=true;
      throw er;
    }
    const er=new Error(`Gemini báo lỗi ${res.status}: ${msg}`);
    er.code=res.status;
    throw er;
  }

  const c=data.candidates&&data.candidates[0];
  const text=c&&c.content&&c.content.parts
    ?c.content.parts.filter(p=>!p.thought).map(p=>p.text||"").join("")
    :"";

  if(!text){
    const r=(c&&c.finishReason)||(data.promptFeedback&&data.promptFeedback.blockReason)||"không rõ";
    throw new Error("Gemini không trả về nội dung (lý do: "+r+"). Video có thể quá dài, riêng tư hoặc bị hạn chế.");
  }
  if(c.finishReason==="MAX_TOKENS"&&opt.json){
    throw new Error("Kết quả quá dài nên bị cắt giữa chừng. Hãy chọn đoạn video ngắn hơn (khoảng 1–3 phút).");
  }
  if(!opt.json)return text;

  try{
    return P.parseJSON(text);
  }catch(e){
    const er=new Error("Gemini trả về định dạng JSON chưa hợp lệ. Hãy bấm tạo lại một lần nữa.");
    er.canFallback=true;
    throw er;
  }
}

/* nút đang chạy: khóa nút, hiện trạng thái */
P.busy=async(btn,label,fn)=>{
  const old=btn?btn.innerHTML:"";
  if(btn){btn.disabled=true;btn.innerHTML="⏳ "+label}
  try{return await fn()}
  catch(e){toast(e.message);console.warn(e);return null}
  finally{if(btn&&btn.isConnected){btn.disabled=false;btn.innerHTML=old}}
};

/* hiển thị văn bản Markdown đơn giản (nhận xét của Gemini) */
P.mdLite=t=>esc(t)
  .replace(/^#{1,4}\s*(.+)$/gm,"<b>$1</b>")
  .replace(/\*\*(.+?)\*\*/g,"<b>$1</b>")
  .replace(/^\s*[-*]\s+/gm,"• ")
  .replace(/\n/g,"<br>");

/* ---------- hộp Cài đặt Gemini ---------- */
function openSettings(){
  if($(".dlg.gem"))return;
  const d=document.createElement("div");
  d.className="dlg gem";
  const modelOptions=(G.models&&G.models.length?G.models:[DEFAULT_MODEL,"gemini-flash-latest","gemini-flash-lite-latest"]);
  d.innerHTML=`<div class="card" role="dialog" aria-modal="true" aria-label="Cài đặt Gemini" style="max-width:560px">
 <h3 style="margin-top:0">✨ Cài đặt Gemini</h3>
 <ol class="small muted" style="padding-left:18px">
   <li>Mở <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener">aistudio.google.com/apikey</a>, đăng nhập Google.</li>
   <li>Bấm <b>Create API key</b>, sao chép khóa (bắt đầu bằng <code>AIza…</code>).</li>
   <li>Dán vào ô dưới → <b>Kiểm tra khóa</b> → chọn mô hình → <b>Lưu</b>.</li>
 </ol>
 <label class="small" for="g-key">Khóa API</label>
 <div class="row" style="flex-wrap:nowrap">
   <input type="password" id="g-key" value="${esc(G.key)}" placeholder="AIza…" autocomplete="off">
   <button class="btn sm" data-x="show">Hiện</button>
 </div>
 <label class="small" for="g-model" style="display:block;margin-top:10px">Mô hình</label>
 <div class="row" style="flex-wrap:nowrap">
   <input type="text" id="g-model" list="g-models" value="${esc(G.model)}">
   <button class="btn sm" data-x="test">Kiểm tra khóa</button>
 </div>
 <datalist id="g-models">${modelOptions.map(m=>`<option value="${esc(m)}">`).join("")}</datalist>
 <div id="g-msg" class="small" style="margin-top:8px"></div>
 <p class="small muted">Khóa chỉ lưu trong trình duyệt này, không đưa lên GitHub và không có trong file sao lưu. Gói miễn phí giới hạn số lượt mỗi ngày và Google có thể dùng nội dung gửi lên để cải thiện sản phẩm — đừng gửi tài liệu nội bộ.</p>
 <div class="row" style="justify-content:flex-end">
   <button class="btn" data-x="del">Xóa khóa</button>
   <button class="btn" data-x="0">Đóng</button>
   <button class="btn pri" data-x="save">Lưu</button>
 </div>
</div>`;
  document.body.appendChild(d);

  d.addEventListener("click",async e=>{
    const b=e.target.closest("[data-x]");
    if(e.target===d){d.remove();return}
    if(!b)return;
    const x=b.dataset.x, msg=$("#g-msg",d);

    if(x==="0")d.remove();
    else if(x==="show"){
      const i=$("#g-key",d);
      i.type=i.type==="password"?"text":"password";
      b.textContent=i.type==="password"?"Hiện":"Ẩn";
    }
    else if(x==="del"){
      G.key="";G.models=[];saveG();
      $("#g-key",d).value="";
      msg.textContent="Đã xóa khóa.";
    }
    else if(x==="save"){
      G.key=$("#g-key",d).value.trim();
      G.model=$("#g-model",d).value.trim()||DEFAULT_MODEL;
      saveG();
      d.remove();
      toast(G.key?"Đã lưu cài đặt Gemini.":"Chưa có khóa.");
    }
    else if(x==="test"){
      const k=$("#g-key",d).value.trim();
      if(!k){msg.textContent="Hãy dán khóa trước.";return}
      msg.textContent="Đang kiểm tra…";
      try{
        const r=await fetch(`${API}/models?pageSize=200`,{headers:{"x-goog-api-key":k}});
        const j=await r.json();
        if(!r.ok)throw new Error((j.error&&j.error.message)||r.status);
        const ms=pickFlashModels(j.models);
        G.models=ms;
        saveG();
        $("#g-models",d).innerHTML=ms.map(m=>`<option value="${esc(m)}">`).join("");
        const cur=$("#g-model",d);
        if(ms.length&&!ms.includes(cur.value)){
          cur.value=ms.find(m=>/flash/i.test(m)&&!/lite/i.test(m))||ms[0];
        }
        msg.innerHTML=`<span style="color:var(--ok)">✓ Khóa hợp lệ.</span> ${ms.length} mô hình khả dụng. Đang chọn: <b>${esc(cur.value)}</b> (bấm vào ô mô hình để đổi).`;
      }catch(err){
        msg.innerHTML=`<span style="color:var(--bad)">✗ ${esc(String(err.message||err))}</span>`;
      }
    }
  });

  setTimeout(()=>{const i=$("#g-key",d);if(i)i.focus()},30);
}
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
P.gemToSegments=(o,offset)=>{
  const segs=(o&&o.segments||[])
    .map(s=>({
      who:String(s.who||""),
      ko:String(s.ko||"").trim(),
      vi:String(s.vi||"").trim(),
      start:+s.start,
      end:+s.end
    }))
    .filter(s=>s.ko&&isFinite(s.start));

  segs.sort((a,b)=>a.start-b.start);

  /* nếu đã chọn đoạn video mà Gemini trả mốc tính từ đầu đoạn → cộng bù */
  if(offset>0&&segs.length&&segs[0].start<offset-5){
    segs.forEach(s=>{
      s.start+=offset;
      if(isFinite(s.end))s.end+=offset;
    });
  }

  segs.forEach((s,i)=>{
    const nx=segs[i+1];
    if(!isFinite(s.end)||s.end<=s.start)s.end=nx?nx.start:s.start+6;
    if(nx&&s.end>nx.start)s.end=nx.start;
    s.start=Math.round(s.start*10)/10;
    s.end=Math.round(s.end*10)/10;
  });

  return segs;
};
})();
