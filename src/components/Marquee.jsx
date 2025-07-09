// src/components/Marquee.jsx

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../customCss/Awards.css'; // contains the marquee CSS below

export default function Marquee({ children, speed = 50 }) {
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);
  const trackRef     = useRef(null);

  const [trackWidth, setTrackWidth]         = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  // 1) detect mobile
  useEffect(() => {
    const mq       = window.matchMedia('(max-width: 640px)');
    const handler  = e => setIsMobile(e.matches);
    setIsMobile(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // 2) measure track + container when not mobile
  useEffect(() => {
    if (!isMobile && trackRef.current && containerRef.current) {
      setTrackWidth(trackRef.current.scrollWidth);
      setContainerWidth(containerRef.current.offsetWidth);
    }
  }, [children, isMobile]);

  // 3) mobile fallback: render normally
  if (isMobile) return <>{children}</>;

  // 4) compute full scroll distance
  const scrollDistance = trackWidth + containerWidth;

  return (
    <div className="marquee-container" ref={containerRef}>
      <motion.div
        className="marquee-content"
        animate={{ x: [0, -scrollDistance] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: scrollDistance / speed,
            ease: 'linear'
          }
        }}
      >
        {/* first copy + gap = marginRight */}
        <div
          ref={trackRef}
          className="marquee-track"
          style={{ marginRight: `${containerWidth}px` }}
        >
          {children}
        </div>
        {/* second copy */}
        <div className="marquee-track" aria-hidden="true">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
