"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import React from "react";

export default function LoadingScreen() {
  const { theme } = useTheme();

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-black">
      <div
        className={`h-12 w-12 animate-spin rounded-full border-4 border-white border-t-transparent`}
      ></div>
    </div>
  );
}
