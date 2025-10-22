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
    { title: "High Points", name: "Brent Ogden", details: "246.35 points" },
    { title: 'Tim Tebow "Praise Jesus" Award', name: "Justin Herbert", details: "55.6 points" },
    { title: 'Big Ben’s "Buy me Dinner First" Award', name: "Freeman Puthavongsa", details: "Lost to Justin by 97.25 points" },
    { title: "Pot of Gold Award", name: "Tom Courtney", details: "Lost to Brent 246.35 to 161.05" },
    { title: "Aaron Hernandez Hangin’ Tough Award", name: "Met Nagatani", details: "Lost to Nick by 5.1 points" },
  ];

  const offenseStars = [
    "Justin Herbert - 55.6 points - 451 total yards, 3 TDs",
    "Jahmyr Gibbs - 53.65 points - 218 total yards, 2 TDs",
    "Bo Nix - 51.05 points - 327 total yards, 4 TDs",
    "Christian McCaffery - 50.7 points - 201 total yards, 2 TDs"
  ];

  const defenseStars = [
    "Cleveland - 27.5 points - 4 TOs, 4 sacks, 1 TD",
    "Houston - 24.25 points - 4 TOs, 2 sacks, 1 TD",
    "New England - 22.5 points - 2 TOs, 5 sacks, 1 TD",
    "Chicago - 21.25 points - 4 TOs, 4 sacks"
  ];

  return (
    <section className="grid md:grid-cols-2 divide-x p-4">
      {/* Award Winners (fade-in on scroll) */}
      <div className="rounded-sm">
        <h2 className="font-bold text-2xl text-red-700 text-center">
          Week 7 Award Winners
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
          Week 7 Top Performers
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
