"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetMoreNavItems, useGetNavItems } from "@/hooks/constants";
import { SignedIn, SignedOut, useAuth, useClerk } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import MobileSidebar from "./MobileSidebar";
import ThemeToggler from "./ThemeToggler";
import { motion } from "motion/react";
import { Film } from "lucide-react";

export default function Navbar() {
  const { signOut, isSignedIn } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const { openSignIn } = useClerk();

  const navItems = useGetNavItems();
  const moreNavItems = useGetMoreNavItems();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <nav
        className={`fixed z-[30] mx-4 mt-4 flex h-16 w-[calc(100%-2rem)] items-center justify-center rounded-xl border-b border-border/30 bg-background/80 shadow-sm backdrop-blur-md`}
      >
        <div className="flex h-full w-full items-center justify-between px-6 lg:container lg:px-4">
          <motion.h1
            className="hidden items-center gap-2 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-xl font-extrabold text-transparent lg:flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <Film className="h-5 w-5 text-primary" />
            <Link
              href={isSignedIn ? "/dashboard" : "/"}
              className="transition-opacity "
            >
              Watchly
            </Link>
          </motion.h1>
          <MobileSidebar menuItems={[...navItems, ...moreNavItems]} />
          <div className="hidden items-center space-x-1 lg:flex">
            <SignedIn>
              <motion.div
                className="flex space-x-1"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                {navItems.map(({ href, label }, index) => (
                  <motion.div
                    key={href}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.3 }}
                  >
                    <NavLink href={href} title={label} />
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.2 + navItems.length * 0.1,
                    duration: 0.3,
                  }}
                >
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="rounded-full px-4 text-sm font-medium transition-all hover:bg-primary/10"
                      >
                        More
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="mt-1 flex w-48 flex-col gap-1 rounded-xl border border-border/30 bg-background/95 p-2 shadow-lg backdrop-blur-md">
                      {moreNavItems.map(({ href, label }) => (
                        <DropdownMenuItem
                          key={href}
                          onClick={() => router.push(href)}
                          className="cursor-pointer rounded-lg px-3 py-2 font-medium transition-colors hover:bg-primary/10"
                        >
                          {label}
                        </DropdownMenuItem>
                      ))}
                      {moreNavItems.length == 0 && (
                        <DropdownMenuItem
                          disabled
                          className="cursor-pointer px-3 py-2 font-medium"
                        >
                          Loading...
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </motion.div>
              </motion.div>
            </SignedIn>
          </div>
          <motion.div
            className="flex items-center justify-end gap-3"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <SignedIn>
              <Button
                variant="ghost"
                onClick={() => signOut()}
                className="rounded-full px-4 text-sm font-medium transition-all hover:bg-destructive/10 hover:text-destructive"
              >
                Sign out
              </Button>
            </SignedIn>
            <SignedOut>
              <Button
                variant="ghost"
                className="rounded-full px-4 text-sm font-medium transition-all hover:bg-primary/10"
                asChild
              >
                <Link href="/sign-in">Sign in</Link>
              </Button>
            </SignedOut>
            <div className="rounded-full border border-border/30 bg-background/60 p-1">
              <ThemeToggler />
            </div>
          </motion.div>
        </div>
      </nav>
    </motion.header>
  );
}

export function NavLink({
  href,
  title,
  onClose,
}: {
  href: string;
  title: string;
  onClose?: Function;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href}>
      <Button
        onClick={onClose && (() => onClose())}
        variant="ghost"
        className={`relative w-full rounded-full px-4 text-sm font-medium transition-all lg:w-fit 
          ${isActive ? "text-primary" : "hover:bg-primary/10"}`}
      >
        {title}
        {isActive && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 mx-auto h-0.5 w-3/4 rounded-full bg-primary"
            layoutId="activeNavIndicator"
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        )}
      </Button>
    </Link>
  );
}
