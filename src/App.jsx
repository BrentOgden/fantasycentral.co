// src/App.jsx

import React from 'react';
import {
  HashRouter as Router,
  Routes,
  Route,
  Outlet,
} from 'react-router-dom';

// 1) Import SplashPage

// 2) Nav + Footer for “inside‐site” pages
import Nav from './Nav';
import Footer from './Footer';

// 3) All other components/pages
import Hero from './Hero';
import Awards from './components/Awards';
import Card from './components/Card';
import CardDynasty from './components/CardDynasty';
import Results from './components/Results';
import FootballDivider from './components/FootballDivider';
import Marquee from 'react-fast-marquee';           // ← MAKE SURE THIS IS HERE
import data from './components/dataSources/data';
import dataDynasty from './components/dataSources/dataDynasty';
import LeagueHistory from './components/LeagueHistory';
import LeagueRecordsWeekly from './components/LeagueRecordsWeekly';
import LeagueRecordsYearly from './components/LeagueRecordsYearly';
import LeagueRecordsAT from './components/LeagueRecordsAT';
import SplashPagePostGuess from './components/SplashPagePostGuess';


// ─── Layout wrapper that shows Nav + Footer ────────────────────────────────────
function MainLayout() {
  return (
    <>
      <Nav />
      <Outlet />   {/* The matched child route (e.g. HomePage) will render here */}
      <Footer />
    </>
  );
}

// ─── HomePage moved to "/home" ─────────────────────────────────────────────────
function HomePage() {
  // Sort & render your two card lists, as before
  const cards = [...data]
    .sort((a, b) => a.rank - b.rank)
    .map(i => <Card key={i.id} item={i} />);

  const cardsDynasty = [...dataDynasty]
    .sort((a, b) => a.rank - b.rank)
    .map(i => <CardDynasty key={i.id} item={i} />);

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

export default function App() {
  return (
    <Router>
      <Routes>
        {/* 1) SplashPage at "/": no Nav/Footer here */}
        <Route path="/" element={<SplashPagePostGuess />} />

        {/* 2) All other routes render inside MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/results" element={<Results />} />
          <Route path="/leaguehistory" element={<LeagueHistory />} />
          <Route path="/leaguerecordsweekly" element={<LeagueRecordsWeekly />} />
          <Route path="/leaguerecordsyearly" element={<LeagueRecordsYearly />} />
          <Route path="/leaguerecordsat" element={<LeagueRecordsAT />} />
          {/* …add more child routes here if needed… */}
        </Route>
      </Routes>
    </Router>
  );
}
