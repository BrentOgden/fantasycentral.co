// src/components/Results.jsx

import React from 'react';
import Marquee from 'react-fast-marquee';      // from npm
import CardPicks from './CardPicks';          // capitalize!
import dataPicks from './dataSources/dataPicks';         // one level up
import away from '../assets/chargers.png';    // one level up
import home from '../assets/broncos.png';  // one level up
import ResultsStats from './ResultsStats';

export default function Results() {
  // sort & map your picks by rank
  const cardsPicks = [...dataPicks]
    .sort((a, b) => a.rank - b.rank)
    .map(item => <CardPicks key={item.id} item={item} />);

  return (
    <section className="p-10 space-y-10">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-center">Weekly Pick Results</h1>
        <p className="text-center text-[#213547]">
          As usual, we will be doing the Weekly Picks. Weekly results and standings can be found below. Once again, the overall season winner will receive $50.
        </p>
      </div>

      {/* Top 3 Grid */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded p-4 shadow-2xl">
          <h3 className="text-xl text-[#8e2034] font-semibold text-center">1st Place</h3>
          <p className='text-black text-center'>Brent Ogden | Jeremy Ogden (10-6)</p>
        </div>
        <div className="bg-white rounded p-4 shadow-2xl">
          <h3 className="text-xl text-[#8e2034] font-semibold text-center">2nd Place</h3>
          <p className='text-black text-center'>Freeman Puthavongsa (9-7)</p>
        </div>
        <div className="bg-white rounded p-4 shadow-2xl">
          <h3 className="text-xl text-[#8e2034] font-semibold text-center">3rd Place</h3>
          <p className='text-black text-center'>Met Nagatani | Justin Gutierrez (8-8)</p>
        </div>
      </div>

      {/* Logos */}
      <div className="flex items-center justify-center space-x-6">
        <img src={away} alt="Away Logo" className="w-32 h-32 object-contain" />
        <span className="text-2xl font-bold text-[#8e2034]">VS</span>
        <img src={home} alt="Home Logo" className="w-32 h-32 object-contain" />
      </div>

      {/* Stats */}
      <div className="mx-10">
        <ResultsStats />
      </div>

      {/* Weekly Picks Standings */}
      <div className="bg-transparent w-full border-t-[1rem] border-t-[#8e2034] py-5 text-black">
        <h2 className="text-[#8e2034] text-center text-3xl font-extrabold mb-4">
          Weekly Picks Standings
        </h2>
        <Marquee gradient={false} speed={50} pauseOnHover>
          <div className="flex space-x-4">
            {cardsPicks}
          </div>
        </Marquee>
      </div>
    </section>
  );
}
