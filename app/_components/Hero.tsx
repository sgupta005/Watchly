"use client";

import { Button } from "@/components/ui/button";
import { useClerk, useUser } from "@clerk/nextjs";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";

export function Hero() {
  const { user } = useUser();
  const { openSignIn } = useClerk();

  return (
    <div className="isolate flex h-[calc(100vh-80px)] w-full items-center justify-center overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 opacity-5">
        <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-primary blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-primary blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-3xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <Link
              href={user ? "/movieboard" : "#features"}
              className="group flex items-center gap-x-4 rounded-full px-4 py-1.5 text-sm ring-1 ring-gray-900/10 transition-all hover:shadow-md hover:ring-gray-900/20 dark:ring-gray-700 dark:hover:ring-gray-600"
            >
              <span className="rounded-full bg-primary/10 px-3 py-1 font-semibold text-primary">
                New
              </span>
              <span className="h-4 w-px bg-gray-900/10 dark:bg-gray-700" />
              <p className="flex items-center gap-x-1">
                Introducing Movie Boards
                <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </p>
            </Link>
          </motion.div>
          <motion.h1
            className="mt-10 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Your Personal Movie Journey
          </motion.h1>
          <motion.p
            className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Create your personal movie library, share recommendations, and
            organize your watchlist. Track what you've watched and discover new
            favorites.
          </motion.p>
          <motion.div
            className="mt-10 flex items-center justify-center gap-x-6"
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
              className="group flex items-center text-sm font-semibold text-muted-foreground"
            >
              Learn more{" "}
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
