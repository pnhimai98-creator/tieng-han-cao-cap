/* =====================================================================
   TỔNG HỢP TỪ VỰNG & NGỮ PHÁP — dùng chung cho biên dịch và phiên dịch
   ===================================================================== */
(()=>{
const P=window.APP, {esc,sayBtn,S,U,R,A,IN,toast,go,save,today,allTR,allIP}=P;
U.sk=U.sk||"all";U.sq=U.sq||"";

/* ---------- tiện ích ---------- */
P.copyText=t=>{const ok=()=>toast("Đã sao chép vào bộ nhớ tạm.");
 if(navigator.clipboard&&window.isSecureContext)navigator.clipboard.writeText(t).then(ok,()=>fallback());else fallback();
 function fallback(){const ta=document.createElement("textarea");ta.value=t;ta.style.position="fixed";ta.style.opacity="0";document.body.appendChild(ta);ta.select();
  try{document.execCommand("copy");ok()}catch(e){toast("Không sao chép được — hãy chọn và sao chép thủ công.")}ta.remove()}};
P.download=(name,text,type)=>{const b=new Blob([text],{type:type||"text/plain;charset=utf-8"});const a=document.createElement("a");a.href=URL.createObjectURL(b);a.download=name;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},500)};
const rel=x=>[x.syn?"≈ "+x.syn:"",x.ant?"↔ "+x.ant:""].filter(Boolean).join(" · ");
const strs=x=>Array.isArray(x.str)?x.str:(x.str?[x.str]:[]);

/* ---------- khối tổng hợp của một bài ---------- */
P.summaryHTML=(it,opt={})=>{const v=it.vocab||[],g=it.grammar||[];
 if(!v.length&&!g.length)return `<section class="card sum"><h3>Tổng hợp từ vựng & ngữ pháp</h3><p class="muted">Bài này chưa có phần tổng hợp. ${opt.empty||""}</p></section>`;
 return `<section class="card sum" id="sum-${esc(it.id)}"><h3>Tổng hợp từ vựng & ngữ pháp <span class="muted small">· ${v.length} từ · ${g.length} cấu trúc</span></h3>
 <h4>Từ vựng</h4><div class="scroll"><table class="stack"><thead><tr><th>KOR (phiên âm)</th><th>VN</th><th>ENG</th><th>Cấu trúc hay dùng</th><th>Đồng nghĩa / trái nghĩa KOR</th></tr></thead><tbody>
 ${v.map(x=>`<tr><td data-l="KOR"><span class="kr" style="font-size:18px;font-weight:700">${esc(x.ko)}</span> ${sayBtn(x.ko)}<div class="muted small">${esc(x.rom||"")}${x.hv?" · <i>"+esc(x.hv)+"</i>":""}</div></td>
  <td data-l="VN">${esc(x.vi)}</td><td data-l="ENG" class="muted">${esc(x.en||"")}</td><td data-l="Cấu trúc" class="kr small">${strs(x).map(esc).join("<br>")}</td><td data-l="Đồng/trái nghĩa" class="kr small">${esc(rel(x))||"—"}</td></tr>`).join("")}</tbody></table></div>
 ${v.some(x=>x.ex&&x.ex[0])?`<details class="small" style="margin-top:8px"><summary><b>Câu ví dụ (Hàn – Việt – Anh)</b></summary><ul class="exl">${v.filter(x=>x.ex&&x.ex[0]).map(x=>`<li>${sayBtn(x.ex[0])}<div><div class="ex" style="font-size:16px">${esc(x.ex[0])}</div><div class="vi">${esc(x.ex[1]||"")}</div><div class="vi"><i>${esc(x.ex[2]||"")}</i></div></div></li>`).join("")}</ul></details>`:""}
 <h4 style="margin-top:16px">Cấu trúc – ngữ pháp</h4><div class="scroll"><table class="stack"><thead><tr><th>Cấu trúc</th><th>Nghĩa</th><th>Câu trong bài</th><th>Cách dịch tự nhiên</th></tr></thead><tbody>
 ${g.map(x=>`<tr><td data-l="Cấu trúc"><span class="kr" style="color:var(--red);font-weight:700">${esc(x.f)}</span>${x.ref?`<br><button class="btn sm" style="margin-top:4px" data-act="gojump" data-id="${esc(x.ref)}">Xem trong Ngữ pháp</button>`:""}</td>
  <td data-l="Nghĩa">${esc(x.m)}</td><td data-l="Câu trong bài" class="kr small">${esc(x.ex||"")}</td><td data-l="Cách dịch" class="small">${esc(x.vi||"")}</td></tr>`).join("")}</tbody></table></div>
 <div class="row" style="margin-top:12px"><button class="btn sm" data-act="sumcopy1" data-k="${esc(it.id)}">Sao chép bảng (Markdown)</button><button class="btn sm" data-act="sumfc">Ôn flashcard từ bài biên – phiên dịch</button></div></section>`};

