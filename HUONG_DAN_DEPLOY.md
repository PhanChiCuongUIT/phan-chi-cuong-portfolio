# Triển khai portfolio lên Vercel

Portfolio đã được build và kiểm thử. Website là frontend tĩnh, không cần backend, database hay biến môi trường.

## Cách khuyến nghị: repo riêng

1. Tạo repository GitHub mới, ví dụ `phan-chi-cuong-portfolio`.
2. Đưa **nội dung bên trong thư mục `portfolio`** vào gốc repository mới. Không đưa `node_modules`, `dist`, `test-results` lên GitHub.
3. Trên Vercel, chọn **Add New → Project → Import Git Repository** và chọn repo đó.
4. Vercel sẽ nhận Vite. Kiểm tra lại: **Build Command** là `npm run build`, **Output Directory** là `dist`.
5. Nhấn **Deploy**. Sau khi có URL chính thức, thêm URL đó vào `index.html` dưới dạng canonical URL và `og:url`, rồi redeploy.

Nếu bạn giữ `portfolio` ngay trong repo EcoQuest hiện tại, khi import repo trên Vercel hãy chọn **Root Directory: `portfolio`**. Tuy nhiên repo riêng sẽ gọn và chuyên nghiệp hơn cho portfolio cá nhân.

## Triển khai bằng CLI sau khi đăng nhập

Từ thư mục `portfolio`:

```powershell
npx vercel login
npx vercel --prod
```

Lệnh CLI sẽ hỏi tài khoản/team và tên dự án. Đừng dùng tài khoản Vercel của người khác hoặc commit token lên GitHub.

## Cập nhật nội dung

- Nội dung EN/VI và project: `src/content.ts`.
- CV tải về: `public/PhanChiCuong_Internship_Resume.pdf`.
- Metadata và ảnh chia sẻ: `index.html`, `public/og-cover.svg`.
- Kiểm tra trước khi đẩy: `npm install`, `npm run test:e2e`, `npm run build`.

Ảnh trong hai project là ảnh chụp ứng dụng thật. Nguồn ảnh được ghi trong `SCREENSHOTS.md`. Thay ảnh tại `public/projects/` và cập nhật chú thích trong `src/content.ts` khi giao diện ứng dụng thay đổi.
