/* =====================================================================
   BÀI LUYỆN PHIÊN DỊCH — CHỈ DÙNG ÂM THANH GỐC
   Mỗi bài cần MỘT trong hai nguồn:
     youtube   mã video YouTube (11 ký tự sau "v=" trong link), ví dụ "dQw4w9WgXcQ"
     audio     link trực tiếp tới file âm thanh (.mp3, .m4a…) của radio / podcast

   id        mã bài, không trùng            kind    "daily" (hội thoại: radio, podcast, phỏng vấn) | "news" (bản tin)
   source    nguồn (KBS 뉴스, SBS 라디오…)  url     link trang gốc      date  "YYYY-MM-DD"
   title     tiêu đề                        level   cấp độ (không bắt buộc)
   segments  [{who, ko, vi, start, end}]    start / end = giây trên video hoặc file âm thanh
   notes     ["ghi chú phiên dịch"]
   vocab     [{ko, rom, hv, vi, en, str:[…], syn, ant, ex:[Hàn, Việt, Anh]}]   ← BẮT BUỘC
   grammar   [{f, m, ex, vi, ref}]                                             ← BẮT BUỘC

   Cách nhanh nhất: trên web vào “Luyện phiên dịch”, dán link YouTube, bấm “✨ Tạo bằng Gemini”,
   kiểm tra lại, rồi bấm “Chép JSON cả bài” (tab Tổng hợp) và dán vào mảng dưới đây.

   Ví dụ:
   {id:"i1",kind:"news",source:"KBS 뉴스",url:"https://www.youtube.com/watch?v=XXXXXXXXXXX",
    youtube:"XXXXXXXXXXX",date:"2026-11-20",title:"…",
    segments:[{who:"앵커",ko:"…",vi:"…",start:3.5,end:11.2}, …],
    notes:["…"], vocab:[…], grammar:[…]},

   BẢN QUYỀN: web chỉ nhúng video / phát file từ nguồn gốc, không lưu âm thanh trong repo.
   Bản chép lời của bản tin là nội dung có bản quyền: repo công khai nên ưu tiên giữ bài
   trong trình duyệt (bài của tôi), hoặc chỉ đưa lên repo những đoạn ngắn để luyện.
   ===================================================================== */
const INTERPRETS = [
];
