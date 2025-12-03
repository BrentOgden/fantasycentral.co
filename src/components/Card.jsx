// src/components/Card.jsx

import React from 'react';
function ordinal(n) {
  const s = ["th", "st", "nd", "rd"],
    v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}
function Card({ item }) {
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
  if (item.division === "Owners") badgeText = "Owners";
  else if (item.division === "Players") badgeText = "Players";

  return (
    <section className="flex-none flex flex-col items-center w-[180px] text-center text-[#213547]">
      <div className="relative w-full h-[180px] bg-white rounded-2xl shadow-md overflow-hidden">

        {/* Division badge */}
        {badgeText && (
          <div className="absolute bottom-1 left-1 bg-[#8e2034]/70 text-white text-xs font-bold px-2 py-1 rounded">
            {badgeText}
          </div>
        )}

        {/* Playoff seed badge */}
        {playoffText && (
          <div className="absolute top-1 right-1 bg-black/70 text-white text-xs font-bold px-2 py-1 rounded">
            {playoffText}
          </div>
        )}

        {/* BYE badge (moved slightly to avoid overlap with seed badge) */}
        {seedingText && (
          <div className="absolute top-1 right-1 bg-[#8e2034]/70 text-white text-xs font-bold px-2 py-1 rounded">
            {seedingText}
          </div>
        )}

        <img
          src={item.teamLogo}
          alt={item.teamName}
          className="w-full h-full object-fill"
        />
      </div>

      <div className="mt-2">
        <a href={item.teamUrl} target="_blank" rel="noopener noreferrer">
          <h4 className="my-2 font-extrabold text-[#8e2034] text-center">
            {item.teamName}
          </h4>
        </a>
        <p className="m-0 text-center">{item.ownerName}</p>
        <p className="m-0 text-center">{item.record.record}</p>
        <p className="m-0 text-center">{item.record.winPercentage}</p>
      </div>
    </section>
  );
}

export default Card;
