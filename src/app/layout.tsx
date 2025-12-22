import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Antigravity IELTS | Professional Preparation Platform",
  description: "Free, AI-powered IELTS preparation with real-time feedback and diagnostic testing.",
};

import { ThemeProvider } from "@/components/theme-provider";
import { FloatingAI } from "@/components/FloatingAI";
import { MissionBar } from "@/components/MissionBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased bg-background text-foreground`}
        suppressHydrationWarning
      >
        {/* HMR Trigger */}
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <MissionBar />
          {children}
          <FloatingAI />
        </ThemeProvider>
      </body>
    </html>
  );
}



