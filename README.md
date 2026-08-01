<div align="center">

  <h1>🌌⚡ HERO COSMOS ⚡🌌</h1>
  <p><strong>The Next-Gen 3D Superhero & Anime Merchandising E-Commerce Platform</strong></p>

  <p>
    <a href="https://nextjs.org"><img src="https://img.shields.io/badge/Next.js-15.3-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js 15" /></a>
    <a href="https://react.dev"><img src="https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19" /></a>
    <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/Tailwind_CSS-v4.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS v4" /></a>
    <a href="https://threejs.org"><img src="https://img.shields.io/badge/Three.js-3D-black?style=for-the-badge&logo=three.js&logoColor=white" alt="Three.js" /></a>
    <a href="https://www.prisma.io"><img src="https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma" /></a>
    <a href="https://razorpay.com"><img src="https://img.shields.io/badge/Razorpay-Payment-0C2340?style=for-the-badge&logo=razorpay&logoColor=00C853" alt="Razorpay" /></a>
  </p>

  <p>
    <a href="#-key-features">Key Features</a> •
    <a href="#-tech-stack">Tech Stack</a> •
    <a href="#-getting-started">Getting Started</a> •
    <a href="#-project-structure">Project Structure</a> •
    <a href="#-roadmap">Roadmap</a> •
    <a href="#-contributing">Contributing</a>
  </p>

</div>

---

## 🌟 Overview

**HeroCosmos** is a premium, immersive e-commerce platform built for pop culture enthusiasts, comic book lovers, anime fans, and collectors. Designed with state-of-the-art web technologies including **Next.js 15 App Router**, **React 19**, **Three.js**, and **Tailwind CSS v4**, HeroCosmos offers interactive 3D product previews, gamified loyalty rewards, dynamic filtering, and a seamless checkout experience.

Whether you're shopping for high-end superhero apparel, limited-edition action figures, or exclusive anime gear, **HeroCosmos** delivers a cosmic, ultra-smooth shopping journey.

---

## ✨ Key Features

- 🦸 **Curated Cosmic Collections**: Specialized categories for Marvel, DC, Anime, Sci-Fi, and Gaming gear.
- 📦 **360° Interactive 3D Product Viewer**: Inspect 3D models of action figures & collectibles directly in your browser using `@google/model-viewer` and `@react-three/fiber`.
- 🪙 **HeroCoins Loyalty Rewards**: Earn **HeroCoins** on every purchase and redeem them during checkout for instant discounts.
- 💳 **Secure Razorpay Payment Integration**: Integrated payment workflow with automated order creation, verification, and receipt generation.
- 🔐 **Authentication & User Profiles**: Robust user authentication with **NextAuth.js**, supporting password encryption (`bcryptjs`) and session persistence.
- 🛒 **Persistent Shopping Cart & Wishlist**: Real-time reactive state management via **Zustand** with persistent local and cloud state.
- 📊 **Admin Analytics Dashboard**: Built-in admin panel featuring interactive charts with **Recharts** for sales performance, revenue analytics, and inventory tracking.
- 🎨 **Dynamic Cosmic Aesthetics**: Stunning dark-mode UI with smooth micro-animations powered by **Framer Motion**.
- 📧 **Automated Transactional Emails**: Email notifications for orders and account actions powered by **Nodemailer**.

---

## 🛠️ Tech Stack

### **Frontend & UI**
| Technology | Description |
| :--- | :--- |
| **Next.js 15 (App Router)** | Modern React framework with Turbopack for SSR and lightning-fast page loading |
| **React 19** | Latest React features and concurrency optimizations |
| **Tailwind CSS v4** | Next-generation utility-first CSS framework for custom cosmic styling |
| **Framer Motion** | Fluid animations, scroll effects, and dynamic micro-interactions |
| **Three.js / React Three Fiber** | Interactive 3D graphics rendering in WebGL |
| **Google Model-Viewer** | High-fidelity 3D and AR model inspection |
| **Zustand** | Lightweight, scalable global state management for cart & wishlist |
| **Recharts** | Data visualization for admin metrics and analytics |

### **Backend & Database**
| Technology | Description |
| :--- | :--- |
| **Prisma ORM** | Type-safe database client and schema migration tool |
| **SQLite / PostgreSQL** | Flexible relational database storage |
| **NextAuth.js** | Flexible authentication layer for user sessions |
| **Razorpay API** | Payment gateway processing and webhook verification |
| **Nodemailer** | SMTP email delivery service |

