import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AFO",
  description: "PreSchool App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = getCookie("token", { cookies }) || null;
  if (!token) {
    redirect("/login");
  }
  return (
    <html lang="en">
      <body className={inter.className}>
        <div>
          <Toaster />
        </div>
        {children}
      </body>
    </html>
  );
}
