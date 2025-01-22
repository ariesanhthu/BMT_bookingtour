import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./components/theme-provider";

import Footer from "./components/footer/Footer";
import ContactBar from "./components/contactbar/ContactBar"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blue Moon Light",
  description: "Đồng hành cùng chuyến đi của bạn",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <ContactBar/>
          <Footer/>
      </ThemeProvider>
      </body>
    </html>
  );
}
