import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Provider from "./components/shared/sessionProvider";
import { Baloo_Bhaijaan_2 } from "next/font/google";
import { Asap_Condensed } from "next/font/google";
import GlobalContextProvider from "./contexts/GlobalContext";

const font = Baloo_Bhaijaan_2({
  weight: "400", // if single weight, otherwise you use array like [400, 500, 700],
  style: "normal", // if single style, otherwise you use array like ['normal', 'italic']
  subsets: ["latin"],
});

const font_asap_condensed = Asap_Condensed({
  weight: "400", // if single weight, otherwise you use array like [400, 500, 700],
  style: "normal", // if single style, otherwise you use array like ['normal', 'italic']
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AFO",
  description: "PreSchool App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${font.className}`}>
        <div className="relative">
          <Toaster />
        </div>
        <GlobalContextProvider>
          <Provider>{children}</Provider>
        </GlobalContextProvider>
      </body>
    </html>
  );
}
