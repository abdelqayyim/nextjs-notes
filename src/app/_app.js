// pages/_app.js
import { AppProvider } from './AppContext'; // Adjust the import path
import '../styles/globals.css'; // Import your global styles

function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  );
}

export default MyApp;
