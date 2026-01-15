import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Animations Playground",
  description: "My place to play with and further learn animations on the web.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
          <nav className="py-8">
            <ul className="flex justify-between">
              <div>
                <li>
                  <Link href="/">Animations Playground</Link>
                </li>
              </div>
              <div className="flex gap-4">
                <li>
                  <Link href="/courses">Courses</Link>
                </li>
                <li>
                  <Link href="/experiments">Experiments</Link>
                </li>
              </div>
            </ul>
          </nav>
          {children}
      </body>
    </html>
  );
}
