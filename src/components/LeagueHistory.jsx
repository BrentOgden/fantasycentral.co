// src/components/LeagueHistory.jsx

import React, { useLayoutEffect } from 'react';
import { motion, useViewportScroll, useTransform, useSpring } from 'framer-motion';
import '../customCss/LeagueHistory.css';

import awardBG      from '../assets/fftrophy4.webp';
import leagueChamp  from '../assets/league_champ.jpg';
import img1214      from '../assets/IMG_1214.jpg';
import img0228      from '../assets/IMG_0228.jpg';
import img1367      from '../assets/IMG_1367.jpg';
import Timeline     from '../components/Timeline';

const sampleData = [
  { date: '2005', event: <a href="https://fantasy.espn.com/football/league/standings?seasonId=2005&leagueId=249295">Brad Schoenman (10-4)</a> },
  { date: '2006', event: <a href="https://fantasy.espn.com/football/league/standings?seasonId=2006&leagueId=249295">Joel Schimel (9-5)</a> },
  { date: '2007', event: <a href="https://fantasy.espn.com/football/league/standings?seasonId=2007&leagueId=249295">Ken Ryan (6-7)</a> },
  { date: '2008', event: <a href="https://fantasy.espn.com/football/league/standings?seasonId=2008&leagueId=249295">Justin Gutierrez (9-4)</a> },
  { date: '2009', event: <a href="https://fantasy.espn.com/football/league/standings?seasonId=2009&leagueId=249295">Nick Hazen (8-5)</a> },
  { date: '2010', event: <a href="https://fantasy.espn.com/football/league/standings?seasonId=2010&leagueId=249295">Ken Ryan (8-5)</a> },
  { date: '2011', event: <a href="https://fantasy.espn.com/football/league/standings?seasonId=2011&leagueId=249295">Bobby Killingbeck (10-3)</a> },
  { date: '2012', event: <a href="https://fantasy.espn.com/football/league/standings?seasonId=2012&leagueId=249295">Bobby Killingbeck (9-4)</a> },
  { date: '2013', event: <a href="https://fantasy.espn.com/football/league/standings?seasonId=2013&leagueId=249295">Jeremy Ogden (9-4)</a> },
  { date: '2014', event: <a href="https://fantasy.espn.com/football/league/standings?seasonId=2014&leagueId=249295">Justin Gutierrez (8-5)</a> },
  { date: '2015', event: <a href="https://fantasy.espn.com/football/league/standings?seasonId=2015&leagueId=249295">Kristen Hazen (8-5)</a> },
  { date: '2016', event: <a href="https://fantasy.espn.com/football/league/standings?seasonId=2016&leagueId=249295">Bobby Killingbeck (9-4)</a> },
  { date: '2017', event: <a href="https://fantasy.espn.com/football/league/standings?seasonId=2017&leagueId=249295">Jake Killingbeck (12-1)</a> },
  { date: '2018', event: <a href="https://fantasy.espn.com/football/league/standings?seasonId=2018&leagueId=249295">Jake Killingbeck (7-6)</a> },
  { date: '2019', event: <a href="https://fantasy.espn.com/football/league/standings?seasonId=2019&leagueId=249295">Brooke-Lynn Killingbeck (9-4)</a> },
  { date: '2020', event: <a href="https://fantasy.espn.com/football/league/standings?seasonId=2020&leagueId=249295">Matt Jimenez (9-4)</a> },
  { date: '2021', event: <a href="https://fantasy.espn.com/football/league/standings?seasonId=2021&leagueId=249295">Justin Gutierrez (8-6)</a> },
  { date: '2022', event: <a href="https://fantasy.espn.com/football/league/standings?seasonId=2022&leagueId=249295">Met Nagatani (9-5)</a> },
  { date: '2023', event: <a href="https://fantasy.espn.com/football/league/standings?seasonId=2023&leagueId=249295">Kristen Hazen (11-3)</a> },
  { date: '2024', event: <a href="https://fantasy.espn.com/football/league/standings?seasonId=2024&leagueId=249295">Tom Courtney (11-3)</a> }
];

export default function LeagueHistory() {
  // 1) preload the background before paint
  useLayoutEffect(() => {
    const img = new Image();
    img.src = awardBG;
  }, []);

  // 2) set up smooth JS-powered parallax
  const { scrollY }   = useViewportScroll();
  const speedFactor   = 0.3;
  const yRange        = useTransform(scrollY, y => -y * speedFactor);
  const y             = useSpring(yRange, { stiffness: 100, damping: 30 });

  const champImages = [
    { src: leagueChamp, alt: 'Champions' },
    { src: img1214,     alt: '2014 Champion' },
    { src: img0228,     alt: '2013 Champion' },
    { src: img1367,     alt: '2012 Champion' }
  ];

  return (
    <>
      {/* Champions Grid */}
      <section className="md:mx-40">
        <h1 className="text-center text-3xl font-semibold my-4 p-4">
          League Champions
        </h1>
        <p className="text-slate-800 mb-6 p-4 text-center">
          On this page you can find the historical results from each year since the inception of the league.
          For each season, you can see the final standings and money winners, and you can click on the slides
          to be taken to the league history page on ESPN to view point totals and other information.
        </p>
        <div className="grid md:grid-cols-4 gap-4 place-content-center mb-8">
          {champImages.map(({ src, alt }, i) => (
            <div key={i} className="overflow-hidden rounded-lg">
              <img
                src={src}
                alt={alt}
                loading="lazy"
                className="w-full h-full transform transition-transform duration-300 ease-in-out hover:scale-110"
              />
            </div>
          ))}
        </div>
      </section>

      {/* JS-powered smooth parallax, flush to footer */}
      <div className="league-history-wrapper">
        <motion.div className="parallax-bg" style={{ y }} />
        <div className="overlay" />
        <div className="content text-gray-900">
          <Timeline data={sampleData} />
        </div>
      </div>
    </>
  );
}
