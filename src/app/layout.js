import { Inter } from "next/font/google";
import Footer from "../../component/footer/Footer";
import Header from "../../component/header/Header";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MovieMingle",
  description: "Watch movies and enjoy popcorns at ease",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
