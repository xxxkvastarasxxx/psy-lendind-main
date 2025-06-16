"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function SparkleEffects({ count = 15 }) {
  const [sparkles, setSparkles] = useState<Array<{
    id: number;
    left: string;
    top: string;
    duration: number;
    delay: number;
  }>>([]);

  useEffect(() => {
    // Generate sparkles only on the client side to avoid hydration issues
    const newSparkles = Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 3,
    }));
    setSparkles(newSparkles);
  }, [count]);

  return (
    <>
      {sparkles.map((sparkle) => (
        <motion.div
          key={`sparkle-${sparkle.id}`}
          className="absolute w-1 h-1 bg-mint-400/60 rounded-full"
          style={{
            left: sparkle.left,
            top: sparkle.top,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: sparkle.duration,
            repeat: Number.POSITIVE_INFINITY,
            delay: sparkle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
}
