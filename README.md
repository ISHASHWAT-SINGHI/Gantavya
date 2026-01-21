# 🚀 Gantavya - College Event Management Portal

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)

> **Gantavya** is a cutting-edge web platform designed to streamline the management of college technical clubs, events, and team registrations. Built with a focus on modern aesthetics (Cyber/Tech theme) and seamless user experience.

---

## ✨ Key Features

### 🏢 Club Management
- **Seamless Registration**: Clubs can register with full details including Admin & Member contacts.
- **Secure Authentication**: Custom ID-based login system for seamless access.
- **Profile Management**: Dashboard to view and manage club profiles.

### 🏆 Event System
- **Dynamic Event Listings**: Browse detailed event cards (RoboWars, Hackathons, Drone Prix, etc.).
- **Smart Registration**: 
  - **One-Click Team Formation**: Dropdown selection (no manual typing!) from your club's roster.
  - **Status Tracking**: Track your registration status (Pending/Confirmed) directly from the dashboard.

### 🎨 User Experience
- **Immersive Design**: Dark mode default with neon accents, glassmorphism, and smooth Framer Motion animations.
- **Responsive**: Fully optimized for Desktop, Tablet, and Mobile.
- **Gallery**: Masonry layout photo gallery to showcase past event highlights.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [Shadcn UI](https://ui.shadcn.com/)
- **Database**: [MongoDB Atlas](https://www.mongodb.com/atlas/database)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites
- Node.js 18+
- MongoDB Atlas Connection String

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/ISHASHWAT-SINGHI/Gantavya.git
    cd Gantavya
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Environment Setup**
    Create a `.env.local` file in the root directory and add your MongoDB URL:
    ```env
    MONGO_URL=mongodb+srv://<username>:<password>@cluster0.example.mongodb.net/?retryWrites=true&w=majority
    DB_NAME=gantavya
    ```

4.  **Run Development Server**
    ```bash
    npm run dev
    ```

5.  **Seed Database (Optional)**
    To populate initial event data:
    - Visit `http://localhost:3000/api/seed` in your browser.

---

## 📸 Screenshots

*(Add your screenshots here later)*

| Landing Page | Dashboard |
|:---:|:---:|
| ![Landing](https://placehold.co/600x400/1a1a1a/FFF?text=Landing+Page) | ![Dashboard](https://placehold.co/600x400/1a1a1a/FFF?text=Dashboard) |

---

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements.

## 📄 License

This project is licensed under the MIT License.
