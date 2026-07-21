# ⚡ GMM — Great Marketing Matters

> A state-of-the-art, high-performance Digital Marketing Agency & Interactive Web Application built with Next.js 16, React 19, Framer Motion, GSAP, and Tailwind CSS.

---

## 🌟 Key Highlights & Features

- 🎯 **Hero Experience**: Dynamic text reveal powered by GSAP & Framer Motion with smooth background SVG gradient illustrations.
- 🔄 **3D Services Cylinder Carousel**: Drag-and-drop interactive 3D 360° rotating carousel presenting agency core services with hover image overlays.
- 📖 **Interactive 3D Client Book (Testimonials)**: Realistic 3D page-flipping client storybook built with `react-pageflip`, featuring Table of Contents navigation and responsive double-page spread.
- 🕹️ **GMM Arcade Zone (Mini-Games)**:
  - 🧠 **Logo Memory Match**: Focus & memory puzzle game.
  - 🏆 **Tic-Tac-Toe AI**: Smart AI bot battle.
  - ✋ **Rock Paper Scissors**: Battle AI with win streaks.
  - ⚡ **Reflex Speed Test**: Millisecond reaction speed analyzer.
- 📱 **100% Multi-Device Responsiveness**: Pixel-perfect layout optimization across iPhones, Android devices, Tablets, Laptops, Desktops, and Ultra-Wide displays.
- 🎨 **Modern Glassmorphism & Micro-Animations**: Built-in Lenis smooth scrolling, custom trailing cursor physics, and rich dark/gold aesthetic design system.

---

## 🛠️ Technology Stack

| Category | Technologies |
| :--- | :--- |
| **Framework** | Next.js 16 (App Router, Turbopack) |
| **Library** | React 19 |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **Animations** | Framer Motion, GSAP, ScrollTrigger |
| **3D & Canvas** | React PageFlip (`react-pageflip`), 3D CSS Transforms |
| **Smooth Scroll** | Lenis Scroll (`lenis`) |
| **Icons** | Lucide React |

---

## 📁 Repository Structure

```
Digital-Agency-Web/
├── src/
│   ├── app/
│   │   ├── games/          # Arcade Mini-Games Arena Page
│   │   │   └── page.tsx
│   │   ├── globals.css     # Global styles & design system tokens
│   │   ├── layout.tsx      # Root layout wrapper with providers
│   │   └── page.tsx        # Main Landing Page
│   ├── components/
│   │   ├── about.tsx       # About GMM with GSAP scroll text reveals
│   │   ├── clients.tsx     # Infinite marquee for client brand logos
│   │   ├── cursor.tsx      # Custom spring-physics trailing cursor
│   │   ├── footer.tsx      # Responsive footer with social & contact info
│   │   ├── games-toggle.tsx# Floating arcade launcher & popup modal
│   │   ├── hero.tsx        # High-impact agency hero banner
│   │   ├── lenis-provider.tsx # Smooth scrolling provider
│   │   ├── navbar.tsx      # Dynamic glassmorphism navigation header
│   │   ├── services.tsx    # Interactive 3D cylinder carousel
│   │   └── testimonials.tsx# 3D PageFlip interactive client review book
└── public/
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js 18+** installed on your system.

### 1. Clone the Repository

```bash
git clone https://github.com/arshadyelikar27-dev/Digital-Agency-Web.git
cd Digital-Agency-Web
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

Open `http://localhost:3000` in your browser to view the live application.

### 4. Build for Production

```bash
npm run build
npm run start
```

---

## 📜 Available Scripts

| Script | Command | Description |
| :--- | :--- | :--- |
| `dev` | `next dev --turbopack` | Starts development server with Turbopack |
| `build` | `next build` | Compiles optimized production build |
| `start` | `next start` | Starts production server |
| `lint` | `next lint` | Runs ESLint check |

---

## 📄 License

This project is licensed under the MIT License — feel free to use and customize!

---

<p align="center">
Developed with ❤️ for <b>Great Marketing Matters (GMM)</b>
</p>
