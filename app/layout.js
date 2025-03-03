import localFont from "next/font/local";
import "./globals.css";
import ReduxProvider from '../store/reduxProvider';
import Footer from "@/components/Footer";


const quicksand = localFont({
  src: "./fonts/QuicksandVariableFont.woff",
  variable: "--font-quicksand",
});

export const metadata = {
  title: 'Mahalaxmi Opticals',
  description: 'Mahalaxmi Optical Traders',
};

export default function RootLayout({ children }) {
  return (
    <ReduxProvider>
      <html lang="en">
        <body className={`${quicksand.variable}  antialiased`}>
          
          {children}
          <Footer />
        </body>
      </html>
    </ReduxProvider>
  );
}
