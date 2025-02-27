import localFont from "next/font/local";
import "./globals.css";
import ReduxProvider from '../store/reduxProvider';
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import TopBar from "@/components/TopBar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: 'Mahalaxmi Opticals',
  description: 'Mahalaxmi Optical Traders',
};

export default function RootLayout({ children }) {
  return (
    <ReduxProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          {/* <TopBar />
          <Navbar /> */}
          {children}
          {/* <Footer /> */}
        </body>
      </html>
    </ReduxProvider>
  );
}
