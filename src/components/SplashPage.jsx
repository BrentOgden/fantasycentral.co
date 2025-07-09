// src/components/SplashPage.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';
import logoBlack from '../assets/logo2025black.png';

export default function SplashPage() {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    // ─── Form state ──────────────────────────────────────────────────────────
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        wins: '',
        runDiff: '',
        winPercentage: '',
        gamesBack: '',
    });

    // ─── Countdown state ─────────────────────────────────────────────────────
    const [timeLeft, setTimeLeft] = useState({
        days: '0',
        hours: '00',
        minutes: '00',
        seconds: '00',
    });

    // 1) Change this target date/time as needed (UTC)
    const TARGET_DATE = new Date('2025-08-23T18:00:00Z').getTime();

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
    }, [TARGET_DATE]);

    // ─── Navigation / Modal toggles ───────────────────────────────────────────
    const handleEnterClick = () => {
        navigate('/home');
    };
    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    // ─── Handle form field changes ────────────────────────────────────────────
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // ─── Handle form submission via EmailJS ──────────────────────────────────
    const handleSubmit = (e) => {
        e.preventDefault();

        const serviceID = 'service_nnyc6kk';       // your Service ID
        const templateID = 'template_wnnpzus';     // your Template ID
        const userID = 'z5I93C69PJur8wDNK';        // your User ID

        const templateParams = {
            from_name: formData.name,
            from_email: formData.email,
            wins: formData.wins,
            run_diff: formData.runDiff,
            win_percentage: formData.winPercentage,
            games_back: formData.gamesBack,
        };

        emailjs.send(serviceID, templateID, templateParams, userID)
            .then(
                () => {
                    // clear form and close modal
                    setFormData({
                        name: '',
                        email: '',
                        wins: '',
                        runDiff: '',
                        winPercentage: '',
                        gamesBack: '',
                    });
                    handleCloseModal();
                    alert('Thanks! Your submission was sent.');
                },
                (error) => {
                    console.error('EmailJS error:', error);
                    alert('Oops, something went wrong. Please try again.');
                }
            );
    };

    return (
        <div className="relative h-screen w-full bg-gradient-to-br from-red-900 via-black to-orange-700 flex flex-col items-center justify-center px-4 text-center">
            {/* Logo */}
            <img src={logoBlack} alt="Fantasy Central Logo" className="w-32 h-32 mb-6" />

            {/* Headline */}
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                Welcome to Fantasy Central
            </h1>

            {/* Sub-headline */}
            <p className="text-lg text-center md:text-2xl text-indigo-200 mb-8 max-w-2xl">
                Keep up with both leagues all season long. Track all-time records, updated stats,
                weekly awards and much more. Ready to dominate this season?
            </p>

            {/* “Enter” + “Sign Up” buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
                <button
                    onClick={handleEnterClick}
                    className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-3 px-8 rounded-full shadow-lg transition duration-200"
                >
                    Enter Fantasy Central →
                </button>
                <button
                    onClick={handleOpenModal}
                    className="bg-transparent border-2 border-yellow-500 hover:bg-yellow-500 hover:text-gray-900 text-yellow-500 font-semibold py-3 px-8 rounded-full shadow-lg transition duration-200"
                >
                    Draft Order Challenge →
                </button>
            </div>

            <p className="mt-6 font-bold">
                Guesses must be submitted by{' '}
                <span className="text-yellow-500">MIDNIGHT</span> on{' '}
                <span className="text-yellow-500">7/3</span>
            </p>

            {/* ─── Countdown Display ─────────────────────────────────────────────── */}
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
            <p className=' text-white text-xl'>Until Draft Day</p>
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-2xl w-full max-w-lg mx-4 p-6 relative">
                        {/* Close button */}
                        <button
                            onClick={handleCloseModal}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Form Title & Description */}
                        <h2 className="text-lg md:text-2xl font-semibold text-gray-800 mb-1 md:mb-4 text-center">
                            Draft Order Challenge
                        </h2>
                        <p className="text-gray-800 mb-6 text-sm md:text-md">
                            In order to determine draft order for the upcoming season we will be using the
                            Rockies record-breaking failures as a starting point. Make your best guess as to how
                            many <strong>WINS</strong> the Rockies will have by <strong>August 1st</strong>. For
                            tiebreaker purposes, also guess their <strong>run-differential</strong>,{' '}
                            <strong>winning %</strong> and how many <strong>games out of 1st place</strong> they
                            will be by August 1st. Picks will be determined in order of how close your guesses
                            come to the actual numbers.
                        </p>

                        {/* Modal Form */}
                        <form onSubmit={handleSubmit} className="max-h-screen grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Name Field */}
                            <div>
                                <label htmlFor="name" className="block text-gray-700 mb-1">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full border text-black border-gray-300 rounded-lg px-1 py-1 md:px-3 md:py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            {/* Email Field */}
                            <div>
                                <label htmlFor="email" className="block text-gray-700 mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full border text-black border-gray-300 rounded-lg px-1 py-1 md:px-3 md:py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            {/* Rockies Wins (by 8/1) */}
                            <div>
                                <label htmlFor="wins" className="block text-gray-700 mb-1">
                                    Rockies Wins (by 8/1)
                                </label>
                                <input
                                    type="text"
                                    id="wins"
                                    name="wins"
                                    value={formData.wins}
                                    onChange={handleChange}
                                    required
                                    className="w-full border text-black border-gray-300 rounded-lg px-1 py-1 md:px-3 md:py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            {/* Run Differential */}
                            <div>
                                <label htmlFor="runDiff" className="block text-gray-700 mb-1">
                                    Run Differential (by 8/1)
                                </label>
                                <input
                                    type="text"
                                    id="runDiff"
                                    name="runDiff"
                                    value={formData.runDiff}
                                    onChange={handleChange}
                                    required
                                    className="w-full border text-black border-gray-300 rounded-lg px-1 py-1 md:px-3 md:py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            {/* Rockies Winning % */}
                            <div>
                                <label htmlFor="winPercentage" className="block text-gray-700 mb-1">
                                    Rockies Winning % (by 8/1)
                                </label>
                                <input
                                    type="text"
                                    id="winPercentage"
                                    name="winPercentage"
                                    value={formData.winPercentage}
                                    onChange={handleChange}
                                    required
                                    className="w-full border text-black border-gray-300 rounded-lg px-1 py-1 md:px-3 md:py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            {/* Games Back */}
                            <div>
                                <label htmlFor="gamesBack" className="block text-gray-700 mb-1">
                                    Games out of 1st (by 8/1)
                                </label>
                                <input
                                    type="text"
                                    id="gamesBack"
                                    name="gamesBack"
                                    value={formData.gamesBack}
                                    onChange={handleChange}
                                    required
                                    className="w-full border text-black border-gray-300 rounded-lg px-1 py-1 md:px-3 md:py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            {/* Submit Button (spans both columns) */}
                            <button
                                type="submit"
                                className="sm:col-span-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition duration-200"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
