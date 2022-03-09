import { motion } from "framer-motion";
import { useState } from 'react';
import { FSplitText } from "../low/FSplitText";

const content = {
  initial: {
    opacity: 1
  },
  animate: {
    opacity: 0,
    transition: {
      when: "afterChildren"
    }
  }
};

const blackBoxTop = {
  initial: {
    height: "60%",
    top: 0,
    opacity: 1
  },
  animate: {
    height: "4rem",
    opacity: [ 1, 1, 1, 0],
    transition: {
      delay: 1,
      duration: 3,
      ease: [0.87, 0, 0.13, 1],
    },
  },
};

const blackBoxBottom = {
  initial: {
    height: "60%",
    bottom: 0,
    opacity: 1
  },
  animate: {
    height: "3rem",
    opacity: [ 1, 1, 1, 0],
    transition: {
      delay: 1,
      duration: 3,
      ease: [0.87, 0, 0.13, 1],
    },
  },
};

const text = {
  animate: i => ({
    opacity: [0, 1, 1, 0],
    y: [0, 0, 0, -50],
    transition: {
      duration: 2 + Math.random(),
      ease: [0.87, 0, 0.83, 1]
    }
  })
}

export default function InitialTransition() {

  useState(() => {
    typeof windows !== "undefined" && window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      className=""
      initial="initial"
      animate="animate"
      variants={content}
      onAnimationStart={() => document.body.classList.add("overflow-hidden")}
      onAnimationComplete={() =>
        document.body.classList.remove("overflow-hidden")
      }
    >
      <motion.div
        className="absolute z-50 flex items-center justify-center w-full bg-color_A"
        variants={blackBoxTop}
      >
        <FSplitText
          className="text-xl md:text-4xl text-color_E font-font_B"
          variants={text}
        >
          Добро пожаловать
        </FSplitText>

      </motion.div>

      <motion.div
        className="absolute z-50 flex items-center justify-center w-full bg-color_A"
        variants={blackBoxBottom}
      >
      </motion.div>

    </motion.div>
  );
};