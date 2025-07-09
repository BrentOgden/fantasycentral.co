// src/components/PawDivider.jsx
import React from 'react';
import { FaPaw } from 'react-icons/fa';
import { IoMdAmericanFootball } from "react-icons/io";

export default function FootballDivider({ count = 8, size = '1.5rem', color = '#CBD5E0' }) {
  return (
    <div className="flex justify-center my-8 space-x-2">
      {Array.from({ length: count }).map((_, i) => (
        <IoMdAmericanFootball
          key={i}
          size={size}
          color={color}
        />
      ))}
    </div>
  );
}
