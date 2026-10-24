# Trang đặt hàng Deli (Hữu Nghĩa)

Trang tĩnh, mở được trực tiếp trên GitHub Pages tại `/dat-hang/`.

- `index.html` – khung trang
- `style.css` – giao diện
- `js/du-lieu-don-hang.js` – danh sách sản phẩm khách đặt, mã cũ đã xóa + gợi ý, sản phẩm gợi ý thêm (giá niêm yết, KM, tồn)
- `js/du-lieu-danh-muc.js`, `js/vi-tri-danh-muc.js`, `js/ten-hang.js` – dữ liệu danh mục (giá B, vị trí thẻ trên ảnh trang, tên hàng)
- `js/don-hang.js` – logic giỏ hàng, tính tiền, tạo ảnh đơn, xóa giỏ
- `js/tim-kiem.js`, `js/xem-anh-phong-to.js` – tìm kiếm và xem ảnh phóng to
- `js/cau-hinh.js` – cấu hình; điền `FORM_URL` (ví dụ Formspree) để đơn tự gửi về email
- `img/` – ảnh trang danh mục (001–501) và ảnh sản phẩm

Giá khách B = niêm yết − 4% − KM tháng. Cập nhật dữ liệu hằng tháng: sửa `du-lieu-*.js`.
