// src/components/CardDynasty.jsx

import React from 'react';
function ordinal(n) {
  const s = ["th", "st", "nd", "rd"],
    v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}
function CardDynasty({ item }) {
  let badgeText, playoffText, seedingText;

  // Correct seed text (3–6)
  if (item.rank > 2 && item.rank < 7) {
    playoffText = `${ordinal(item.rank)} seed`;
  }

  // BYE for Top 2
  if (item.rank < 3) {
    seedingText = "Division Winner (BYE)";
  }

  // Division labels
  if (item.division === "Varsity") badgeText = "Varsity";
  else if (item.division === "Junior Varsity") badgeText = "Junior Varsity";

  return (
    <section className="flex-none w-[250px] flex flex-col items-center text-black">
      {/* Card container */}
      <div className="relative w-full h-auto bg-white rounded-[9px] shadow-md overflow-hidden">
        {badgeText && (
          <div className="absolute bottom-1.5 left-1.5 z-10 bg-[#8e2034]/80 text-white text-xs font-bold px-2 py-1 rounded">
            {badgeText}
          </div>
        )}
        {playoffText && (
          <div className="absolute top-1.5 right-1.5 z-10 bg-black/70 text-white text-xs font-bold px-2 py-1 rounded">
            {playoffText}
          </div>
        )}
        {seedingText && (
          <div className="absolute top-1 right-1 bg-[#8e2034]/80 text-white text-xs font-bold px-2 py-1 rounded">
            {seedingText}
          </div>
        )}
        <img
          src={item.teamLogo}
          alt={item.teamName}
          className="w-full h-full object-fill rounded-[9px]"
        />
      </div>

      {/* Text block */}
      <div className="mt-2 text-center">
        <h4 className="my-2 font-extrabold text-[#8e2034]">{item.teamName}</h4>
        <p className="m-0 text-center">{item.ownerName}</p>
        <p className="m-0 text-center">
          {item.record.record} : <i>Record</i>
        </p>
        <p className="m-0 text-center">
          {item.record.winPercentage} : <i>Winning %</i>
        </p>
        <p className="m-0 text-center">
          {item.record.victoryPoints} : <i>VPs</i>
        </p>
      </div>
    </section>
  );
}

export default CardDynasty;
