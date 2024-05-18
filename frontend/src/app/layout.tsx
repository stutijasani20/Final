"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Provider } from "react-redux";
import "../app/globals.css";
import { useEffect } from "react";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../app/store/store";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { url } from "inspector";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
const inter = Inter({ subsets: ["latin"] });




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const admin = pathname.includes("airport_staff");
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Elegance Air</title>
      </head>
      <body className={inter.className}>
        <Provider store={store}>
        {!admin && <Navbar />} 
          <PersistGate loading={null} persistor={persistor}>
            {children}
        {!admin && <Footer />}
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
