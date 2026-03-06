import { Geist, Geist_Mono } from "next/font/google";
import MouseCursor from "@/components/common/MouseCursor";
import SmoothScroll from "@/components/common/SmoothScroll";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "BAM Architects",
  description: "BAM Architects - Designing the Future",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <SmoothScroll>
          <MouseCursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
