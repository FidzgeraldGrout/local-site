export default function App({ Component, pageProps }) {
  return <>
      <main className="pt-5">
          <Component {...pageProps} />
      </main>
  </>
}