# UBA Lifestyle Banking Demo

A fully functional, executive-presentation-quality demo app for UBA Lifestyle Banking. Built with Hono, TypeScript, and Cloudflare Pages, this app showcases core banking journeys with a premium, modern fintech UI and UBA's corporate branding.

## 🌟 Project Overview

**Name**: UBA Lifestyle Banking  
**Goal**: Demonstrate a lifestyle banking platform that helps users automate bills, become debt-free, shop smarter, and get rewarded  
**Tech Stack**: Hono + TypeScript + TailwindCSS + Cloudflare Pages  
**Status**: ✅ Active and Running
**Branding**: UBA Corporate Identity (Red #EB2C23, Grey #7D7D7D, PT Sans Font)

## 🔗 URLs

- **Sandbox Demo**: https://3000-ixaxiuo51s23sxigcf9n6-6532622b.e2b.dev
- **GitHub Repository**: https://github.com/amper8and/ai_unixerse
- **Production**: (Deploy with `npm run deploy:prod`)

## ✨ Features

### Core Features (Fully Implemented)
- ✅ **Home Dashboard** with Hero Carousel and Bento Need Boxes grid
- ✅ **Automate Bills & Payments** - Full journey with 3 bills management
- ✅ **Become Debt Free** - 6-month debt payoff plan with ₦180,000 debt management
- ✅ **Buy Smarter** - Shopping deals with cashback and discounts
- ✅ **Get Rewarded** - Points system with 1,250 points and redeemable rewards
- ✅ **AI Assistant** - Interactive chatbot with quick actions and voice simulation
- ✅ **Settings** - Preferences, linked accounts, security, and notifications
- ✅ **Smooth Animations** - Tile press feedback, bottom sheet transitions, chat animations

### Coming Soon Features (Placeholder UI)
- 🔜 Stress Free Travel
- 🔜 Feel Great
- 🔜 Money Maker (Partial)
- 🔜 Preserve Wealth
- 🔜 Create Memories

## 📊 Data Architecture

### Data Models
The app uses a comprehensive demo dataset stored in `public/data/demoData.json` with:

1. **User Profile** - Personal info, preferences, and settings
2. **Accounts** - 2 linked bank accounts (UBA Bank, OPay)
3. **Need Boxes** - 9 lifestyle banking modules with:
   - Icon, color, status, progress
   - Insights and action items
   - Phase markers (full, partial, lite)
   - Badges (urgent, recommended, progress)

4. **Bills** - 3 upcoming bills (AEDC, DStv, Spectranet)
5. **Debts** - 3 debts totaling ₦180,000 with payoff plan
6. **Shopping Deals** - MTN data bundle (16% off) and airtime cashback
7. **Rewards** - Points system with 3 redeemable items
8. **Hero Cards** - 3 featured action cards in carousel
9. **Chat History** - AI assistant conversation log

### Storage Services
- **Local Storage**: Demo data served from JSON file
- **In-Memory State**: App state managed in JavaScript
- **No Backend Required**: Fully client-side for demo purposes

### Data Flow
1. App loads → Fetches `demoData.json`
2. User interacts → Updates in-memory state
3. Renders UI → Dynamic based on current state
4. AI interactions → Simulated responses with 1s delay

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Wrangler CLI (for deployment)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd webapp

# Install dependencies
npm install

# Build the project
npm run build

# Start development server
npm run dev:sandbox

# Or use PM2 (recommended for sandbox)
pm2 start ecosystem.config.cjs

# View logs
pm2 logs webapp --nostream

# Stop server
pm2 stop webapp
```

### Environment Setup

The app runs in the sandbox with PM2 for process management. No environment variables required for local development.

## 📱 User Guide

### For Presenters

1. **Open the Demo URL** in a mobile browser or desktop with mobile view (F12 → Mobile Toggle)

2. **Home Screen**:
   - Greeting shows user's name and time of day
   - Hero Carousel has 3 spotlight actions (swipe or click)
   - Bento Grid shows 9 Need Boxes (4 fully functional)
   - Tap any "Phase 1 Full" tile to explore

3. **Explore Need Boxes**:
   - **Bills**: View 3 upcoming bills, set up auto-pay
   - **Debt**: See 6-month payoff plan with ₦45,000 interest savings
   - **Shopping**: Buy data with 16% discount, earn cashback
   - **Rewards**: Redeem 1,250 points for data, airtime, or vouchers

4. **AI Assistant** (Bottom Button):
   - Click to open chat interface
   - Use quick actions (Pay Bills, Debt Plan, Buy Data, My Rewards)
   - Type custom queries
   - Voice button (simulated)
   - AI navigates to relevant Need Box automatically

5. **Settings** (Top Right Icon):
   - View profile and linked accounts
   - Toggle preferences (Quiet Mode, Biometrics, WhatsApp)
   - See security and notification settings

6. **Demo Scenarios**:
   - **Bill Automation**: Home → Bills Tile → Review 3 bills → Set up auto-pay
   - **Debt Payoff**: Home → Debt Tile → View plan → Make extra payment
   - **Smart Shopping**: Home → Shopping Tile → Buy 8GB data at 16% off
   - **Rewards**: Home → Rewards Tile → Redeem 1,000 points for data
   - **AI Journey**: AI Button → "Help me pay bills" → Auto-navigate to Bills

### For Users

The app demonstrates a lifestyle banking experience where AI helps you:
- **Never miss bill payments** with automation
- **Become debt-free faster** with smart payment plans
- **Save money** on everyday purchases
- **Get rewarded** for good financial behavior

## 🛠️ Development

### Project Structure

```
webapp/
├── src/
│   ├── index.tsx           # Main Hono app entry point
│   └── renderer.tsx        # HTML renderer with meta tags
├── public/
│   ├── static/
│   │   ├── style.css       # Custom CSS with animations
│   │   └── app.js          # Main application logic (36KB)
│   └── data/
│       └── demoData.json   # Demo dataset (12KB)
├── dist/                   # Build output (Cloudflare Workers bundle)
├── ecosystem.config.cjs    # PM2 configuration
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite build configuration
├── wrangler.jsonc          # Cloudflare Pages configuration
└── README.md               # This file
```

### Key Files

- **`public/static/app.js`**: Main application class with all UI logic, state management, and interactions
- **`public/data/demoData.json`**: Complete demo dataset with user, accounts, need boxes, bills, debts, deals, rewards
- **`public/static/style.css`**: Custom CSS with mobile-first layout, animations, and component styles
- **`src/index.tsx`**: Hono server that serves the HTML page and static assets

### Available Scripts

```bash
npm run dev           # Vite dev server (local machine)
npm run dev:sandbox   # Wrangler dev server (sandbox)
npm run build         # Build for production
npm run preview       # Preview production build
npm run deploy        # Deploy to Cloudflare Pages
npm run deploy:prod   # Deploy to production with project name
npm run clean-port    # Kill process on port 3000
npm run test          # Test local server with curl
```

### Making Changes

1. **Update Demo Data**: Edit `public/data/demoData.json`
2. **Update UI Logic**: Edit `public/static/app.js`
3. **Update Styles**: Edit `public/static/style.css`
4. **Rebuild**: Run `npm run build`
5. **Restart**: `pm2 restart webapp`

## 🎨 Design System

### UBA Corporate Identity
- **Primary**: #EB2C23 (UBA Red) - Main brand color
- **Secondary**: #7D7D7D (UBA Grey) - Supporting elements
- **Accent**: #EB2C23 (UBA Red) - Highlights and CTAs
- **Dark**: #1A1A2E - Text
- **Light**: #F8F9FA - Background
- **Logo**: UBA logo displayed in top right of header (white version on red background)

### Typography
- **Font**: PT Sans (Google Fonts) - UBA's brand font
- **Weights**: 400 (Regular), 700 (Bold)
- **Loading**: Optimized with preconnect

### Components
- **Need Box Tiles**: 16px border-radius, subtle shadows, press feedback
- **Hero Cards**: Gradient backgrounds, 24px border-radius
- **Bottom Sheet**: 24px top border-radius, backdrop blur
- **Badges**: Small, uppercase, high contrast
- **Buttons**: 12px border-radius, hover states
- **Chat Bubbles**: 18px border-radius, asymmetric corners

### Animations
- **Tile Press**: Scale to 0.98 on active
- **Bottom Sheet**: Slide up from bottom (0.3s ease)
- **Chat Messages**: Slide in from bottom (0.3s ease)
- **Overlay**: Fade in (0.3s)
- **Progress Rings**: Stroke-dashoffset transition (0.5s ease)

## 🚀 Deployment

### Sandbox Testing (Current)
Already running at: https://3000-ih8t89obv4uv4eq8zcc9b-6532622b.e2b.dev

### Cloudflare Pages (Production)

```bash
# Step 1: Build the project
npm run build

# Step 2: Deploy to Cloudflare Pages
npm run deploy:prod

# You'll get a URL like:
# https://webapp.pages.dev
```

### Custom Domain
After deployment, add a custom domain in Cloudflare Pages dashboard.

## 📈 Current Status

### ✅ Completed Features
- Home dashboard with carousel and bento grid
- 4 fully functional Need Boxes (Bills, Debt, Shopping, Rewards)
- AI Assistant with chat interface and quick actions
- Settings screen with preferences and security
- Smooth animations and micro-interactions
- Mobile-responsive design with Inter font
- Demo data with realistic Nigerian financial scenarios
- Local state management and navigation
- Modal system for confirmations and success messages

### 🔄 In Progress
- Cloudflare Pages deployment
- GitHub repository setup

### 📋 Next Steps
1. **Deploy to Cloudflare Pages** for permanent public URL
2. **Push to GitHub** for version control and collaboration
3. **Add more demo scenarios** (travel, health, income, savings)
4. **Enhance AI responses** with more contextual intelligence
5. **Add demo mode** with auto-play guided tours
6. **Implement data persistence** with localStorage
7. **Add analytics** to track user interactions
8. **Create video demo** for presentations

## 🎯 Demo Scenarios Checklist

- ✅ **Bill Automation Journey**: View bills → Set up auto-pay → Confirm
- ✅ **Debt Payoff Journey**: View plan → Make extra payment → See progress
- ✅ **Shopping Journey**: Browse deals → Select deal → Purchase → Success
- ✅ **Rewards Journey**: View points → Select reward → Redeem → Success
- ✅ **AI Navigation**: Ask about bills → Get response → Navigate to Bills Need Box
- ✅ **Settings Management**: Change preferences → Toggle features → View accounts

## 📝 Notes

- **No Real Banking**: All data is simulated, no real bank integrations
- **Local State**: State resets on page refresh (intentional for demo)
- **Nigeria Focus**: Currency in NGN, providers (AEDC, DStv, MTN, Glo)
- **Mobile-First**: Optimized for mobile but works on desktop
- **Presentation-Ready**: Clean UI, smooth transitions, realistic data
- **Extensible**: Easy to add new Need Boxes or customize data

## 🔧 Troubleshooting

### App not loading?
1. Check if PM2 is running: `pm2 list`
2. View logs: `pm2 logs webapp --nostream`
3. Restart: `pm2 restart webapp`
4. Rebuild: `npm run build && pm2 restart webapp`

### Port 3000 in use?
```bash
npm run clean-port
pm2 start ecosystem.config.cjs
```

### Data not showing?
- Check browser console for errors
- Verify `/data/demoData.json` is accessible
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

### Styles not loading?
- Check `/static/style.css` is accessible
- Verify TailwindCSS CDN is loading
- Check browser network tab for 404 errors

## 📧 Support

For issues or questions about this demo:
1. Check the console for errors
2. Review the logs: `pm2 logs webapp`
3. Rebuild and restart: `npm run build && pm2 restart webapp`

---

**Built with ❤️ for UBA Lifestyle Banking**  
**Last Updated**: March 4, 2026  
**Version**: 1.1.0 - UBA Branded Edition  
**Platform**: Cloudflare Pages + Hono Framework

## 🎨 Recent Updates

### Version 1.1.0 - UBA Corporate Identity (March 4, 2026)
- ✅ Applied UBA logo to homepage header (top right)
- ✅ Updated color scheme to UBA Red (#EB2C23) and Grey (#7D7D7D)
- ✅ Changed font to PT Sans (UBA's brand font)
- ✅ Updated all gradients and UI elements with UBA colors
- ✅ Committed and pushed to GitHub
