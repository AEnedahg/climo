'use client'
import { Inter } from "next/font/google";
import "./globals.css";
import ClientProvider from "@/providers/ClientProvider";
import { Provider } from "react-redux";
import { store } from "@/store";
const inter = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased flex justify-center bg-[#060C1A]`}
      >
        <ClientProvider>
          <Provider store={store}>
            {children}
          </Provider>
        </ClientProvider>
      </body>
    </html>
  );
}
