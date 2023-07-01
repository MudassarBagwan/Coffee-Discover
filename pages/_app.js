
import "../styles/globals.css";
import StoreProvider from '../store/store-contex'


function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  );

}

export default MyApp;