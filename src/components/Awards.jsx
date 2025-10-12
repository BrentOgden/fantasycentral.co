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
    { title: "High Points", name: "Justin Gutierrez", details: "276.15 points" },
    { title: 'Tim Tebow "Praise Jesus" Award', name: "Sam Darnold", details: "49 points" },
    { title: 'Big Ben’s "Buy me Dinner First" Award', name: "Tom Courtney", details: "Lost to Justin by 125.35 points" },
    { title: "Pot of Gold Award", name: "Tom Courtney", details: "Lost to Justin 276.15 to 150.8" },
    { title: "Aaron Hernandez Hangin’ Tough Award", name: "Freeman Puthavongsa", details: "Lost to Jeremy by 0.25 points" },
  ];

  const offenseStars = [
    "Sam Darnold - 49 points - 341 passing yards, 4 TDs",
    "Rico Dowdle - 48.95 points - 234 total yards, 1 TDs",
    "Baker Mayfield - 46.75 points - 394 total yards, 2 TDs",
    "Matthew Stafford - 45.25 points - 389 passing yards, 3 TDs"
  ];

  const defenseStars = [
    "New Orleans - 22.75 points - 5 TOs, 1 sacks, 1 TD",
    "Indianapolis - 18 points - 2 TOs, 4 sacks",
    "Detroit - 17.75 points - 3 TOs, 2 sacks",
    "Washington - 17 points - 2 TOs, 5 sacks"
  ];

  return (
    <section className="grid md:grid-cols-2 divide-x p-4">
      {/* Award Winners (fade-in on scroll) */}
      <div className="rounded-sm">
        <h2 className="font-bold text-2xl text-red-700 text-center">
          Week 5 Award Winners
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
          Week 5 Top Performers
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
