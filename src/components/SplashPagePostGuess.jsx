// src/components/SplashPagePostGuess.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logoBlack from '../assets/logo2025black.png';

export default function SplashPagePostGuess() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

  const submissions = [
    { name: 'Kristen', wins: 24, runDiff: -250, winPercentage: 0.222, gamesBack: 41 },
    { name: 'Garret', wins: 25, runDiff: -251, winPercentage: 0.224, gamesBack: 46 },
    { name: 'Justin', wins: 28, runDiff: -235, winPercentage: 0.256, gamesBack: 41 },
    { name: 'Brent',  wins: 25, runDiff: -220, winPercentage: 0.230, gamesBack: 40 },
    { name: 'Kyle',   wins: 27, runDiff: -225, winPercentage: 0.250, gamesBack: 27.5 },
    { name: 'Tom',    wins: 26, runDiff: -255, winPercentage: 0.240, gamesBack: 42 },
    { name: 'Jeremy', wins: 30, runDiff: -251, winPercentage: 0.250, gamesBack: 42 },
    { name: 'Met',    wins: 33, runDiff: -270, winPercentage: 0.275, gamesBack: 50 },
    { name: 'Cody',   wins: 20, runDiff: -120, winPercentage: 0.230, gamesBack: 48 },
    { name: 'Freeman',wins: 22, runDiff: -230, winPercentage: 0.240, gamesBack: 35 },
    { name: 'Casey',  wins: 29, runDiff: -243, winPercentage: 0.268, gamesBack: 43.5 },
    { name: 'Nick',   wins: 24, runDiff: -245, winPercentage: 0.222, gamesBack: 39.5 },
  ];

  // Sort by |wins - 28|, then by |runDiff + 277|
  const sortedSubmissions = [...submissions]
    .map(row => ({
      ...row,
      winsDistance: Math.abs(row.wins - 28),
      runDiffDistance: Math.abs(row.runDiff + 277),
    }))
    .sort((a, b) => {
      if (a.winsDistance !== b.winsDistance) {
        return a.winsDistance - b.winsDistance;
      }
      return a.runDiffDistance - b.runDiffDistance;
    });

  // Countdown state...
  const [timeLeft, setTimeLeft] = useState({ days: '0', hours: '00', minutes: '00', seconds: '00' });
  const TARGET_DATE = new Date('2025-09-05T01:20:00Z').getTime();


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
  }, [TARGET_DATE]);

  // Handlers
  const handleEnterClick = () => navigate('/home');
  const handleOpenModal  = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleOpenModal2 = () => setShowModal2(true);
  const handleCloseModal2= () => setShowModal2(false);

  return (
    <div className="relative h-screen w-full bg-gradient-to-br from-red-900 via-black to-orange-700 flex flex-col items-center justify-center px-4 text-center">
      {/* Logo + headline + countdown + buttons */}
      <img src={logoBlack} alt="Fantasy Central Logo" className="w-32 h-32 mb-6" />
      <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
        Welcome to Fantasy Central
      </h1>
      <p className="text-lg md:text-2xl text-indigo-200 mb-8 max-w-2xl">
        Keep up with both leagues all season long… Ready to dominate this season?
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={handleEnterClick}
          className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-3 px-8 rounded-full shadow-lg transition"
        >
          Enter Fantasy Central →
        </button>
        <button
          onClick={handleOpenModal}
          className="bg-transparent border-2 border-yellow-500 hover:bg-yellow-500 hover:text-gray-900 text-yellow-500 font-semibold py-3 px-8 rounded-full shadow-lg transition"
        >
          Draft Order Submissions →
        </button>
      </div>

      <p className="mt-6 font-bold">
        <button
          onClick={handleOpenModal2}
          className="bg-transparent border-2 border-yellow-500 hover:bg-yellow-500 hover:text-gray-900 text-yellow-500 font-semibold py-3 px-8 rounded-full shadow-lg transition"
        >
          2025 Draft Order →
        </button>
      </p>

      <div className="flex space-x-4 text-white mb-4 mt-8 text-center">
        {['Days','Hours','Minutes','Seconds'].map((unit,i) => (
          <div key={unit}>
            <span className="text-5xl font-bold">{Object.values(timeLeft)[i]}</span>
            <div className="uppercase text-sm">{unit}</div>
          </div>
        ))}
      </div>
      <p className="text-white text-xl mb-4">Until Kickoff of the 2025 Season</p>

      {/* Original Submissions Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-2xl w-full max-w-3xl mx-4 p-6 relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              aria-label="Close modal"
            >
              <span className="text-2xl leading-none">&times;</span>
            </button>
            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
              Draft Order Challenge Submissions
            </h2>
            <div className="overflow-x-auto">
              <table className="table-auto w-full border-collapse text-center">
                <thead>
                  <tr className="bg-gray-100 text-black">
                    {['Name','Wins','Run Diff','Win %','Games Back'].map(h => (
                      <th key={h} className="px-4 py-2 border-b">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-black">
                  {submissions.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-2 border-b">{row.name}</td>
                      <td className="px-4 py-2 border-b">{row.wins}</td>
                      <td className="px-4 py-2 border-b">{row.runDiff}</td>
                      <td className="px-4 py-2 border-b">{row.winPercentage.toFixed(3)}</td>
                      <td className="px-4 py-2 border-b">{row.gamesBack}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Sorted Submissions Modal */}
      {showModal2 && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-2xl w-full max-w-3xl mx-4 p-6 relative">
            <button
              onClick={handleCloseModal2}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              aria-label="Close modal"
            >
              <span className="text-2xl leading-none">&times;</span>
            </button>
            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
              2025 Draft Order
            </h2>
            <p className='text-center pb-6 text-gray-700'>Picks were determined by proximity (over/under) to the total # of Rockies wins <strong>(28)</strong>. For the people tied in distance over/under, the tiebreaker was used - closest to run differential <strong>(-277)</strong>. </p>
            <div className="overflow-x-auto">
              <table className="table-auto w-full border-collapse text-center">
                <thead>
                  <tr className="bg-gray-100 text-black">
                    {['Draft Pick', 'Name','Wins','Run Diff'].map(h => (
                      <th key={h} className="px-4 py-2 border-b">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-black">
                  {sortedSubmissions.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-2 border-b">#{idx + 1}</td> 
                      <td className="px-4 py-2 border-b">{row.name}</td>
                      <td className="px-4 py-2 border-b">{row.wins}</td>
                      <td className="px-4 py-2 border-b">{row.runDiff}</td>
                      
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
