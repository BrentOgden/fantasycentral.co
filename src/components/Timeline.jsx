// src/components/Timeline.jsx

import React from 'react';
import { motion } from 'framer-motion';
import '../customCss/Timeline.css';

// Stagger container so each child comes in one after the other
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      // start children one after another, with a slight overlap
      staggerChildren: 0.25,
      when: 'beforeChildren',
    }
  }
};

// Each entry will spring up from below
const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    transition: { duration: 0.4, ease: 'easeOut' }
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 20
    }
  }
};

export default function Timeline({ data }) {
  return (
    <motion.div
      className="timeline"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {data.map((entry, index) => (
        <motion.div
          key={index}
          className={`timeline-entry ${index % 2 === 0 ? 'left' : 'right'}`}
          variants={itemVariants}
          // subtle grow on hover for extra polish
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 150, damping: 25 }}
        >
          <div className="timeline-content">
            <div className="timeline-date">{entry.date}</div>
            {entry.event}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
