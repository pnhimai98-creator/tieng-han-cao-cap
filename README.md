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

### Cách A — ngay trên web (nhanh, chỉ lưu trong trình duyệt)
- **Biên dịch → Dán bài báo của tôi**: dán bài YTN, KBS, SBS… → web tự chia câu.
- **Phiên dịch → Dán transcript của tôi**: dán bản chép lời YouTube (giữ mốc thời gian) + link video.
- Sau đó bấm **“Chép lời nhắc tạo tổng hợp”** → dán vào Claude → dán JSON trả về vào bài → có ngay **bản dịch mẫu + bảng từ vựng + bảng cấu trúc – ngữ pháp**.

### Cách B — đưa vào repo (hiện trên mọi thiết bị)
1. Trên GitHub, mở `data/translation.js` (hoặc `data/interpretation.js`) → bấm biểu tượng ✏️.
2. Chép một khối `{ … }` mẫu, dán ngay sau khối cuối cùng (nhớ **dấu phẩy** giữa hai khối), đổi `id` không trùng, điền nội dung.
3. **Commit changes**.

Mỗi bài **bắt buộc** có `vocab` (từ vựng) và `grammar` (cấu trúc – ngữ pháp). Từ vựng tự vào flashcard (chủ đề “Từ bài biên – phiên dịch”) và trang **Tổng hợp**.

### Lời nhắc mẫu để Claude soạn cả bài (dán vào Claude)

```
Hãy soạn một bài luyện biên dịch cho web của tôi, đúng định dạng đối tượng trong data/translation.js:
{id, kind:"news", source, url, date, topic, level, title,
 headline:{ko, hint, vi},
 segments:[{ko, vi}],
 notes:[…],
 vocab:[{ko, rom, hv, vi, en, str:[…], syn, ant, ex:[Hàn, Việt, Anh]}],
 grammar:[{f, m, ex, vi, ref}]}
Nguồn: <link bài báo>. Chỉ trích tối đa 2–3 câu ngắn của bài gốc (vì repo công khai);
phần luyện chính hãy viết lại theo văn phong bản tin. 8–15 từ vựng, 4–8 cấu trúc.
```

Với phiên dịch, thay bằng `data/interpretation.js`, thêm `kind:"daily"|"news"`, `youtube:"<mã video>"` và `start`/`end` (giây) cho mỗi câu.

---

## 4. Lưu ý bản quyền

Web trên GitHub Pages là **công khai**. Vì vậy:
- Bài của **YTN, KBS, SBS, MBC, 연합뉴스, báo chí**: trong repo chỉ để **link + trích đoạn ngắn + từ vựng, ghi chú**. Toàn văn hãy dán bằng cách A (chỉ nằm trong trình duyệt của bạn).
- Nội dung mang nhãn **공공누리 loại 1** (ví dụ 정책브리핑 korea.kr, Korea.net) được đăng lại toàn văn nếu ghi rõ nguồn — kiểm tra nhãn ở cuối mỗi bài.
- Video: web chỉ **nhúng** video YouTube (không tải về), transcript do bạn soạn.
- 4 bài mẫu có sẵn là **bài mô phỏng** do Claude viết theo văn phong báo chí; số liệu không phải tin thật.

---

## 5. Tiến độ học

- Tiến độ, bản dịch, bài tự nhập được lưu trong **trình duyệt** (localStorage) — mỗi máy / trình duyệt riêng.
- Vào **Tiến độ & lỗi → Sao lưu tiến độ** để xuất file `.json`, rồi nhập lại trên máy khác.
- Ghi âm lời dịch chỉ giữ trong phiên đang mở (không lưu lâu dài).
- Phát âm, đọc bài dùng giọng tiếng Hàn của thiết bị (Chrome / Edge cho chất lượng tốt nhất). Nhận diện giọng nói tiếng Việt hoạt động trên Chrome.
