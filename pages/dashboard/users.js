import Head from 'next/head'
// import FFormProfile from '../../components/middle/FFormProfile';
import { motion } from "framer-motion";
import catchAuthServer from '../../middleware/authServer';

const content = (isFirstMount) => ({
  animate: {
    transition: {
      staggerChildren: isFirstMount ? 0.5 : 0.15
    }
  }
});

export default function Users({ isFirstMount }) {
  return (
    <div
      className="flex-1"
    >
      <Head>
        <title>Активация</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <motion.section exit={{ opacity: 0 }}>
        <motion.div
          initial="initial"
          animate="animate"
          variants={content(isFirstMount)}
        >
          {/* <FFormProfile /> */}
          Пользователи
        </motion.div>
      </motion.section>
    </div>
  )
}

export const getServerSideProps = catchAuthServer( async(context) => {
  
  return {
    props: {}
  }

} )