---

## 📂 Project Structure

```
Herocosmoweb/
├── herocosmos/
│   ├── prisma/
│   │   ├── schema.prisma       # Database models (User, Product, Order, Address, etc.)
│   │   └── seed.js             # Initial database seed data
│   ├── public/                 # Static assets, 3D models (.glb/.gltf), and images
│   ├── src/
│   │   ├── app/                # Next.js 15 App Router Pages & API Routes
│   │   │   ├── admin/          # Admin Dashboard & Analytics
│   │   │   ├── api/            # REST API endpoints (auth, checkout, razorpay)
│   │   │   ├── auth/           # Login & Registration pages
│   │   │   ├── cart/           # Shopping Cart page
│   │   │   ├── checkout/       # Checkout & Payment page
│   │   │   ├── products/       # Dynamic Product detail & 3D view pages
│   │   │   ├── profile/        # User dashboard, orders & address management
│   │   │   └── shop/           # Catalog browsing & filtering
│   │   ├── components/         # Reusable UI Components (Navbar, 3D Canvas, ProductCard, etc.)
│   │   ├── data/               # Product mock data & constant configurations
│   │   ├── lib/                # Utility helpers (Prisma client, Razorpay helper)
│   │   └── store/              # Zustand state stores (useCartStore, useWishlistStore)
│   ├── package.json            # Node.js dependencies & project scripts
│   └── tailwind.config.js      # Styling design system
└── README.md
```

---

## 🚀 Getting Started

Follow these steps to set up **HeroCosmos** on your local machine:

### 1. Prerequisites
- **Node.js**: `v18.x` or higher
- **npm** or **pnpm** or **yarn**
- **Git**

### 2. Clone the Repository
```bash
git clone https://github.com/Om-pandey-developer/Herocosmoweb.git
cd Herocosmoweb/herocosmos
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Environment Setup
Create a `.env` file in the `herocosmos` root folder (refer to `.env.example`):
```env
# Database Connection
DATABASE_URL="file:./dev.db"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-super-secret-key-change-this"

# Razorpay Payment Gateway (Get from Razorpay Dashboard)
RAZORPAY_KEY_ID="rzp_test_your_key_id"
RAZORPAY_KEY_SECRET="your_razorpay_secret"

# Nodemailer SMTP Configuration
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER="your-email@gmail.com"
EMAIL_SERVER_PASSWORD="your-app-password"
EMAIL_FROM="HeroCosmos <noreply@herocosmos.com>"
```

### 5. Initialize Database & Seed Data
```bash
# Push Prisma schema to local database
npx prisma db push

# (Optional) Seed the database with sample products and admin account
node prisma/seed.js
```

### 6. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to explore HeroCosmos! ⚡

---

## 🗺️ Roadmap & Future Enhancements

- [x] Next.js 15 App Router & Turbopack support
- [x] 3D Model inspection for premium products
- [x] Razorpay Payment Gateway integration
- [x] HeroCoins gamified rewards engine
- [ ] 🤖 **AI Size & Fit Recommender**: Machine learning recommendation for apparel sizing
- [ ] 🕶️ **WebAR Augmented Reality**: View 3D collectibles directly in your room using AR
- [ ] 🌍 **Multi-Language & Multi-Currency Support**: Dynamic localization for global fans

---

## 🤝 Contributing

Contributions are always welcome! If you have suggestions, feature requests, or bug reports:

1. **Fork** the repository
2. Create your Feature Branch (`git checkout -b feature/CoolSuperheroFeature`)
3. Commit your changes (`git commit -m 'Add some superhero magic'`)
4. Push to the Branch (`git push origin feature/CoolSuperheroFeature`)
5. Open a **Pull Request**

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

## 👨‍💻 Developer & Contact

Developed with ❤️ by **[Om Pandey](https://github.com/Om-pandey-developer)**

- 🌐 GitHub: [@Om-pandey-developer](https://github.com/Om-pandey-developer)
- 🚀 Project Repo: [HeroCosmoWeb](https://github.com/Om-pandey-developer/Herocosmoweb)

---

<div align="center">
  <sub>Built for heroes across the cosmos. ⚡🌌</sub>
</div>
