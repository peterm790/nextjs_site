import '../styles/globals.css'
import {useEffect} from "react";
import ReactGA from "react-ga";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if(process.env.googleAnalyticsID && process.env.NODE_ENV === "production") { // Checks for GA ID and only turns on GA in production
      ReactGA.initialize(process.env.googleAnalyticsID);
      ReactGA.pageview(window.location.pathname + window.location.search);
    }
  });
  return <Component {...pageProps} />
}

export default MyApp
