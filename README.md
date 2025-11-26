# Anbu Gynaecare

**Period care that loves you back.**
---

## 🎯 Project Overview

Anbu Gynaecare is a full-stack web application designed to empower people with period education, eco-friendly product recommendations, intelligent cycle tracking with AI-powered predictions, and personalized guidance. The platform features a marketing landing page with authentication, a comprehensive dashboard, and multiple feature modules with smooth Framer Motion animations.

### Key Features

- **🏠 Landing Page**: Engaging hero section with staggered animations, feature highlights, testimonials, and call-to-actions
- **🔐 Authentication**: Secure user login and signup pages with form validation and real-time feedback
- **📊 Dashboard**: Centralized hub with navigable sections and contextual tooltips
- **📅 Cycle Tracking**: Advanced period cycle tracking with interactive calendar, emoji indicators, and fertile window markers
- **🔮 AI Predictions**: Intelligent cycle predictions with confidence scores and personalized insights
- **📚 Learn**: Educational resources and articles about menstrual health
- **🛒 Shop**: Curated eco-friendly product recommendations with environmental impact tracking
- **👥 Community**: User testimonials and personalized "You" section
- **🎭 Animations**: Comprehensive Framer Motion animations for enhanced UX

---

## 🏗️ Project Structure

```
anbu-gynaecare/
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── layout.tsx           # Root layout with metadata & providers
│   │   ├── page.tsx             # Home page (dynamic imports)
│   │   ├── globals.css          # Global styles & Tailwind
│   │   ├── manifest.ts          # PWA manifest
│   │   ├── login/               # Authentication pages
│   │   │   └── page.tsx
│   │   ├── register/
│   │   │   └── page.tsx
│   │   ├── forgot-password/
│   │   │   └── page.tsx
│   │   ├── dashboard/           # Protected dashboard routes
│   │   │   └── page.tsx
│   │   ├── track/
│   │   │   └── page.tsx
│   │   ├── learn/
│   │   │   └── page.tsx
│   │   ├── shop/
│   │   │   └── page.tsx
│   │   └── you/
│   │       └── page.tsx
│   ├── components/              # Reusable UI components
│   │   ├── Home.tsx             # Landing page composition
│   │   ├── Hero.tsx             # Animated hero section
│   │   ├── WhyChooseAnbu.tsx    # Value proposition cards
│   │   ├── Tools.tsx            # Features grid
│   │   ├── Testimonials.tsx     # User testimonials
│   │   ├── FinalCTA.tsx         # Call-to-action section
│   │   ├── AuthRedirect.tsx     # Route protection
│   │   ├── CycleOnboarding.tsx  # Setup wizard
│   │   └── dashboard/           # Dashboard components
│   │       ├── Dashboard.tsx    # Main dashboard layout
│   │       ├── Track.tsx        # Cycle tracking interface
│   │       ├── Learn.tsx        # Educational content
│   │       ├── Shop.tsx         # Product catalog
│   │       ├── You.tsx          # User profile
│   │       └── BottomNavigation.tsx # Mobile nav
│   ├── hooks/                   # Custom React hooks
│   │   ├── index.ts             # Central exports
│   │   ├── useApi.ts            # Generic API hooks
│   │   ├── useCycle.ts          # Cycle tracking hooks
│   │   └── useProducts.ts       # Product management hooks
│   ├── services/                # API service layer
│   │   ├── index.ts             # Service exports
│   │   ├── api.ts               # Axios configuration
│   │   ├── auth.ts              # Authentication services
│   │   ├── user.ts              # User management
│   │   ├── cycles.ts            # Cycle setup & validation
│   │   ├── predictions.ts       # AI prediction services
│   │   ├── logs.ts              # Period logging services
│   │   └── products.ts          # Product catalog services
│   ├── types/                   # TypeScript definitions
│   │   ├── index.ts             # Type exports
│   │   └── api.ts               # API response types
│   ├── libs/                    # Utility libraries
│   │   ├── error-handler.ts     # Error handling utilities
│   │   └── index.ts
│   ├── utils/                   # Helper functions
│   │   ├── passwordValidation.ts # Password strength validation
│   │   └── index.ts
│   └── open api.json            # API specification
├── public/                      # Static assets
│   ├── anbu logo svg.svg        # Brand assets
│   ├── anbu logo.png
│   └── icon/                    # PWA icons
├── package.json                 # Dependencies & scripts
├── tsconfig.json                # TypeScript configuration
├── next.config.ts               # Next.js configuration
├── tailwind.config.ts           # Tailwind CSS config
├── postcss.config.mjs           # PostCSS configuration
└── eslint.config.mjs            # ESLint configuration
```

---

## 🛠️ Tech Stack

