# 고급 한국어 — Luyện tiếng Hàn cao cấp

Web tự học tiếng Hàn TOPIK II cấp 5–6 cho người Việt, gồm: từ Hán Hàn, từ vựng chuyên đề, ngữ pháp cao cấp, thành ngữ, đọc hiểu, luyện viết, nghe – nói, thi thử, **luyện biên dịch**, **luyện phiên dịch** và **tổng hợp từ vựng – ngữ pháp**.

Web tĩnh (HTML + CSS + JavaScript), không cần máy chủ, chạy miễn phí trên GitHub Pages.

---

## 1. Cấu trúc thư mục

```
korean-advanced/
├── index.html              Khung trang
├── .nojekyll               Báo GitHub Pages phục vụ file nguyên trạng
├── css/style.css           Giao diện
├── data/                   ← DỮ LIỆU: thêm bài, sửa nội dung ở đây
│   ├── core.js             Gốc Hán, từ vựng, ngữ pháp, thành ngữ, đọc, viết, nghe, thi thử
│   ├── translation.js      Bài luyện BIÊN DỊCH
│   └── interpretation.js   Bài luyện PHIÊN DỊCH
└── js/                     Mã chương trình (thường không cần sửa)
    ├── app.js              Khung ứng dụng + 10 phần gốc
    ├── summary.js          Bảng tổng hợp từ vựng & ngữ pháp
    ├── translate.js        Phần biên dịch
    └── interpret.js        Phần phiên dịch + luyện số liệu
```

Mở thử trên máy: nhấp đúp `index.html` là chạy, không cần cài gì.

---

## 2. Đưa lên GitHub (làm một lần)

1. Vào <https://github.com> → đăng nhập (hoặc tạo tài khoản).
2. Bấm **+** (góc trên phải) → **New repository**.
   - Repository name: `korean-advanced` (hoặc tên bạn thích)
   - Chọn **Public** (gói miễn phí chỉ bật được Pages cho repo công khai)
   - Bấm **Create repository**.
3. Trong repo mới, bấm **uploading an existing file** (hoặc **Add file → Upload files**).
4. Giải nén file zip, mở thư mục `korean-advanced`, **kéo toàn bộ nội dung bên trong** (cả thư mục `css`, `data`, `js`, file `index.html`, `.nojekyll`, `README.md`) vào trang upload. Bấm **Commit changes**.
   > File `.nojekyll` có thể bị ẩn trên máy; thiếu nó web vẫn chạy.
5. Vào **Settings → Pages**:
   - Source: **Deploy from a branch**
   - Branch: **main**, thư mục **/ (root)** → **Save**.
6. Đợi 1–2 phút, tải lại trang Settings → Pages sẽ hiện địa chỉ:
   `https://<tên-tài-khoản>.github.io/korean-advanced/`

Mỗi lần sửa file trên GitHub, web tự cập nhật sau khoảng 1 phút.

---

## 3. Thêm bài mới

### Cách A — ngay trên web, tự động bằng Gemini (miễn phí)
1. Lấy khóa API miễn phí: mở <https://aistudio.google.com/apikey> → đăng nhập Google → **Create API key** → sao chép.
2. Trên web bấm nút **✨ Gemini** (góc trên) → dán khóa → **Kiểm tra khóa** → chọn mô hình → **Lưu**.
   Khóa chỉ lưu trong trình duyệt của bạn, **không** nằm trong repo và **không** có trong file sao lưu.
3. **Phiên dịch**: dán link YouTube (có thể chọn đoạn 3–8 phút) → **✨ Tạo bằng Gemini** → Gemini nghe video và soạn các đoạn có mốc thời gian, transcript, bản dịch mẫu, từ vựng, ngữ pháp.
4. **Biên dịch**: dán bài báo → **Tạo bài luyện** → Gemini soạn bản dịch mẫu + tổng hợp. Dịch xong bấm **✨ Gemini chữa bài**.

Lưu ý gói miễn phí: số lượt mỗi ngày có hạn (xem trong AI Studio), chỉ nhận video YouTube công khai, và Google có thể dùng nội dung gửi lên để cải thiện sản phẩm. Kết quả của Gemini có thể sai tên riêng, con số hoặc lệch mốc thời gian 1–2 giây — sửa bằng tab **Chia đoạn** hoặc bấm soạn lại.

### Cách B — đưa vào repo (hiện trên mọi thiết bị)
1. Trên GitHub, mở `data/translation.js` (hoặc `data/interpretation.js`) → bấm biểu tượng ✏️.
2. Chép một khối `{ … }` mẫu, dán ngay sau khối cuối cùng (nhớ **dấu phẩy** giữa hai khối), đổi `id` không trùng, điền nội dung.
3. **Commit changes**.

Cách nhanh nhất để có khối dữ liệu: tạo bài trên web (cách A) rồi bấm **Chép JSON cả bài**.

Mỗi bài **bắt buộc** có `vocab` (từ vựng) và `grammar` (cấu trúc – ngữ pháp). Từ vựng tự vào flashcard (chủ đề “Từ bài biên – phiên dịch”) và trang **Tổng hợp**.

---

## 4. Lưu ý bản quyền

Web trên GitHub Pages là **công khai**. Vì vậy:
- Bài của **YTN, KBS, SBS, MBC, 연합뉴스, báo chí**: trong repo chỉ để **link + trích đoạn ngắn + từ vựng, ghi chú**. Toàn văn hãy dán bằng cách A (chỉ nằm trong trình duyệt của bạn).
- Nội dung mang nhãn **공공누리 loại 1** (ví dụ 정책브리핑 korea.kr, Korea.net) được đăng lại toàn văn nếu ghi rõ nguồn — kiểm tra nhãn ở cuối mỗi bài.
- Video: web chỉ **nhúng** video YouTube (không tải về), transcript do bạn soạn.
- 2 bài biên dịch mẫu là **bài mô phỏng** viết theo văn phong báo chí; số liệu không phải tin thật.
- Phần **phiên dịch chỉ dùng âm thanh gốc** (YouTube hoặc file .mp3/.m4a của radio, podcast), không dùng giọng máy.

---

## 5. Tiến độ học

- Tiến độ, bản dịch, bài tự nhập được lưu trong **trình duyệt** (localStorage) — mỗi máy / trình duyệt riêng.
- Vào **Tiến độ & lỗi → Sao lưu tiến độ** để xuất file `.json`, rồi nhập lại trên máy khác.
- Ghi âm lời dịch chỉ giữ trong phiên đang mở (không lưu lâu dài).
- Phát âm, đọc bài dùng giọng tiếng Hàn của thiết bị (Chrome / Edge cho chất lượng tốt nhất). Nhận diện giọng nói tiếng Việt hoạt động trên Chrome.
