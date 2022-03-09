import Head from 'next/head'
import FFormRegistration from '../components/middle/FFormRegistration'; 
import { motion } from "framer-motion";

const content = (isFirstMount) => ({
  animate: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: isFirstMount ? 2.8 : 0
    },
  },
});

export default function Registration({ isFirstMount }) {
  return (
    <div
      className="flex-1"
    >
      <Head>
        <title>Регистрация</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <motion.div
        initial="initial"
        animate="animate"
        variants={content(isFirstMount)}
      >
        <FFormRegistration />
      </motion.div>
    </div>
  )
}
