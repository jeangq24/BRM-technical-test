import "@/styles/globals.css";
import { Montserrat } from "next/font/google";
import { Toaster } from 'react-hot-toast'
const montserrat = Montserrat({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});
export default function App({ Component, pageProps }) {
  return (

      <main className={montserrat.className}>
        <Component {...pageProps} />
        <Toaster />
      </main>
  
  )
};
