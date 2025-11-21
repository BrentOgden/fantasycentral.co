// src/components/Awards.jsx

import React from 'react';
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

export default function Awards() {
  const awards = [
    { title: "High Points", name: "Kyle Kohlscheen", details: "234.4 points" },
    { title: 'Tim Tebow "Praise Jesus" Award', name: "Josh Allen", details: "68.5 points" },
    { title: 'Big Ben’s "Buy me Dinner First" Award', name: "Casey Splane", details: "Lost to Justin by 56 points" },
    { title: "Pot of Gold Award", name: "Garret Weber", details: "Lost to Kyle 234.4 to 197.2" },
    { title: "Aaron Hernandez Hangin’ Tough Award", name: "Jeremy Ogden", details: "Lost to Tom by 9.25 points" },
  ];

  const offenseStars = [
    "Josh Allen - 68.5 points - 357 total yards, 6 TDs",
    "Bryce Young - 57.15 points - 448 passing yards, 3 TDs",
    "Jacoby Brissett - 52.3 points - 452 passing yards, 2 TDs",
    "Sean Tucker - 45.15 points - 140 total yards, 3 TDs"
  ];

  const defenseStars = [
    "Pittsburgh - 23 points - 2 TOs, 1 sacks, 2 TD",
    "Cleveland - 22.75 points - 3 TOs, 5 sacks, 1 TD",
    "Dallas - 16 points - 1 TOs, 4 sacks",
    "Baltimore - 14.25 points - 1 TOs, 3 sacks"
  ];

  return (
    <section className="grid md:grid-cols-2 divide-x p-4">
      {/* Award Winners (fade-in on scroll) */}
      <div className="rounded-sm">
        <h2 className="font-bold text-2xl text-red-700 text-center">
          Week 11 Award Winners
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
              <h3 className="bg-gradient-to-r from-red-900 via-black to-red-700">
                {award.title}
              </h3>
              <p>
                {award.name}
                <br />
                <span className="awardtotal">{award.details}</span>
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Top Performers (Offense vs Defense, separated) */}
      <motion.div
        className="mr-4 pl-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2 className="font-bold text-2xl text-red-700 text-center">
          Week 11 Top Performers
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-5">
          {/* OFFENSE */}
          <motion.div variants={containerVariants}>
            <h3 className="text-lg font-semibold text-gray-900 text-center md:text-left border-b border-red-800 pb-2">
              Offense
            </h3>
            <div className="mt-3 space-y-2">
              {offenseStars.map((text, i) => (
                <motion.div
                  key={`off-${i}`}
                  variants={itemVariants}
                  className="flex items-center bg-white p-2 rounded shadow-xl"
                >
                  <IoMdStar className="h-6 w-6 flex-shrink-0 text-red-800 animate-bounce mr-3" />
                  <span className="text-gray-900">{text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* DEFENSE */}
          <motion.div variants={containerVariants}>
            <h3 className="text-lg font-semibold text-gray-900 text-center md:text-left border-b border-red-800 pb-2">
              Defense
            </h3>
            <div className="mt-3 space-y-2">
              {defenseStars.map((text, i) => (
                <motion.div
                  key={`def-${i}`}
                  variants={itemVariants}
                  className="flex items-center bg-white p-2 rounded shadow-xl"
                >
                  <IoMdStar className="h-6 w-6 flex-shrink-0 text-red-800 animate-bounce mr-3" />
                  <span className="text-gray-900">{text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
