// src/components/Results.jsx

import React from 'react';
import Marquee from 'react-fast-marquee';      // from npm
import CardPicks from './CardPicks';          // capitalize!
import dataPicks from './dataSources/dataPicks';         // one level up
import picksResults from './dataSources/picksResults.json';
import ResultsStats from './ResultsStats';

export default function Results() {
  // sort & map your picks by rank
  const cardsPicks = [...dataPicks]
    .sort((a, b) => a.rank - b.rank)
    .map(item => <CardPicks key={item.id} item={item} />);

  const leaders = [...new Set(dataPicks.map((item) => item.rank))].sort((a, b) => a - b).slice(0, 3)
    .map((rank) => ({ rank, entries: dataPicks.filter((item) => item.rank === rank) }));
  const ordinal = (rank) => rank === 1 ? '1st' : rank === 2 ? '2nd' : rank === 3 ? '3rd' : `${rank}th`;

  return (
    <section className="p-10 space-y-10">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-center">{picksResults.season} Week {picksResults.week} Pick Results</h1>
        <p className="text-center text-[#213547]">
          As usual, we will be doing the Weekly Picks. Weekly results and standings can be found below. Once again, the overall season winner will receive $50.
        </p>
      </div>

      <p className="text-center text-[#213547]">
        Final results for {picksResults.poolName}, through Week {picksResults.week}.{' '}
        <a href={picksResults.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline">View CBS standings</a>
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {leaders.map(({ rank, entries }) => (
          <div key={rank} className="bg-white rounded p-4 shadow-2xl">
            <h3 className="text-xl text-[#8e2034] font-semibold text-center">
              {entries.length > 1 ? 'Tied ' : ''}{ordinal(rank)} Place
            </h3>
            <p className="text-black text-center">{entries.map((entry) => entry.ownerName).join(' | ')}</p>
            <p className="text-black text-center">{entries[0].correct} correct picks</p>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="mx-10">
        <ResultsStats />
      </div>

      {/* Weekly Picks Standings */}
      <div className="bg-transparent w-full border-t-[1rem] border-t-[#8e2034] py-5 text-black">
        <h2 className="text-[#8e2034] text-center text-3xl font-extrabold mb-4">
          Season Standings — Through Week {picksResults.week}
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
