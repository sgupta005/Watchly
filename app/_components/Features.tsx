"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Film, Heart, ListChecks, Search, Share2, Users } from "lucide-react";
import { motion } from "motion/react";

const features = [
  {
    name: "Share Recommendations",
    description: "Recommend movies to friends and discover their favorites.",
    icon: Share2,
  },
  {
    name: "Social Features",
    description: "Connect with friends and see what they're watching.",
    icon: Users,
  },
  {
    name: "Watchlist",
    description: "Save movies and shows you want to watch for later.",
    icon: Heart,
  },
  {
    name: "Track Movies & Shows",
    description:
      "Keep a record of everything you watch with personal ratings and reviews.",
    icon: Film,
  },
  {
    name: "Movie Boards",
    description:
      "Create themed collections and collaborate with friends on curated movie lists.",
    icon: ListChecks,
  },
];

export function Features() {
  return (
    <div className="relative overflow-hidden py-24" id="features">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10 opacity-5">
        <div className="absolute right-1/4 top-1/4 h-64 w-64 rounded-full bg-primary blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 h-64 w-64 rounded-full bg-primary blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1 text-base font-medium text-primary"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            Everything you need
          </motion.h2>
          <motion.p
            className="mt-10 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-6xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Your Complete Movie Companion
          </motion.p>
          <motion.p
            className="mx-auto mt-6 max-w-xl text-lg leading-8 text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Watchly helps you organize your movie life with powerful features
            designed for movie enthusiasts.
          </motion.p>
        </motion.div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:max-w-none lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
              >
                <Card className="h-full overflow-hidden border-primary/5 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5">
                  <CardHeader className="pb-3">
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <feature.icon className="size-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl font-bold md:text-2xl">
                      {feature.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="leading-relaxed text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative element */}
      <motion.div
        className="pointer-events-none absolute -bottom-10 right-0 opacity-10"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 0.1, x: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <Film className="h-72 w-72" />
      </motion.div>
    </div>
  );
}
