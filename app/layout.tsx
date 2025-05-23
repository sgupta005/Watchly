import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/providers/auth-provider";
import { NavigationLoader, ThemeProvider } from "@/providers/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./_components/Navbar";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://watchly.vercel.app"
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Watchly",
  description: "Your Perfect Movie Companion",
  openGraph: {
    images: [
      {
        url: "/landing.png",
        width: 1200,
        height: 630,
        alt: "Watchly",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      {
        url: "/landing.png",
        width: 1200,
        height: 630,
        alt: "Watchly",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className} suppressHydrationWarning={true}>
          <SpeedInsights />
          <AuthProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              disableTransitionOnChange
            >
              <Toaster />
              <NavigationLoader>
                <Navbar />
                <div className="pt-20">{children}</div>
              </NavigationLoader>
            </ThemeProvider>
          </AuthProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
