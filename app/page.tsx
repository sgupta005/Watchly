"use client";

import { Features } from "./_components/Features";
import { Hero } from "./_components/Hero";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
    </main>
  );
}
