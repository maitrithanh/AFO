import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Provider from "./components/shared/sessionProvider";
import { Baloo_Bhaijaan_2 } from "next/font/google";

const font = Baloo_Bhaijaan_2({
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
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
