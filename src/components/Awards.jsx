// src/components/Awards.jsx

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IoMdStar } from 'react-icons/io';
import '../customCss/Awards.css';

// ─── Fade-in variants ─────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.6 } }
};
const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

/**
 * Marquee: 
 * - On mobile (≤640px) it simply renders children statically.
 * - On desktop it measures one “track” of children, duplicates it,
 *   and animates x from 0 → –trackWidth in a loop.
 */

export default function Awards() {
  const awards = [
    { title: "High Points", name: "Casey Splane", details: "211.65 points" },
    { title: 'Tim Tebow "Praise Jesus" Award', name: "Jamar Chase", details: "80.8 points" },
    { title: 'Big Ben’s "Buy me Dinner First" Award', name: "Freeman Puthavongsa", details: "Lost to Casey by 67.45 points" },
    { title: "Pot of Gold Award", name: "Freeman Puthavongsa", details: "Lost to Casey 211.65 to 144.2" },
    { title: "Aaron Hernandez Hangin’ Tough Award", name: "Kristen Hazen", details: "Lost to Justin by 10.35 points" },
  ];

  const offenseStars = [
    "Jamar Chase - 80.8 points - 264 receiving yards, 3 TDs",
    "Joe Burrow - 76 points - 428 passing yards, 4 TDs",
    "Lamar Jackson - 59.05 points - 323 total yards, 4 TDs",
    "Brock Purdy - 43.7 points - 370 total yards, 2 TDs"
  ];

  const defenseStars = [
    "Buffalo - 25.25 points - 4 TOs, 4 sacks, 1 TD",
    "Philadelphia - 23.75 points - 5 TOs, 3 sacks",
    "New England - 22.25 points - 9 sacks",
    "Los Angeles Chargers - 17.25 points - 7 sacks"
  ];

  return (
    <section className="grid md:grid-cols-2 divide-x p-4">
      {/* Award Winners (fade-in on scroll) */}
      <div className="rounded-sm">
        <h2 className="font-bold text-2xl text-red-700 text-center">
          Week 10 Award Winners
        </h2>
        <motion.div
          className="grid-container"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {awards.map((award, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="grid-column my-2 md:my-0 rounded-sm award-weekly bg-white flex-item"
            >
              <h3 className='bg-gradient-to-r from-red-900 via-black to-red-700'>{award.title}</h3>
              <p>
                {award.name}
                <br />
                <span className="awardtotal">{award.details}</span>
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Top Performers (fade-in on scroll) */}
      <motion.div
        className="mr-4 pl-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2 className="font-bold text-2xl text-red-700 text-center">
          Week 10 Top Performers
        </h2>
        <motion.div
          className="grid grid-cols-2 gap-2 pt-5"
          variants={containerVariants}
        >
          {offenseStars.map((text, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="flex items-center bg-white p-2 mb-2 rounded shadow-xl"
            >
              <IoMdStar className="h-6 w-6 flex-shrink-0 text-red-800 animate-bounce mr-3" />
              <span className="text-gray-900">{text}</span>
            </motion.div>
          ))}
          {defenseStars.map((text, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="flex items-center bg-white p-2 mb-2 rounded shadow-xl"
            >
              <IoMdStar className="h-6 w-6 flex-shrink-0 text-red-800 animate-bounce mr-3" />
              <span className="text-gray-900">{text}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
