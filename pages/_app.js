import '../styles/globals.css';
import { useState, useEffect } from 'react';
import { AnimatePresence } from "framer-motion";
import InitialTransition from '../components/InitialTransition'
import Layout from "../components/Layout";

export default function App({ Component, pageProps, router }) {

  const [isFirstMount, setIsFirstMount] = useState(true);

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
      {isFirstMount && <InitialTransition/>}
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