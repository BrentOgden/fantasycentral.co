// src/App.jsx
import React from 'react';
import {
  HashRouter as Router,
  Routes,
  Route,
  Outlet,
} from 'react-router-dom';

// 1) Import SplashPage
import SplashPagePostGuess from './components/SplashPagePostGuess';

// 2) Nav, Footer & BottomNav
import Nav from './Nav';
import Footer from './Footer';
import BottomNav from './components/BottomNav';

// 3) All other components/pages
import Hero from './Hero';
import Awards from './components/Awards';
import Card from './components/Card';
import CardDynasty from './components/CardDynasty';
import Results from './components/Results';
import FootballDivider from './components/FootballDivider';
import Marquee from 'react-fast-marquee';
import data from './components/dataSources/data';
import dataDynasty from './components/dataSources/dataDynasty';
import LeagueHistory from './components/LeagueHistory';
import LeagueRecordsWeekly from './components/LeagueRecordsWeekly';
import LeagueRecordsYearly from './components/LeagueRecordsYearly';
import LeagueRecordsAT from './components/LeagueRecordsAT';
const isApp = typeof window !== 'undefined' && !!window.cordova;

// ─── Layout wrapper that shows Nav, Outlet, BottomNav & Footer ───────────────
function MainLayout() {
  

  return (
    <>
      <Nav />
      <div className="app-content">
        <Outlet />
      </div>

      {/* only show on the mobile app */}
      {isApp && <BottomNav />}

      <Footer />
    </>
  );
}

// ─── HomePage moved to "/home" ─────────────────────────────────────────────────
function HomePage() {
  const cards = [...data]
    .sort((a, b) => a.rank - b.rank)
    .map((item) => <Card key={item.id} item={item} />);

  const cardsDynasty = [...dataDynasty]
    .sort((a, b) => a.rank - b.rank)
    .map((item) => <CardDynasty key={item.id} item={item} />);

  return (
    <>
      {/* Hero Section */}
      <div className="md:container mx-auto">
        <Hero />
      </div>

      {/* First Marquee */}
      <div className="md:container mx-auto mt-8">
        <h2 className="text-red-700 text-center text-3xl font-extrabold mb-4">
          He-Man Women Haters
        </h2>
        <Marquee gradient={false} speed={50} pauseOnHover>
          <div className="flex space-x-4">{cards}</div>
        </Marquee>
      </div>

      {/* Divider */}
      <div className="md:container mx-auto my-8">
        <FootballDivider count={10} size="4rem" color="#8e2034" />
      </div>

      {/* Awards Section */}
      <div className="bg-[rgba(243,237,240,0.6)] border-t-[1rem] border-t-[#8e2034] py-5">
        <Awards />
      </div>

      {/* Another Divider */}
      <div className="md:container mx-auto my-8">
        <FootballDivider count={10} size="4rem" color="#8e2034" />
      </div>

      {/* Second Marquee */}
      <div className="md:container mx-auto py-5">
        <h2 className="text-[#8e2034] text-center text-3xl font-extrabold mb-4">
          Hernandez’s Hangmen
        </h2>
        <Marquee gradient={false} speed={50} pauseOnHover>
          <div className="flex space-x-4">{cardsDynasty}</div>
        </Marquee>
      </div>
    </>
  );
}

// ─── App entrypoint with routing ───────────────────────────────────────────────
export default function App() {
  return (
    <Router>
      <Routes>
        {/* 1) Splash at root, no Nav/BottomNav/Footer */}
        <Route path="/" element={<SplashPagePostGuess />} />

        {/* 2) All other routes use MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="home"                   element={<HomePage />} />
          <Route path="results"                element={<Results />} />
          <Route path="leaguehistory"          element={<LeagueHistory />} />
          <Route path="leaguerecordsweekly"    element={<LeagueRecordsWeekly />} />
          <Route path="leaguerecordsyearly"    element={<LeagueRecordsYearly />} />
          <Route path="leaguerecordsat"        element={<LeagueRecordsAT />} />
          {/* …add more child routes here if needed… */}
        </Route>
      </Routes>
    </Router>
  );
}