### Core Framework & Runtime
- **Framework**: [Next.js 16.0.3](https://nextjs.org) - React framework with App Router
- **Runtime**: [React 19.2.0](https://react.dev) & React DOM
- **Language**: [TypeScript 5](https://www.typescriptlang.org) - Type-safe JavaScript

### UI & Styling
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com) - Utility-first CSS framework
- **Animations**: [Framer Motion 12.23.24](https://www.framer.com/motion) - Production-ready motion library
- **Icons**: [Lucide React 0.554.0](https://lucide.dev) - Beautiful icon library
- **Typography**: Google Fonts (Montserrat Alternates, Inter)

### Development Tools
- **PWA**: [vite-plugin-pwa 1.1.0](https://vite-pwa-org.netlify.app) - Progressive Web App support
- **Compiler**: [Babel React Compiler](https://react.dev/learn/react-compiler) - Optimized React compilation
- **Linting**: [ESLint 9](https://eslint.org) with Next.js config
- **HTTP Client**: [Axios 1.13.2](https://axios-http.com) - Promise-based HTTP client

### Architecture
- **State Management**: Custom React hooks with caching
- **API Layer**: Centralized service architecture with error handling
- **Type Safety**: Comprehensive TypeScript interfaces
- **Component Pattern**: Atomic design with composition

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
- `mint`, `lavender`, `sand` - Supporting colors
- Theme optimized for period care branding

---

## 🔌 API Integration

Anbu Gynaecare features a comprehensive API integration layer with the following services:

### Authentication Services
- User registration and login
- JWT token management
- Route protection with `AuthRedirect` component

### Cycle Management
- **Cycle Setup**: Initial user cycle configuration (21-45 day cycles, 3-8 day periods)
- **Predictions**: AI-powered next period predictions with confidence scores
- **Logging**: Daily period tracking with flow intensity, mood, and symptoms
- **Analytics**: Cycle insights and pattern recognition

### Product Services
- Eco-friendly product catalog
- Environmental impact tracking
- Shopping cart functionality
- Price formatting and filtering

### Data Management
- **Caching**: 10-30 minute cache durations for optimal performance
- **Error Handling**: Centralized error management with user-friendly messages
- **Type Safety**: Full TypeScript coverage for all API interactions

### Key API Endpoints
```
POST /api/auth/register     - User registration
POST /api/auth/login        - User authentication
GET  /api/cycle-predictions - Get cycle predictions
POST /api/cycle-logs        - Log period data
GET  /api/cycle-logs        - Retrieve period logs
POST /api/user-cycles       - Set up cycle preferences
GET  /api/products          - Get product catalog
```

---

## 🎣 Custom Hooks

The application uses a comprehensive hook system for state management:

### Generic Hooks (`useApi.ts`)
- `useFetch` - Data fetching with loading/error states
- `useAsyncSubmit` - Form submissions with optimistic updates
- `usePagination` - Paginated data management
- `useSearch` - Search functionality
- `useAuth` - Authentication state management

### Domain Hooks
- `useCycleLogs` - Period logging with caching
- `useCyclePredictions` - Prediction data with real-time updates
- `useCycleSetup` - Cycle configuration management
- `useProducts` - Product catalog with filtering
- `useShoppingCart` - Cart management

### Features
- **Caching**: Automatic data caching with configurable durations
- **Error Boundaries**: Graceful error handling
- **Loading States**: Consistent loading UI patterns
- **Optimistic Updates**: Immediate UI feedback for actions

---

## 📱 Pages & Routes

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | `Home` | Landing page with marketing content |
| `/login` | `Login` | User authentication with form animations |
| `/register` | `Register` | User registration with validation feedback |
| `/forgot-password` | `ForgotPassword` | Password reset with modal animations |
| `/dashboard` | `Dashboard` | Main user hub with section reveals |
| `/track` | `Track` | Advanced cycle tracking with calendar animations |
| `/learn` | `Learn` | Educational resources |
| `/shop` | `Shop` | Eco-friendly product catalog |
| `/you` | `You` | User personalization and insights |

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

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

---

## 📄 License

This project is private and proprietary to Anbu Gynaecare.

---

## ✅ Completed Features

- ✅ **Framer Motion Animations**: Comprehensive animation system throughout the app
- ✅ **Cycle Tracking**: Interactive calendar with emoji indicators and fertile windows
- ✅ **AI Predictions**: Intelligent period predictions with confidence scoring
- ✅ **API Integration**: Full service layer with caching and error handling
- ✅ **Authentication**: Complete auth flow with form validation
- ✅ **PWA Support**: Progressive Web App capabilities
- ✅ **Type Safety**: Comprehensive TypeScript coverage
- ✅ **Responsive Design**: Mobile-first approach with smooth animations

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For questions or support, please contact the development team or create an issue in the repository.

---

**Made with ❤️ for period care education and support.**

*Anbu Gynaecare - Empowering women with knowledge, care, and community.*
