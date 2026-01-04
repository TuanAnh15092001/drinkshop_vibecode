# DrinkShop - Trang Web Bán Đồ Uống

Một ứng dụng thương mại điện tử bán đồ uống được xây dựng với React + Vite và Firebase.

## 🚀 Tính năng

- 🏠 Trang chủ với Hero, Categories, Best Sellers
- 🛍️ Danh sách sản phẩm với filter và search
- 📦 Chi tiết sản phẩm với chọn Size/Topping
- 🛒 Giỏ hàng với localStorage persistence
- 👤 Đăng nhập/Đăng ký với Firebase Auth
- 🔥 Dữ liệu sản phẩm từ Firestore

## 📋 Yêu cầu

- Node.js 18+
- npm hoặc yarn
- Tài khoản Firebase (miễn phí)

## 🛠️ Cài đặt

### 1. Clone và cài đặt dependencies

```bash
cd d:\VS_Code\Vibe_coding
npm install
```

### 2. Cấu hình Firebase

#### Bước 2.1: Tạo Firebase Project

1. Truy cập [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** hoặc **"Tạo dự án"**
3. Nhập tên dự án: `DrinkShop`
4. Có thể bỏ Google Analytics
5. Click **"Create project"**

#### Bước 2.2: Thêm Web App

1. Trong project, click icon **Web** (</>) để thêm app
2. Nhập tên app: `drinkshop-web`
3. Click **"Register app"**
4. Sao chép cấu hình Firebase

#### Bước 2.3: Cấu hình Environment Variables

Tạo file `.env` trong thư mục gốc:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

#### Bước 2.4: Bật Authentication

1. Trong Firebase Console, vào **Authentication** > **Sign-in method**
2. Bật các phương thức:
   - ✅ Email/Password
   - ✅ Google (yêu cầu OAuth consent screen)
   - ✅ Facebook (cần Facebook Developer App)

#### Bước 2.5: Tạo Firestore Database

1. Vào **Firestore Database** > **Create database**
2. Chọn **Start in test mode** (cho phát triển)
3. Chọn vị trí: `asia-southeast1` (Singapore)
4. Click **Enable**

#### Bước 2.6: Cấu hình Firestore Rules

Trong **Firestore Database** > **Rules**, thay thế bằng:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Products - ai cũng đọc được, chỉ admin mới ghi được
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }

    // Orders - chỉ user sở hữu mới đọc/ghi được
    match /orders/{orderId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null;
    }

    // Users profile
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### 3. Seed dữ liệu sản phẩm

Mở browser console tại http://localhost:5173 và chạy:

```javascript
import { products } from "./src/data/products.js";
import { seedProducts } from "./src/services/productService.js";
await seedProducts(products);
```

Hoặc tạo sản phẩm thủ công trong Firestore Console.

### 4. Chạy ứng dụng

```bash
npm run dev
```

Truy cập: http://localhost:5173

## 📁 Cấu trúc dự án

```
src/
├── components/        # React components
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── ProductCard.jsx
│   └── CartSidebar.jsx
├── pages/             # Route pages
│   ├── Home.jsx
│   ├── Products.jsx
│   ├── ProductDetail.jsx
│   ├── Cart.jsx
│   ├── Login.jsx
│   └── Register.jsx
├── context/           # React Context
│   ├── AuthContext.jsx
│   └── CartContext.jsx
├── services/          # Firebase services
│   ├── productService.js
│   └── orderService.js
├── firebase/          # Firebase config
│   ├── config.js
│   └── index.js
└── data/              # Sample data
    └── products.js
```

## 🔧 Công nghệ sử dụng

- **Frontend**: React 19, Vite
- **Styling**: Vanilla CSS với CSS Variables
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Backend**: Firebase (Auth, Firestore)
- **State**: React Context API

## 📝 Các bước tiếp theo

- [ ] Tích hợp thanh toán VNPay/MoMo
- [ ] Xây dựng Admin Dashboard
- [ ] Thêm tính năng yêu thích sản phẩm
- [ ] Cải thiện SEO với React Helmet
- [ ] Triển khai lên Firebase Hosting

## 📄 License

MIT
