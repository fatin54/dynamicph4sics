import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'DynamicsLab | HSC Physics 1st Paper Chapter 3 (গতিবিদ্যা)',
  description: 'An interactive, English-first learning platform for Bangladesh NCTB HSC Physics Chapter 3: Dynamics. Built around the textbook by Dr. Shahjahan Tapan, Muhammad Aziz Hasan, and Dr. Rana Chowdhury.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-sand-bg text-sand-text selection:bg-orange-light selection:text-orange-deep">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
