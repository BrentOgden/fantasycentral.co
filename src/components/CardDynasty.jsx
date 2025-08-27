// src/components/CardDynasty.jsx

import React from 'react';

function CardDynasty({ item }) {
  let badgeText, playoffText;
  if (item.rank < 7) playoffText = "Playoff Qualifier";
  if (item.division === "Varsity") badgeText = "Varsity";
  else if (item.division === "Junior Varsity") badgeText = "Junior Varsity";
  else if (item.division === "The Rest") badgeText = "The Rest";

  return (
    <section className="flex-none w-[250px] flex flex-col items-center text-black">
      {/* Card container */}
      <div className="relative w-full h-auto bg-white rounded-[9px] shadow-md overflow-hidden">
        {badgeText && (
          <div className="absolute bottom-1.5 left-1.5 z-10 bg-[#8e2034]/70 text-white text-xs font-bold px-2 py-1 rounded">
            {badgeText}
          </div>
        )}
        {playoffText && (
          <div className="absolute top-1.5 right-1.5 z-10 bg-black/70 text-white text-xs font-bold px-2 py-1 rounded">
            {playoffText}
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
