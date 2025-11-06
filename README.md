# 🏠 RealtyFinder Frontend 

A modern, responsive **real estate web application** built with a user-first approach — designed for property owners, buyers, and agents.  
This project focuses on delivering a smooth user experience with clear navigation, interactive forms, and dynamic UI components.

---

## 🚀 Overview

The project implements a complete frontend architecture for a property listing platform.  
It covers everything from **user accounts and listings** to **chat, notifications, and dashboard management** — optimized for both desktop and mobile users.

---

## 🧭 Table of Contents

1. [Tech Stack](#-tech-stack)  
2. [Project Structure](#-project-structure)  
3. [Core Features](#-core-features)  
   - [Must-Have Features](#must-have-features-the-simple-plan)  
   - [Should-Have Features](#should-have-features--simplified-tasks)  
4. [Design Guidelines](#-design-guidelines)  
5. [Installation & Setup](#-installation--setup)  
6. [Development Notes](#-development-notes)  
7. [Future Enhancements](#-future-enhancements)  
8. [License](#-license)

---

## ⚙️ Tech Stack

**Framework:** React (Vite or CRA)  
**Routing:** React Router DOM  
**UI Components:** Tailwind CSS + shadcn/ui + Lucide React  
**State Management:** React Hooks / Context API  
**Animations:** Framer Motion  
**Icons:** Lucide Icons  
**Charts (for dashboard):** Recharts  
**Build Tool:** Vite  
**Version Control:** Git & GitHub  

---

## 📁 Project Structure

```
src/
├── assets/              # Static images & icons
├── components/          # Shared UI components (buttons, modals, inputs)
├── pages/               # Route-based pages (Home, Login, Profile, etc.)
├── layouts/             # Reusable layout components (Navbar, Footer)
├── context/             # Auth & global state management
├── services/            # API calls (fetch)
└── App.jsx              # Main app entry
```

---

## 🧩 Core Features

### Must-Have Features (The Simple Plan)

#### **1. User Account**
- Design sign-up & login screens  
- Basic user profile page  
- Seamless flow from sign-up → profile  
- Feedback states: success, error, loading  

#### **2. Property Listing**
- Multi-step listing form  
- Drag & drop **photo upload**  
- Upload **ID & property documents**  
- Visual **progress bar**  

#### **3. Manage Listings**
- Seller dashboard with property list view  
- Display property status (Pending / Live / Verified)  
- Edit, Pause, Delete actions  
- Empty state: “No listings yet”  

#### **4. Search & Results**
- Homepage with **prominent search bar**  
- Results page with **listing cards**  
- Map view toggle  
- Basic filters: price, location, bedrooms  

#### **5. Property Detail Page**
- Clean detail layout with photo gallery  
- Display full property info  
- “Contact Owner” button  
- Verified badge near title  

#### **6. Notifications**
- Notification bell with red alert dot  
- Dropdown for recent notifications  
- Email layout for updates  
- Notification preferences management  

#### **7. Chat & Contact**
- Chat interface: conversation list + message view  
- Start chat from property page  
- Input & send button with timestamps  
- Read/unread indicators  

#### **8. Booking Requests**
- “Book a Visit” button inside chat  
- Date & time picker  
- Show booking request status  

#### **9. Payments (Placeholder)**
- “Pay Here” button placeholder  
- “Secure payments coming soon” note  
- Mock-up for future payment flow  

#### **10. Verified Listings & Trust**
- Verified badge design (listings & profiles)  
- Add “Report Listing” button  

---

### Should-Have Features – Simplified Tasks

#### **Save & Wishlist**
- Heart icon on property cards  
- Save/unsave listings  
- Saved list page in profile  
- Empty state for no saved items  

#### **Custom Alerts**
- Save search filters (e.g., “3-bed under ₦20M”)  
- Get alerts for saved searches  
- Notification/email for new matches  

#### **Inquiry Status Updates**
- Notifications for owner replies or approvals  
- In-app + email updates  

#### **Seller Dashboard Insights**
- Performance metrics (views, messages, saves)  
- Charts and cards for visualization  
- Date range filters  

#### **Mobile-Friendly UI**
- Fully responsive layouts  
- Large, tappable buttons  
- Mobile navigation (hamburger/bottom nav)  

#### **Advanced Filters & Tags**
- Add extra filters (“New Listing”, etc.)  
- Multi-select & toggle options  
- Tag-based search updates results dynamically  

---

## 🎨 Design Guidelines

- **Color Palette:** Clean neutrals with accent highlights for CTAs  
- **Typography:** Sans-serif (e.g., Inter, Poppins)  
- **Spacing:** Generous padding/margins for readability  
- **Icons:** Minimalist, consistent weight (Lucide)  
- **Feedback:** Use toasts, modals, and skeleton loaders  
- **Accessibility:** Contrast-compliant and keyboard-friendly  

---

## 🛠️ Installation & Setup

```bash
# Clone the repository
git clone https://github.com/your-username/real-estate-frontend.git

# Navigate into the folder
cd real-estate-frontend

# Install dependencies
npm install

# Run the app
npm run dev
```

Visit: [http://localhost:5173](http://localhost:5173)

---

## 🧠 Development Notes

- Use **localStorage** for temporary user/session persistence.  
- Modularize all components for reusability.  
- Keep **API calls centralized** inside `/services`.  
- Validate all user inputs (forms, uploads).  
- Follow **mobile-first design** approach.  

---

## 🔮 Future Enhancements

- Full **payment gateway integration (Stripe/Paystack)**  
- **AI-powered recommendations** for users  
- **Admin analytics dashboard**  
- **Dark mode toggle**  
- **Multi-language support**  

---


