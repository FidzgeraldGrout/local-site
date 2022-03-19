import Head from 'next/head'
import FFormLogin from '../../components/middle/FFormLogin';
import { motion } from "framer-motion";

const content = (isFirstMount) => ({
  animate: {
    transition: {
      staggerChildren: isFirstMount ? 0.5 : 0.15,
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
      <motion.section exit={{ opacity: 0 }}>
        <motion.div
          initial="initial"
          animate="animate"
          variants={content(isFirstMount)}
        >
          <FFormLogin />
        </motion.div>
      </motion.section>
    </div>
  )
}
