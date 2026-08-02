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
- **Automated Weekly Audit** — Refreshes ESPN/MFL standings, ESPN awards, record changes, and a Markdown report every Tuesday at 9:00 AM Mountain Time.

## Weekly ESPN/MFL automation

The production branch includes `.github/workflows/weekly-fantasy-audit.yml`. It runs at 9:00 AM in `America/Denver`, validates data from both leagues, builds the production site, commits verified changes to `main`, and allows Netlify to deploy the commit. It can also be run manually from the repository’s **Actions** tab with an optional season or week.

Add these encrypted repository secrets under **Settings → Secrets and variables → Actions**:

- `ESPN_SWID` — the private league’s ESPN `SWID` session value
- `ESPN_S2` — the private league’s ESPN `espn_s2` session value
- `MFL_API_KEY` — optional; only needed if the MFL export endpoints require authentication
- `GOOGLE_SERVICE_ACCOUNT_JSON` — the complete Google service-account JSON key; the service account must have Editor access to the Scoring Records workbook

Never add these values to `.env` files that are committed to the repository or to `VITE_` variables, because those are exposed to the browser build. ESPN session values expire periodically; if a scheduled run reports `401` or `403`, replace the two ESPN secrets with fresh values.

Each successful run updates:

- `src/components/dataSources/weeklyData.json`
- `src/sheetsData.json` when a new weekly high/low record is verified
- `reports/weekly/<season>-week-<week>.md`

The same verified run also updates the historical Scoring Records workbook. It refreshes career wins, losses, winning percentage, high-point wins, season totals, weekly scoring records, career points, and MFL victory points. `Sheet13` (money won) is intentionally excluded. A hidden `_Automation Log` tab stores the last applied season snapshot so reruns and stat corrections apply only the net difference instead of double-counting results.

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
