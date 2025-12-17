// src/components/SplashPage.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logoBlack from '../assets/logo2025black.png';

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

    // ─── Countdown state ─────────────────────────────────────────────────────
    const [timeLeft, setTimeLeft] = useState({
        days: '0',
        hours: '00',
        minutes: '00',
        seconds: '00',
    });

    // 1) Change this target date/time as needed (UTC)
    const TARGET_DATE = new Date('2025-12-11T08:00:00Z').getTime();

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
            const hours = Math.floor(
                (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            const minutes = Math.floor(
                (diff % (1000 * 60 * 60)) / (1000 * 60)
            );
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            setTimeLeft({
                days: String(days),
                hours: String(hours).padStart(2, '0'),
                minutes: String(minutes).padStart(2, '0'),
                seconds: String(seconds).padStart(2, '0'),
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, [TARGET_DATE]);

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
    // Top 6 by rank in each league
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

    // Optional league logos (set to asset paths if you want)
    const league1LogoUrl = ''; // e.g. '/owners-league-logo.png'
    const league2LogoUrl = ''; // e.g. '/players-league-logo.png'

    const getSeedNumber = (team, idx) =>
        typeof team.rank === 'number' ? team.rank : idx + 1;
    const getPlayoffSeedNumber = (team, idx) =>
        typeof team.playoffRank === 'number' ? team.playoffRank: idx + 1;


    const getSeedLabel = (seedNum) => `${ordinal(seedNum)} Seed`;

    // "8-5 (.615)" using your record object
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

                <button
                    onClick={handleOpenModal}
                    className="bg-transparent border-2 border-yellow-500 hover:bg-yellow-500 hover:text-gray-900 text-yellow-500 font-semibold py-3 px-8 rounded-full shadow-lg transition duration-200"
                >
                    2025 Playoff Qualifiers →
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

            <p className="text-white text-xl">Until the Playoffs</p>

            {/* Playoff Qualifiers Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
                    <div
                        className={[
                            'bg-white rounded-2xl w-full max-w-7xl mx-4 p-6 relative max-h-[80vh] overflow-y-scroll shadow-2xl',
                            'transform transition-all duration-200 ease-out',
                            animateModal
                                ? 'opacity-100 translate-y-0 scale-100'
                                : 'opacity-0 translate-y-4 scale-95',
                        ].join(' ')}
                    >
                        {/* Close button */}
                        <button
                            onClick={handleCloseModal}
                            className="absolute top-3 right-3 text-white hover:text-gray-700"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 md:h-6 md:w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>

                        {/* Modal Title */}
                        <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2 text-center">
                            2025 Playoff Qualifiers
                        </h2>

                        <p className="text-gray-700 mb-6 text-center text-md md:text-lg">
                            Congratulations to this year's playoff qualifiers! Below are the playoff teams and seeds for both leagues. <strong>Seeds 3-6 will play Week 15, with the top two scoring teams moving on to weeks 16 and 17. The final 4 teams will play a two week battle two determine final results.</strong>
                        </p>

                        {/* STACKED LEAGUE SECTIONS */}
                        <div className="space-y-8">
                            {/* Owners League */}
                            <section
                                className="relative rounded-xl overflow-hidden shadow-lg p-4 md:p-6"
                                style={{
                                    backgroundImage: `url('fftrophy4-min.jpg')`,  // ← your image here
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            >
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-black/40"></div>

                                {/* Content wrapper so text sits above overlay */}
                                <div className="relative z-10">
                                    <div className="flex items-center justify-center gap-3 mb-3 text-white">
                                        {league1LogoUrl && (
                                            <img
                                                src={league1LogoUrl}
                                                alt={`${league1Name} logo`}
                                                className="w-10 h-10 rounded-full object-cover shadow-sm"
                                            />
                                        )}
                                        <h3 className="text-lg md:text-xl font-semibold">{league1Name}</h3>
                                    </div>

                                    {/* GRID of 6 teams */}
                                    <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                                        {ownersQualifiersPO.map((team, idx) => {
                                            const seedNum = getPlayoffSeedNumber(team, idx);
                                            const recordLine = formatRecordLine(team);
                                            const hasBye = seedNum <= 4;

                                            return (
                                                <li
                                                    key={team.teamName}
                                                    className="relative flex flex-col items-center bg-white/90 rounded-lg px-3 py-4 shadow-md text-center"
                                                >
                                                    {/* BYE badge */}
                                                    {hasBye && (
                                                        <span className="absolute top-2 right-2 rounded-full bg-red-700 text-white text-[10px] font-semibold px-2 py-0.5 uppercase tracking-wide">
                                                            BYE
                                                        </span>
                                                    )}

                                                    {/* <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-red-700 text-white text-sm font-bold mb-2">
                                                        {seedNum}
                                                    </span> */}

                                                    <img
                                                        src={team.teamLogo}
                                                        alt={team.teamName}
                                                        className="h-10 w-10 rounded-full object-cover border border-gray-300 shadow-sm mb-2"
                                                    />

                                                    <span className="font-semibold text-gray-900">{team.teamName}</span>
                                                     
                                                    <span className="text-sm text-gray-600">{team.ownerName}</span>
                                                    {recordLine && (
                                                        <span className="text-sm text-gray-600">Record: {recordLine}</span>
                                                    )}
                                                    {/* <span className="mt-2 text-md font-medium uppercase tracking-wide text-red-700">
                                                        {getSeedLabel(seedNum)}
                                                    </span> */}
                                                    <span className="font-normal text-gray-900 mt-2">Current Playoff Points - {team.playoffPoints}</span>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </section>


                            {/* Players League */}
                            <section
                                className="relative rounded-xl overflow-hidden shadow-lg p-4 md:p-6"
                                style={{
                                    backgroundImage: `url('/banner_image2.jpg')`,  // ← your image here
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'top',
                                }}
                            >
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-black/70"></div>

                                <div className="relative z-10">
                                    <div className="flex items-center justify-center gap-3 mb-3 text-white">
                                        {league2LogoUrl && (
                                            <img
                                                src={league2LogoUrl}
                                                alt={`${league2Name} logo`}
                                                className="w-10 h-10 rounded-full object-cover shadow-sm"
                                            />
                                        )}
                                        <h3 className="text-lg md:text-xl font-semibold">{league2Name}</h3>
                                    </div>

                                    <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                                        {playersQualifiersPO.map((team, idx) => {
                                            const seedNum = getPlayoffSeedNumber(team, idx);
                                            const recordLine = formatRecordLine(team);
                                            const hasBye = seedNum <= 2;

                                            return (
                                                <li
                                                    key={team.teamName}
                                                    className="relative flex flex-col items-center bg-white/90 rounded-lg px-3 py-4 shadow-md text-center"
                                                >
                                                    {/* BYE badge */}
                                                    {hasBye && (
                                                        <span className="absolute top-2 right-2 rounded-full bg-red-700 text-white text-[10px] font-semibold px-2 py-0.5 uppercase tracking-wide">
                                                            BYE
                                                        </span>
                                                    )}

                                                    {/* <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-white text-sm font-bold mb-2">
                                                        {seedNum}
                                                    </span> */}

                                                    <img
                                                        src={team.teamLogo}
                                                        alt={team.teamName}
                                                        className="h-10 w-10 rounded-full object-cover border border-gray-300 shadow-sm mb-2"
                                                    />

                                                    <span className="font-semibold text-gray-900">{team.teamName}</span>
                                                    <span className="text-sm  text-gray-600">{team.ownerName}</span>
                                                    
                                                    {recordLine && (
                                                        <span className="text-sm  text-gray-600">Record: {recordLine}</span>

                                                    )}
                                                    <span className="text-sm font-bold text-gray-600">Victory Points: {team.record.victoryPoints}</span>
                                                    {/* <span className="mt-2 text-md font-medium uppercase tracking-wide text-red-700">
                                                        {getSeedLabel(seedNum)}
                                                    </span> */}
                                                    <span className="font-normal text-gray-900 mt-2">Current Playoff Points - {team.playoffPoints}</span>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </section>

                        </div>

                        <div className="mt-8 flex justify-center">
                            <button
                                onClick={handleCloseModal}
                                className="px-6 py-2 rounded-full bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
