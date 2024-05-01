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
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Elegance Air</title>
      </head>
      <body className={inter.className}>
        <Provider store={store}>
          <Navbar />
          <PersistGate loading={null} persistor={persistor}>
            {children}
            <Footer />
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
