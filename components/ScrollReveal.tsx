"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none" | "zoom" | "flip";
}

export default function ScrollReveal({ 
  children, 
  delay = 0, 
  className = "",
  direction = "up"
}: ScrollRevealProps) {
  
  const getInitial = () => {
    switch (direction) {
      case "up": return { opacity: 0, y: 80, scale: 0.95 };
      case "down": return { opacity: 0, y: -80, scale: 0.95 };
      case "left": return { opacity: 0, x: 80, scale: 0.95 };
      case "right": return { opacity: 0, x: -80, scale: 0.95 };
      case "zoom": return { opacity: 0, scale: 0.5 };
      case "flip": return { opacity: 0, rotateX: -90 };
      case "none": return { opacity: 0 };
    }
  };

  return (
    <motion.div
      initial={getInitial()}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, rotateX: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        type: "spring",
        bounce: 0.4,
        duration: 1.2, 
        delay 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
