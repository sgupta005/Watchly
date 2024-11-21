export function useGetNavItems() {
  const navLinks = [
    { href: "/search", label: "Search" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/explore", label: "Explore" },
  ];
  return navLinks;
}

export function useGetSocialsLinks() {
  const linkedin = "https://www.linkedin.com/in/actuallyakshat";
  const github = "https://github.com/actuallyakshat/cinevault";
  return { linkedin, github };
}
