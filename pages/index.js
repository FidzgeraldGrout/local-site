import Head from 'next/head';
import FHeadSelf from '../components/FHeadSelf';
import React from "react";
import { motion } from "framer-motion";

const content = (isFirstMount) => ({
  animate: {
    transition: { 
      staggerChildren: 0.1, 
      delayChildren: isFirstMount ? 2.8 : 0 },
  },
});

export default function Index({ isFirstMount }) {

  return (
    <div
      className="flex-1"
      key="Index"
    >
      <Head>
        <title>Портфолио</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <motion.div
        initial="initial"
        animate="animate"
        variants={content(isFirstMount)}
      >
        <FHeadSelf />
      </motion.div>
    </div>
  )
}
