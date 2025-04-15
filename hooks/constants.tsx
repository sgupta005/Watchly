import { AuthContext } from "@/providers/auth-provider";
import { useContext } from "react";

export function useGetNavItems() {
  const navLinks = [
    { href: "/search", label: "Search" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/explore", label: "Explore" },
  ];
  return navLinks;
}

export function useGetMoreNavItems() {
  const { userDetails } = useContext(AuthContext);
  if (!userDetails) return [];
  const navLinks = [
    { href: "/friends", label: "Friends" },
    { href: "/recommendations", label: "Recommendations" },
    { href: "/movieboard", label: "Movie Boards" },
    { href: "/profile/" + userDetails.id, label: "Profile" },
  ];
  return navLinks;
}

export const defaultProfileImage =
  "https://res.cloudinary.com/djpbvhxfh/image/upload/v1735148944/watchly/profile/jo9vh0lfjf4bwca2bc6o.jpg";
