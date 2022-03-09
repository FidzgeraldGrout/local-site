import Head from 'next/head'
import FFormLogin from '../components/middle/FFormLogin';
import { motion } from "framer-motion";

const content = (isFirstMount) => ({
  animate: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: isFirstMount ? 2.8 : 0
    },
  },
});

export default function Login({ isFirstMount }) {
  return (
    <div
      className="flex-1"
    >
      <Head>
        <title>Авторизация</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <motion.div
        initial="initial"
        animate="animate"
        variants={content(isFirstMount)}
      >
        <FFormLogin />
      </motion.div>
    </div>
  )
}
