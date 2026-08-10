# µLearn CEA Chapter Website

Welcome to the official website and Content Management System for the **Community of Engineering Adoor (CEA)** chapter of [µLearn](https://mulearn.org/). This project acts as the digital storefront and operational dashboard for our local student network.

## Features

- **Dynamic Member Directory:** Browse currently approved chapter members, filter them by domain (Cyber Security, Next.js, Game Dev, etc), and see real-time Karma Points leaderboards.
- **Project Showcase:** Highlights student-built projects sourced directly from our Learning Circles, validating the "Proof of Work" model.
- **Admin CMS Dashboard:** A secure, password-gated (`/admin`) dashboard built for chapter leads that allows full control over:
    - **Member Applications:** Track pending member requests, check the interest groups they signed up for, assign their starting Karma, and approve them.
    - **Self-Reported Karma:** Members can submit updates to their Karma score that admins can one-click approve.
    - **Live Events & Projects Management:** Complete ability to add, edit, and remove events/projects natively from the browser without code updates.
- **Circuit Sticker Pack Aesthetic:** Features custom-built translucent glass UI and circuit-themed SVGs explicitly matched to the µLearn brand guidelines.

## Technologies Used

- **Next.js 14** (App Router)
- **React.js**
- **Tailwind CSS** (for responsive, glassmorphic styling)
- **Framer Motion** (for liquid animations and scroll effects)
- **Lucide React** (icons)
- **Zustand / LocalStorage** (simulated transient database currently in use for the testing phase)

## Running Locally

1. Install dependencies:
```bash
npm install
```

2. Setup Environment Variables
Create a `.env.local` file in the root directory. This contains the secret admin password used to access the CMS (/admin):
```env
ADMIN_PASSWORD=your_secure_password
```

3. Run the development server
```bash
npm run dev
```

Navigate to `http://localhost:3000` to view the homepage.

---

*Built by the minds at µLearn CEA.*
