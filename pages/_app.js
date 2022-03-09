import '../styles/globals.css';
import { useState, useEffect } from 'react';
import { AnimatePresence } from "framer-motion";
import InitialTransition from '../components/hight/InitialTransition'
import Layout from "../components/hight/Layout";
import Custom404 from './404';

export default function App({ Component, pageProps, router }) {

  const [isFirstMount, setIsFirstMount] = useState(Component != Custom404);

  useEffect(() => {

    const handleRouteChange = () => {
      isFirstMount && setIsFirstMount(false);
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };

  }, []);

  return (
    <AnimatePresence exitBeforeEnter>
      {isFirstMount && <InitialTransition />}
        <Layout
          key="Layout"
        >
          <Component
            isFirstMount={isFirstMount}
            key={router.route}
            {...pageProps}
          />
        </Layout>
    </AnimatePresence>
  )
}