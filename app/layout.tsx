import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Brethren Dashboard",
  description: "Local-first dashboard for condos, trends, and news",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-50 dark:bg-gray-900">
        <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Brethren Dashboard
                </h1>
              </div>
              <div className="flex gap-6">
                <a href="/" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                  Home
                </a>
                <a href="/condos" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                  Condos
                </a>
                <a href="/trends" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                  Trends
                </a>
                <a href="/news" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                  News
                </a>
              </div>
            </div>
          </div>
        </nav>
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
