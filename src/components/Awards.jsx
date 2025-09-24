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
    { title: "High Points", name: "Kyle Kohlscheen", details: "210.35 points" },
    { title: 'Tim Tebow "Praise Jesus" Award', name: "Tre Tucker", details: "52.95 points" },
    { title: 'Big Ben’s "Buy me Dinner First" Award', name: "Nick Hazen", details: "Lost to Brent by 66.4 points" },
    { title: "Pot of Gold Award", name: "Justin Gutierrez", details: "Lost to Kyle 210.35 to 171.45" },
    { title: "Aaron Hernandez Hangin’ Tough Award", name: "Kristen Hazen", details: "Lost to Met by 14.3 points" },
  ];

  const offenseStars = [
    "Tre Tucker - 52.95 points - 145 receiving yards, 3 TDs",
    "Caleb Williams - 50.45 points - 310 total yards, 4 TDs",
    "Geno Smith - 44 points - 289 passing yards, 3 TDs",
    "Jonathan Taylor - 43.85 points - 118 total yards, 3 TDs"
  ];

  const defenseStars = [
    "Minnesota - 39.25 points - 5 TOs, 4 sacks, 2 TD",
    "Pittsburgh - 25.25 points - 5 TOs, 5 sacks",
    "Tampa Bay - 22 points - 2 TOs, 4 sacks, 1 TD",
    "Indianapolis - 21 points - 1 TOs, 4 sacks, 1 TD"
  ];

  return (
    <section className="grid md:grid-cols-2 divide-x p-4">
      {/* Award Winners (fade-in on scroll) */}
      <div className="rounded-sm">
        <h2 className="font-bold text-2xl text-red-700 text-center">
          Week 3 Award Winners
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
          Week 3 Top Performers
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
