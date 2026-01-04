import React, { useState, useEffect } from 'react';

export default function OlympicMedalGuessModal({ isOpen, onClose, countdownDate, formEndpoint }) {
  const [name, setName] = useState('');
  const [gold, setGold] = useState('');
  const [silver, setSilver] = useState('');
  const [bronze, setBronze] = useState('');
  const [totalMedals, setTotalMedals] = useState('');
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: '00', minutes: '00', seconds: '00' });
  const [submitting, setSubmitting] = useState(false);

  // Countdown timer
  useEffect(() => {
    if (!countdownDate) return;
    const target = new Date(countdownDate).getTime();

    const interval = setInterval(() => {
      const now = Date.now();
      const diff = target - now;

      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: '00', minutes: '00', seconds: '00' });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({
        days,
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0'),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [countdownDate]);

  if (!isOpen) return null;

  // Disable submission if countdown is over
  const isLocked = countdownDate && Date.now() > new Date(countdownDate).getTime();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLocked) return;

    setSubmitting(true);

    try {
      const response = await fetch(formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          gold,
          silver,
          bronze,
          totalMedals,
        }),
      });

      if (!response.ok) throw new Error('Submission failed');

      alert('Guess submitted successfully!');
      setName('');
      setGold('');
      setSilver('');
      setBronze('');
      setTotalMedals('');
      onClose();
    } catch (err) {
      console.error(err);
      alert('Error submitting form. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className="bg-white rounded-2xl w-full max-w-lg mx-4 p-6 relative shadow-2xl text-slate-700">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-transparent text-gray-700 hover:text-gray-900"
        >
          &times;
        </button>

        <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4 text-center">
          Olympic Draft Order Challenge
        </h2>
        <p className='mb-6'>Submit your guesses for how many medals the U.S. will win during this year's Winter Olympics. Gold medal totals will be used first, and then the other totals will serve as tiebreakers. <span className='text-sm font-bold italic'>**Closest to the actual number above or below.</span></p>

        {countdownDate && (
          <p className={`text-center mb-4 font-semibold ${isLocked ? 'text-gray-500' : 'text-red-700'}`}>
            Time remaining: {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
          </p>
        )}

        {isLocked ? (
          <p className="text-center text-gray-500 font-semibold">
            Submissions are now closed!
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border px-3 py-2 rounded-lg w-full  text-gray-700"
              required
            />
            <input
              type="number"
              placeholder="Total Gold Medals"
              value={gold}
              onChange={(e) => setGold(e.target.value)}
              className="border px-3 py-2 rounded-lg w-full  text-slate-700"
              min="0"
              required
            />
            <input
              type="number"
              placeholder="Total Silver Medals"
              value={silver}
              onChange={(e) => setSilver(e.target.value)}
              className="border px-3 py-2 rounded-lg w-full  text-slate-700"
              min="0"
              required
            />
            <input
              type="number"
              placeholder="Total Bronze Medals"
              value={bronze}
              onChange={(e) => setBronze(e.target.value)}
              className="border px-3 py-2 rounded-lg w-full  text-slate-700"
              min="0"
              required
            />
            <input
              type="number"
              placeholder="Total Overall Medals"
              value={totalMedals}
              onChange={(e) => setTotalMedals(e.target.value)}
              className="border px-3 py-2 rounded-lg w-full  text-slate-700"
              min="0"
              required
            />

            <button
              type="submit"
              disabled={submitting}
              className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-2 px-4 rounded-full transition"
            >
              {submitting ? 'Submitting...' : 'Submit Guess'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
