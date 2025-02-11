# [SkinTime Booking Service Application]

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Vite](https://img.shields.io/badge/built_with-vite-orange.svg)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/react-v18+-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/typescript-v4+-blue.svg)](https://www.typescriptlang.org/)

## 🌟 Giới thiệu

[Tên dự án] là một ứng dụng frontend hiện đại được xây dựng bằng:
- **Vite**: Công cụ build nhanh cho React.
- **React (TypeScript)**: Framework UI mạnh mẽ.
- **Zustand**: Quản lý trạng thái đơn giản và nhẹ.
- **ShadCN UI**: Thư viện giao diện tích hợp với TailwindCSS.
- **TailwindCSS**: Công cụ CSS tiện lợi để xây dựng UI nhanh chóng.

---

## 🚀 Tính năng ( Kham khảo file document ) 
**✨ Tính năng chính**<br>
**👰‍♀️ Guest (Khách truy cập)**
 - [Xem thông tin trung tâm: tên, địa chỉ, giới thiệu, bảng giá, khung giờ làm việc.]
 - [Xem thông tin dịch vụ: giới thiệu, biểu phí, sơ đồ trị liệu, đánh giá.]
 - [khảo sát để được đề xuất dịch vụ chăm sóc da phù hợp.] <br>
 **💆‍♀️Customer (Khách hàng)** <br>
- [Làm trắc nghiệm để nhận đề xuất dịch vụ phù hợp.] <br>
- [Đặt lịch dịch vụ: chọn chuyên viên và khung giờ làm việc.]<br>
- [Đổi lịch hoặc hủy lịch đặt.]<br>
- [Đặt cọc và thanh toán dịch vụ.]<br>
- [Feedback và đánh giá chuyên viên/dịch vụ.]<br>
- [Quản lý hồ sơ cá nhân: chỉnh sửa, cập nhật thông tin.]<br>
  ##
**👩‍🔬 Staff (Nhân viên)** <br>
-- Xem thông tin lịch đặt của khác <br>
-- Hỗ trợ check-in check-out <br>

## Cấu trúc thư mục <br>
```
├── hooks/          # Custom hooks <br>
├── components/     # Các components của ShadCN UI<br>
├── component/      # Các component của ứng dụng ( Tuân theo nguyên tắc Antomic design ) <br>
├── store/          # Quản lý trạng thái với Zustand<br>
├── styles/         # Tệp cấu hình và CSS<br>
├── libs/           # Hàm tiện ích<br>
├── services/       # Xu ly nhung API<br>
├── App.tsx         # Thành phần chính của ứng dụng<br>
├── main.tsx        # Điểm vào ứng dụng<br>
```

## 🔧 Cài đặt và chạy
**Yêu cầu**:<br>
  Node.js: Phiên bản >= 16<br>
  NPM hoặc Yarn<br>
**Bước 1: Clone repository**<br>
```
  git clone https://github.com/<tên-tài-khoản>/<tên-dự-án>.git<br>
  cd <tên-dự-án><br>
```
**Bước 2: Cài đặt các dependencies**<br>
Sử dụng npm hoặc yarn:<br>
```
  npm install<br>
  yarn<br>
```
**Bước 3: Chạy ứng dụng**<br>
```
  npm run dev<br> 
  Hoặc <br>
  yarn dev
```
## Truy cập ứng dụng tại [https://skintimeclinic.netlify.app/]
## ✨ Đóng góp<br>
  Fork repository.<br>
  Tạo nhánh mới (
  ```
git checkout -b feature/tính-năng-mới
  ```
  Commit thay đổi
```
git commit -m "Thêm tính năng X")
```
  Push nhánh 
  ```
  git push origin feature/tính-năng-mới
  ```
  Tạo Pull Request.<br>
