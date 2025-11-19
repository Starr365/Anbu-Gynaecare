# Anbu Gynaecare

**Period care that loves you back.**

A modern, user-friendly web application built with Next.js to provide comprehensive period care solutions and education. Anbu Gynaecare combines educational resources, product shopping, cycle tracking, and personalized guidance all in one place.

---

## 🎯 Project Overview

Anbu Gynaecare is a full-stack web application designed to empower people with period education, product recommendations, and tracking tools. The platform features a marketing landing page with authentication, a comprehensive dashboard, and multiple feature modules.

### Key Features

- **Landing Page**: Engaging hero section, feature highlights, testimonials, and call-to-actions
- **Authentication**: User login and signup pages with form validation
- **Dashboard**: Centralized hub with navigable sections
- **Tracking**: Period cycle tracking and insights
- **Learn**: Educational resources and articles
- **Shop**: Curated product recommendations
- **Community**: User testimonials and "You" section for personalization

---

## 🏗️ Project Structure

```
anbu-gynaecare/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with metadata
│   │   ├── page.tsx            # Home page
│   │   ├── globals.css         # Global styles
│   │   ├── manifest.ts         # PWA manifest
│   │   ├── login/              # Login page
│   │   ├── signup/             # Signup page
│   │   ├── dashboard/          # Dashboard page
│   │   ├── learn/              # Learn section
│   │   ├── track/              # Tracking section
│   │   ├── shop/               # Shop section
│   │   └── you/                # User section
│   └── components/
│       ├── Home.tsx            # Home page composition
│       ├── Hero.tsx            # Hero section
│       ├── WhyChooseAnbu.tsx    # Value proposition
│       ├── Tools.tsx           # Features overview
│       ├── Testimonials.tsx     # User testimonials
│       ├── FinalCTA.tsx         # Call-to-action
│       └── dashboard/
│           ├── Dashboard.tsx    # Dashboard layout
│           ├── Learn.tsx        # Learning module
│           ├── Track.tsx        # Tracking module
│           ├── Shop.tsx         # Shopping module
│           ├── You.tsx          # Personalization module
│           └── BottomNavigation.tsx  # Mobile navigation
├── public/                      # Static assets
├── package.json                 # Dependencies and scripts
├── tsconfig.json                # TypeScript config
├── next.config.ts               # Next.js config
├── tailwind.config.ts           # Tailwind CSS config
├── postcss.config.mjs           # PostCSS config
└── eslint.config.mjs            # ESLint config
```

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16.0.3](https://nextjs.org) - React framework with App Router
- **Language**: [TypeScript 5](https://www.typescriptlang.org) - Type-safe JavaScript
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com) - Utility-first CSS framework
- **UI Components**: [Lucide React 0.554.0](https://lucide.dev) - Icon library
- **Runtime**: [React 19.2.0](https://react.dev) & React DOM
- **PWA**: [vite-plugin-pwa 1.1.0](https://vite-pwa-org.netlify.app) - Progressive Web App support
- **Compiler**: [Babel React Compiler](https://react.dev/learn/react-compiler) - Optimized React compilation
- **Linting**: [ESLint 9](https://eslint.org) with Next.js config
- **Typography**: Google Fonts (Montserrat Alternates, Inter)

---

## 📦 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm/bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd anbu-gynaecare
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint checks

---

## 🎨 Design System

The project uses a custom color palette and typography system:

### Typography
- **Headlines**: Montserrat Alternates (weights: 400, 500, 600, 700)
- **Body**: Inter

### Colors
Referenced custom colors in Tailwind config:
- `rose`, `blush` - Primary accent colors
- `text`, `bg` - Text and background colors
- Theme optimized for period care branding

---

## 📱 Pages & Routes

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | `Home` | Landing page with marketing content |
| `/login` | `Login` | User authentication |
| `/signup` | `Signup` | User registration |
| `/dashboard` | `Dashboard` | Main user hub |
| `/dashboard` → Learn | `Learn` | Educational resources |
| `/dashboard` → Track | `Track` | Period cycle tracking |
| `/dashboard` → Shop | `Shop` | Product recommendations |
| `/dashboard` → You | `You` | User personalization |

---

## 🔐 Authentication

- Simulated login/signup flows (ready for backend integration)
- Form validation on login/signup pages
- Navigation to dashboard on successful login
- Links between login and signup pages

---

## 🚀 Deployment

### Build for Production

```bash
npm run build
npm start
```

### Deploy on Vercel (Recommended)

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with one click

[Vercel Platform Documentation](https://nextjs.org/docs/deployment)

---

## 📝 Development Notes

- Project uses Next.js App Router (not Pages Router)
- All components are React functional components
- TypeScript strict mode enabled
- Tailwind CSS for all styling
- PWA capabilities included in `manifest.ts`
- Custom fonts optimized with `next/font`

---

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

---

## 📄 License

This project is private and proprietary to Anbu Gynaecare.

---

## 💡 Future Enhancements

- Backend API integration for user authentication
- Database for period tracking data storage
- Real product catalog integration
- User profiles and personalization
- Push notifications for cycle reminders
- Social features and community forum
- Educational content management system

---

**Made with ❤️ for period care education and support.**
# Anbu-Gynaecare