/* ---------- tìm bài theo id ---------- */
P.findItem=id=>allTR().find(x=>x.id===id)||allIP().find(x=>x.id===id);
P.isLocal=it=>S.lib.tr.includes(it)||S.lib.ip.includes(it);

/* ---------- Markdown cho sổ từ vựng Project ---------- */
const mdRow=a=>"| "+a.map(s=>String(s??"").replace(/\|/g,"/").replace(/\n/g," ")).join(" | ")+" |";
P.vocabMD=rows=>[mdRow(["Ngày nhập","KOR (phiên âm)","VN","ENG","Cấu trúc hay dùng","Từ đồng nghĩa / trái nghĩa KOR"]),"|---|---|---|---|---|---|",
 ...rows.map(r=>mdRow([r.date||"",r.x.ko+(r.x.rom?" ("+r.x.rom+")":""),r.x.vi,r.x.en||"",strs(r.x).join("; "),rel(r.x)]))].join("\n");
P.grammarMD=rows=>[mdRow(["Ngày nhập","Cấu trúc","Nghĩa","Câu trong bài","Cách dịch"]),"|---|---|---|---|---|",...rows.map(r=>mdRow([r.date||"",r.x.f,r.x.m,r.x.ex||"",r.x.vi||""]))].join("\n");
const itemMD=it=>`## ${it.title} (${it.date||""})\n\n### Từ vựng\n\n${P.vocabMD((it.vocab||[]).map(x=>({x,date:it.date})))}\n\n### Cấu trúc – ngữ pháp\n\n${P.grammarMD((it.grammar||[]).map(x=>({x,date:it.date})))}\n`;

/* ---------- nhập bài / phần tổng hợp từ JSON (ví dụ do Claude tạo) ---------- */
const cleanJSON=t=>{t=String(t).trim().replace(/^```(json)?/i,"").replace(/```$/,"").trim();const a=t.indexOf("{"),b=t.indexOf("[");const s=(b>=0&&(b<a||a<0))?b:a;return s>0?t.slice(s):t};
P.parseJSON=t=>JSON.parse(cleanJSON(t));
P.importItems=(kind,text)=>{let o;try{o=P.parseJSON(text)}catch(e){toast("JSON không hợp lệ: "+e.message);return 0}
 const arr=Array.isArray(o)?o:[o];let n=0;const exist=new Set((kind==="tr"?allTR():allIP()).map(x=>x.id));
 arr.forEach(it=>{if(!it||!Array.isArray(it.segments)||!it.segments.length||!it.title){return}
  if(!it.id||exist.has(it.id))it.id=(kind==="tr"?"my-t":"my-i")+Date.now().toString(36)+n;exist.add(it.id);
  it.date=it.date||today();it.vocab=it.vocab||[];it.grammar=it.grammar||[];if(kind==="ip"){it.kind=it.kind==="news"?"news":"daily";it.youtube=ytId(it.youtube||it.url||"")}
  S.lib[kind].push(it);n++});
 if(!n){toast("Không tìm thấy bài hợp lệ (cần có title và segments).");return 0}
 save();P.refreshLibrary();toast(`Đã nhập ${n} bài. Phần tổng hợp đã được thêm vào kho từ vựng.`);return n};
function ytId(s){s=String(s||"").trim();if(/^[\w-]{11}$/.test(s))return s;const m=s.match(/(?:v=|youtu\.be\/|embed\/|shorts\/|live\/)([\w-]{11})/);return m?m[1]:""}
P.ytId=ytId;
/* Gắn phần tổng hợp (và bản dịch mẫu nếu có) vào một bài tự nhập */
P.applySummary=(it,text)=>{let o;try{o=P.parseJSON(text)}catch(e){toast("JSON không hợp lệ: "+e.message);return false}
 if(Array.isArray(o.vocab))it.vocab=o.vocab;if(Array.isArray(o.grammar))it.grammar=o.grammar;if(Array.isArray(o.notes))it.notes=o.notes;
 const tv=o.segments_vi||o.translations;if(Array.isArray(tv))it.segments.forEach((s,i)=>{if(tv[i])s.vi=tv[i]});
 if(!it.vocab.length&&!it.grammar.length){toast("JSON chưa có vocab / grammar.");return false}
 save();P.refreshLibrary();toast("Đã thêm phần tổng hợp.");return true};

