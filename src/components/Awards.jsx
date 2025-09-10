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
    { title: "High Points", name: "Kyle Kohlscheen", details: "221.6 points" },
    { title: 'Tim Tebow "Praise Jesus" Award', name: "Josh Allen", details: "60.5 points" },
    { title: 'Big Ben’s "Buy me Dinner First" Award', name: "Kristen Hazen", details: "Lost to Tom by 70.5 points" },
    { title: "Pot of Gold Award", name: "Cody Box", details: "Lost to Kyle 221.6 to 163.45" },
    { title: "Aaron Hernandez Hangin’ Tough Award", name: "Met Nagatani", details: "Lost to Justin by 0.35 points" },
  ];

  const offenseStars = [
    "Josh Allen - 60.5 points - 424 total yards, 4 TDs",
    "Justin Herbert - 48.95 points - 350 total yards, 3 TDs",
    "Michael Penix Jr. - 41.6 points - 319 total yards, 2 TDs",
    "Aaron Rodgers - 40.15 points - 244 passing yards, 4 TDs"
  ];

  const defenseStars = [
    "Denver - 22 points - 2 TOs, 6 sacks",
    "Chicago - 17.25 points - 1 TOs, 3 sacks, 1 TD",
    "Indianapolis - 16.25 points - 3 TOs, 3 sacks",
    "New Orleans - 15.25 points - 5 sacks"
  ];

  return (
    <section className="grid md:grid-cols-2 divide-x p-4">
      {/* Award Winners (fade-in on scroll) */}
      <div className="rounded-sm">
        <h2 className="font-bold text-2xl text-red-700 text-center">
          Week 1 Award Winners
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
          Week 1 Top Performers
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
