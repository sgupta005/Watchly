"use client";

import { Button } from "@/components/ui/button";
import { useClerk, useUser } from "@clerk/nextjs";
import { Clapperboard, Film, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";

export function Hero() {
  const { user } = useUser();
  const { openSignIn } = useClerk();

  return (
    <div className="relative isolate flex h-screen w-full items-center justify-center overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 opacity-5">
        <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-primary blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-primary blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 lg:flex lg:items-center lg:justify-between lg:gap-x-16 lg:px-8">
        <motion.div
          className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="flex"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <Link
              href={user ? "/movieboard" : "#features"}
              className="group relative flex items-center gap-x-4 rounded-full px-4 py-1.5 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 transition-all duration-300 hover:shadow-md hover:ring-gray-900/20 dark:text-gray-300 dark:ring-gray-700 dark:hover:ring-gray-600"
            >
              <span className="relative overflow-hidden rounded-full bg-primary/10 px-3 py-1 font-semibold text-primary">
                New
                <span className="absolute inset-0 animate-pulse bg-primary/10 opacity-0 group-hover:opacity-100"></span>
              </span>
              <span className="h-4 w-px bg-gray-900/10 dark:bg-gray-700" />
              <p className="flex items-center gap-x-1">
                Introducing Movie Boards
                <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </p>
            </Link>
          </motion.div>
          <motion.h1
            className="mt-12 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Your Digital Cinematic Memory
          </motion.h1>
          <motion.p
            className="mt-8 text-xl leading-8 text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Create your personal movie library, share recommendations with
            friends, and organize your watchlist. Track what you&apos;ve
            watched, rate movies, and discover new favorites.
          </motion.p>
          <motion.div
            className="mt-12 flex items-center gap-x-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            {user ? (
              <Button
                size="lg"
                className="rounded-full px-8 shadow-lg transition-all hover:shadow-xl"
                asChild
              >
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
            ) : (
              <Button
                size="lg"
                className="rounded-full px-8 shadow-lg transition-all hover:shadow-xl"
                onClick={() => openSignIn()}
              >
                Get Started
              </Button>
            )}
            <Link
              href="#features"
              className="group flex items-center text-sm font-semibold leading-6 text-muted-foreground"
            >
              Learn more{" "}
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>
        <motion.div
          className="mt-16 hidden sm:mt-24 lg:mt-0 lg:block lg:flex-shrink-0"
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
        >
          <div className="relative">
            <Clapperboard className="relative z-10 mx-auto size-72 text-primary drop-shadow-xl" />
            <div className="absolute inset-0 z-0 scale-75 rounded-full bg-primary/10 opacity-50 blur-3xl"></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