/* Lời nhắc để dán vào Claude: tạo phần tổng hợp + bản dịch mẫu */
P.summaryPrompt=it=>`Tôi đang luyện ${it.youtube!==undefined?"phiên dịch":"biên dịch"} Hàn → Việt (trình độ TOPIK 5–6). Dưới đây là văn bản tiếng Hàn đã chia thành ${it.segments.length} câu/đoạn.
Hãy CHỈ trả về một khối JSON hợp lệ (không giải thích thêm) theo đúng mẫu:
{
 "segments_vi": ["bản dịch tiếng Việt tự nhiên, đúng văn phong của câu 1", "..."],
 "vocab": [{"ko":"từ Hàn","rom":"phiên âm Latin (Revised Romanization)","hv":"âm Hán Việt nếu là từ Hán Hàn, nếu không để \\"\\"","vi":"nghĩa tiếng Việt","en":"nghĩa tiếng Anh","str":["cụm kết hợp / cấu trúc hay dùng"],"syn":"từ đồng nghĩa KOR","ant":"từ trái nghĩa KOR","ex":["câu ví dụ Hàn","dịch Việt","dịch Anh"]}],
 "grammar": [{"f":"mẫu ngữ pháp","m":"nghĩa","ex":"câu trong bài có mẫu này","vi":"cách dịch tự nhiên sang tiếng Việt"}],
 "notes": ["ghi chú kỹ thuật dịch: bẫy số liệu, tên riêng, thuật ngữ, văn phong"]
}
Yêu cầu: segments_vi có đúng ${it.segments.length} phần tử theo thứ tự; vocab chọn 8–15 từ cấp trung – cao cấp và thuật ngữ quan trọng; grammar chọn 4–8 cấu trúc tiêu biểu.

Nguồn: ${it.source||""} ${it.url||""}
Tiêu đề: ${it.title}
${it.segments.map((s,i)=>`[${i+1}] ${s.ko}`).join("\n")}`;

/* ---------- gom toàn bộ ---------- */
function collect(){const items=(U.sk==="ip"?[]:allTR().map(it=>({it,k:"tr"}))).concat(U.sk==="tr"?[]:allIP().map(it=>({it,k:"ip"})));
 const v=[],g=[],seenV=new Map(),seenG=new Map();
 items.forEach(({it,k})=>{(it.vocab||[]).forEach(x=>{if(!x||!x.ko)return;if(seenV.has(x.ko)){seenV.get(x.ko).src.push(it);return}const r={x,date:it.date,src:[it],k};seenV.set(x.ko,r);v.push(r)});
  (it.grammar||[]).forEach(x=>{if(!x||!x.f)return;if(seenG.has(x.f)){seenG.get(x.f).src.push(it);return}const r={x,date:it.date,src:[it],k};seenG.set(x.f,r);g.push(r)})});
 const q=P.norm(U.sq.trim());const f=r=>!q||P.norm(JSON.stringify(r.x)).includes(q);
 const byDate=(a,b)=>String(a.date).localeCompare(String(b.date));
 return {v:v.filter(f).sort(byDate),g:g.filter(f).sort(byDate),n:items.length}}
