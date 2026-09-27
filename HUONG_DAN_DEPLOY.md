# Cập nhật và triển khai portfolio

Repo riêng đã được tạo tại https://github.com/PhanChiCuongUIT/phan-chi-cuong-portfolio. Bản production đang ở https://phan-chi-cuong-portfolio.vercel.app/. Thư mục `portfolio` là gốc của repo này; không chạy `git push` từ thư mục EcoQuest bên ngoài.

## Bật triển khai tự động từ GitHub

1. Trên GitHub, mở https://github.com/apps/vercel/installations/new và cài/cấu hình Vercel GitHub App cho tài khoản `PhanChiCuongUIT`. Chọn **Only select repositories** và cấp quyền cho `phan-chi-cuong-portfolio`.
2. Trong thư mục `portfolio`, chạy `npx vercel git connect --yes`. Nếu Vercel báo không thấy repo, kiểm tra lại quyền ở bước 1.
3. Sau khi nối thành công, push một commit lên `main` và kiểm tra tab **Deployments** của repo GitHub. Vercel sẽ tự build và cập nhật trạng thái deployment cho các lần push tiếp theo.

## Cập nhật website sau này

```powershell
cd C:\Users\ADMIN\Downloads\Microservices-SE361\portfolio
npm run build
npm run test:e2e
git add .
git commit -m "Update portfolio"
git push
```

Khi GitHub App đã được nối, không cần chạy `vercel --prod` mỗi lần sửa. Nếu chưa nối, có thể triển khai thủ công bằng `npx vercel --prod --yes`, nhưng cách này **không** tạo luồng cập nhật Deployment tự động từ mỗi lần push.

Nội dung EN/VI và project nằm ở `src/content.ts`; CV tải về nằm ở `public/PhanChiCuong_Internship_Resume.pdf`; metadata, favicon và ảnh chia sẻ nằm ở `index.html` và `public/logo.png`. Ảnh dự án trong `public/projects/` là ảnh chụp thật, nguồn được ghi ở `SCREENSHOTS.md`. Không commit `.env.local`, `.vercel`, `node_modules` hoặc `dist`.
