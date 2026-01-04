// src/components/SplashPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logoBlack from '../assets/logo2025black.png';
import OlympicMedalGuessModal from './GuessModal';

// 🔹 Import the two league data files
import ownersStandings from './dataSources/data';
import playersStandings from './dataSources/dataDynasty';

// Helper to format ordinal ("1st", "2nd", etc.)
function ordinal(n) {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

export default function SplashPage() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [animateModal, setAnimateModal] = useState(false);
  const [showMedalModal, setShowMedalModal] = useState(false);

  // ─── Countdown state ─────────────────────────────────────────────────────
  const [timeLeft, setTimeLeft] = useState({
    days: '0',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  // 1) Change this target date/time as needed (UTC)
  const TARGET_DATE = new Date('2026-02-06T07:00:00Z').getTime();

  // 2) Run countdown on mount and every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = Date.now();
      const diff = TARGET_DATE - now;

      if (diff <= 0) {
        clearInterval(intervalId);
        setTimeLeft({ days: '0', hours: '00', minutes: '00', seconds: '00' });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({
        days: String(days),
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0'),
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // ─── Navigation / Modal toggles ───────────────────────────────────────────
  const handleEnterClick = () => {
    navigate('/home');
  };

  const handleEnterClick2 = () => {
    window.open(
      'https://picks.cbssports.com/football/pickem/pools/kbxw63b2geztoobugayte===?entryId=ivxhi4tzhizdcmjyg4ytonzw',
      '_blank',
      'noopener,noreferrer'
    );
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setAnimateModal(false);
    setTimeout(() => {
      setShowModal(false);
    }, 200);
  };

  useEffect(() => {
    if (showModal) {
      const id = setTimeout(() => setAnimateModal(true), 10);
      return () => clearTimeout(id);
    }
  }, [showModal]);

  // ─── Derive playoff qualifiers from each league’s data ────────────────────
  const ownersQualifiers = ownersStandings
    .filter((t) => typeof t.rank === 'number' && t.rank <= 6)
    .sort((a, b) => a.rank - b.rank);

  const playersQualifiers = playersStandings
    .filter((t) => typeof t.rank === 'number' && t.rank <= 6)
    .sort((a, b) => a.rank - b.rank);

  const ownersQualifiersPO = ownersStandings
    .filter((t) => typeof t.playoffRank === 'number' && t.playoffRank <= 6)
    .sort((a, b) => a.playoffRank - b.playoffRank);

  const playersQualifiersPO = playersStandings
    .filter((t) => typeof t.playoffRank === 'number' && t.playoffRank <= 6)
    .sort((a, b) => a.playoffRank - b.playoffRank);

  const league1Name = 'He-Man Woman Haters';
  const league2Name = "Hernandez's Hangmen";

  const league1LogoUrl = '';
  const league2LogoUrl = '';

  const getSeedNumber = (team, idx) =>
    typeof team.rank === 'number' ? team.rank : idx + 1;
  const getPlayoffSeedNumber = (team, idx) =>
    typeof team.playoffRank === 'number' ? team.playoffRank : idx + 1;

  const getSeedLabel = (seedNum) => `${ordinal(seedNum)} Seed`;

  const formatRecordLine = (team) => {
    const recordStr = team.record?.record ?? '';
    const winPct = team.record?.winPercentage ?? '';
    if (recordStr && winPct) return `${recordStr} (${winPct})`;
    if (recordStr) return recordStr;
    if (winPct) return winPct;
    return '';
  };

  return (
    <div className="relative h-screen w-full bg-gradient-to-br from-red-900 via-black to-orange-700 flex flex-col items-center justify-center px-4 text-center">
      {/* Logo */}
      <img
        src={logoBlack}
        alt="Fantasy Central Logo"
        className="w-32 h-32 mb-6"
      />

      {/* Headline */}
      <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
        Welcome to Fantasy Central
      </h1>

      {/* Sub-headline */}
      <p className="text-lg text-center md:text-2xl text-indigo-200 mb-8 max-w-2xl">
        Keep up with both leagues all season long. Track all-time records, updated
        stats, weekly awards and much more. Ready to dominate this season?
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={handleEnterClick}
          className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-3 px-8 rounded-full shadow-lg transition duration-200"
        >
          Enter Fantasy Central →
        </button>

        <button
          onClick={handleEnterClick2}
          className="bg-transparent border-2 border-yellow-500 hover:bg-yellow-500 hover:text-gray-900 text-yellow-500 font-semibold py-3 px-8 rounded-full shadow-lg transition duration-200"
        >
          Make Weekly Picks →
        </button>

        {/* New button for Olympic Medal Guess */}
        <button
          onClick={() => setShowMedalModal(true)}
          className="bg-transparent border-2 border-yellow-500 hover:bg-yellow-500 hover:text-gray-900 text-yellow-500 font-semibold py-3 px-8 rounded-full shadow-lg transition duration-200"
        >
          Olympic Medal Guess →
        </button>
      </div>

      {/* Countdown Display */}
      <div className="flex space-x-4 text-white mb-4 mt-8 text-center">
        <div>
          <span className="text-5xl font-bold">{timeLeft.days}</span>
          <div className="uppercase text-sm">Days</div>
        </div>
        <div>
          <span className="text-5xl font-bold">{timeLeft.hours}</span>
          <div className="uppercase text-sm">Hours</div>
        </div>
        <div>
          <span className="text-5xl font-bold">{timeLeft.minutes}</span>
          <div className="uppercase text-sm">Minutes</div>
        </div>
        <div>
          <span className="text-5xl font-bold">{timeLeft.seconds}</span>
          <div className="uppercase text-sm">Seconds</div>
        </div>
      </div>

      <p className="text-white uppercase text-xl">to Submit Draft Order Guesses</p>

      {/* Olympic Medal Guess Modal */}
      <OlympicMedalGuessModal
        isOpen={showMedalModal}
        onClose={() => setShowMedalModal(false)}
        formEndpoint="https://formspree.io/f/meeovwqp"
        countdown={timeLeft}
      />

      {/* Existing Playoff Qualifiers Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          {/* … existing modal content stays unchanged … */}
        </div>
      )}
    </div>
  );
}