const srcLinks=src=>src.map(it=>`<button class="pill" style="border:0;cursor:pointer;margin:2px" data-act="opensrc" data-id="${esc(it.id)}">${esc(it.title)}</button>`).join("");
function sumBody(){const {v,g,n}=collect();
 return `<p class="muted small">${n} bài · ${v.length} từ · ${g.length} cấu trúc (đã gộp từ trùng, sắp xếp theo ngày nhập)</p>
 <div class="row" style="margin-bottom:12px"><button class="btn sm" data-act="sumcopy">Sao chép bảng từ vựng (Markdown)</button><button class="btn sm" data-act="sumdl">Tải file .md (từ vựng + ngữ pháp)</button><button class="btn sm pri" data-act="sumfc">Ôn flashcard các từ này</button></div>
 <h2>Từ vựng</h2>${v.length?`<div class="scroll"><table class="stack"><thead><tr><th>Ngày nhập</th><th>KOR (phiên âm)</th><th>VN</th><th>ENG</th><th>Cấu trúc hay dùng</th><th>Đồng / trái nghĩa</th><th>Bài</th></tr></thead><tbody>
 ${v.map(r=>`<tr><td data-l="Ngày" class="small muted">${esc(r.date||"")}</td><td data-l="KOR"><span class="kr" style="font-weight:700;font-size:17px">${esc(r.x.ko)}</span> ${sayBtn(r.x.ko)}<div class="muted small">${esc(r.x.rom||"")}${r.x.hv?" · <i>"+esc(r.x.hv)+"</i>":""}</div></td><td data-l="VN">${esc(r.x.vi)}</td><td data-l="ENG" class="muted small">${esc(r.x.en||"")}</td><td data-l="Cấu trúc" class="kr small">${strs(r.x).map(esc).join("<br>")}</td><td data-l="Đồng/trái" class="kr small">${esc(rel(r.x))||"—"}</td><td data-l="Bài">${srcLinks(r.src)}</td></tr>`).join("")}</tbody></table></div>`:`<p class="muted">Không có từ nào khớp.</p>`}
 <h2>Cấu trúc – ngữ pháp</h2>${g.length?`<div class="scroll"><table class="stack"><thead><tr><th>Cấu trúc</th><th>Nghĩa</th><th>Câu trong bài</th><th>Cách dịch</th><th>Bài</th></tr></thead><tbody>
 ${g.map(r=>`<tr><td data-l="Cấu trúc"><span class="kr" style="color:var(--red);font-weight:700">${esc(r.x.f)}</span>${r.x.ref?`<br><button class="btn sm" style="margin-top:4px" data-act="gojump" data-id="${esc(r.x.ref)}">Ngữ pháp</button>`:""}</td><td data-l="Nghĩa">${esc(r.x.m)}</td><td data-l="Câu" class="kr small">${esc(r.x.ex||"")}</td><td data-l="Cách dịch" class="small">${esc(r.x.vi||"")}</td><td data-l="Bài">${srcLinks(r.src)}</td></tr>`).join("")}</tbody></table></div>`:`<p class="muted">Không có cấu trúc nào khớp.</p>`}`}
R.summary=()=>`<h1>Tổng hợp từ vựng & ngữ pháp <span class="kr muted" style="font-size:.6em">정리</span></h1>
 <p class="lead">Mọi từ vựng và cấu trúc trong các bài biên dịch, phiên dịch được gom về đây. Từ vựng cũng tự vào kho flashcard (chủ đề “Từ bài biên – phiên dịch”).</p>
 <div class="row" style="margin-bottom:12px"><div class="tabs" style="margin:0">${[["all","Tất cả"],["tr","Biên dịch"],["ip","Phiên dịch"]].map(t=>`<button class="${U.sk===t[0]?"on":""}" data-act="sk" data-v="${t[0]}">${t[1]}</button>`).join("")}</div>
 <input type="search" data-in="sq" value="${esc(U.sq)}" placeholder="Lọc: 혐의, dự báo, -는 가운데…" aria-label="Lọc tổng hợp" style="max-width:340px"></div>
 <div id="sumbody">${sumBody()}</div>`;

/* ---------- sự kiện ---------- */
Object.assign(A,{
 sk:el=>{U.sk=el.dataset.v;P.render()},
 gojump:el=>{U.gt="list";U.gq="";go("grammar",el.dataset.id)},
 opensrc:el=>{const id=el.dataset.id;if(allTR().some(x=>x.id===id)){U.tr=id;go("translate")}else{U.ip=id;U.ipTab="cons";go("interpret")}},
 sumfc:()=>{U.vt="cards";U.topic="tl";U.fc=null;go("vocab")},
 sumcopy:()=>P.copyText(P.vocabMD(collect().v)),
 sumcopy1:el=>{const it=P.findItem(el.dataset.k);if(it)P.copyText(itemMD(it))},
 sumdl:()=>{const {v,g}=collect();P.download("tong-hop-bien-phien-dich-"+today()+".md",`# Tổng hợp từ vựng & ngữ pháp — biên dịch / phiên dịch\n\n## Từ vựng\n\n${P.vocabMD(v)}\n\n## Cấu trúc – ngữ pháp\n\n${P.grammarMD(g)}\n`,"text/markdown;charset=utf-8")}
});
IN.sq=el=>{U.sq=el.value;const b=document.getElementById("sumbody");if(b)b.innerHTML=sumBody()};
})();
