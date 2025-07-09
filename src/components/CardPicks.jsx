// src/components/CardPicks.jsx

import React from 'react';

function CardPicks({ item }) {
  return (
    <section className="flex-none flex flex-col items-center w-[250px] text-center text-white">
      {/* Card image */}
      <div className="relative w-full h-[170px] bg-white rounded-[9px] shadow-md overflow-hidden">
        <img
          src={item.teamLogo}
          alt={item.ownerName}
          className="w-full h-full object-cover rounded-[9px]"
        />
      </div>

      {/* Stats */}
      <div className="mt-2 space-y-0.5">
        <p className="font-bold m-0 text-[#8e2034] text-center">{item.ownerName}</p>
        <p className="m-0 text-black text-center">Weekly Record : {item.record.record}</p>
        <p className="m-0 text-black text-center">Total Points : {item.record.points}</p>
        <p className="m-0 text-black text-center">Place : {item.rank}</p>
      </div>
    </section>
  );
}

export default CardPicks;
