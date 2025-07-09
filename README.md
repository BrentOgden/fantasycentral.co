# Fantasy Central

A comprehensive fantasy football league stats and analytics site—featuring real-time data, and animated stat counters. Built with React, Vite, and TailwindCSS, and deployed on Netlify.

---

## Table of Contents

- [Demo](#demo)  
- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Getting Started](#getting-started)  
  - [Prerequisites](#prerequisites)  
  - [Installation](#installation)  
  - [Running Locally](#running-locally)  
  - [Building for Production](#building-for-production)  
- [Folder Structure](#folder-structure)  


---

## Demo

Live site: https://fantasycentral.co

---

## Features

- **All-Time Records** — View career highs and aggregate stats across seasons.  
- **Animated Counters** — Smoothly animate stat numbers on load and scroll.    
- **Team Pages** — Dedicated pages for each team with roster and recent performance.  
- **Responsive Design** — Mobile-first layout that adapts to all screen sizes.  

---

## Tech Stack

- **Framework:** React  
- **Bundler:** Vite  
- **Styling:** TailwindCSS  
- **Animations:** Framer Motion  
- **Data Fetching:** Axios  
- **Routing:** React Router  
- **Deployment:** Netlify  

---

## Getting Started

### Prerequisites

- Node.js ≥ 16.x  
- npm or Yarn  

### Installation

```bash
git clone https://github.com/your-username/fantasycentral.git
cd fantasycentral
npm install
# or
yarn
```

### Folder Structure

```
.
├── public/                   # Static assets (favicon, images)
├── src/
│   ├── assets/               # Custom CSS files, images, etc.
│   ├── components/           # Reusable UI components (Card, LeagueHistory, etc.)
        ├──dataSources/       # statistical data to populate the stats components
│   ├── pages/                # Page views (Home, League, Team, Player)
│   ├── styles/               # Tailwind config & global CSS
│   ├── App.jsx               # Routes & layout
│   └── main.jsx              # Application entrypoint
├── .gitignore                # Ignore rules
├── tailwind.config.js
├── vite.config.js
└── README.md
```