"use client";

import { useAuth } from "@clerk/nextjs";

import { HeroParallax } from "@/components/ui/hero-parallax";

export const products = [
  {
    title: "Museum1",
    link: "#",
    thumbnail:
      "/assets/1.jpg",
  },
  {
    title: "Museum2",
    link: "#",
    thumbnail:
      "/assets/2.jpg",
  },
  {
    title: "Museum3",
    link: "#",
    thumbnail:
      "/assets/3.jpg",
  },
 
  {
    title: "Museum4",
    link: "#",
    thumbnail:
      "/assets/4.jpg",
  },
  {
    title: "Museum5",
    link: "#",
    thumbnail:
      "/assets/5.jpg",
  },
  {
    title: "Museum6",
    link: "#",
    thumbnail:
      "/assets/6.jpg",
  },
 
  {
    title: "Museum7",
    link: "#",
    thumbnail:
      "/assets/7.jpg",
  },
  {
    title: "Museum8",
    link: "#",
    thumbnail:
      "/assets/8.JPG",
  },
  {
    title: "Museum9",
    link: "#",
    thumbnail:
      "/assets/9.jpg",
  },
  {
    title: "Museum10",
    link: "#",
    thumbnail:
      "/assets/10.jpg",
  },
  {
    title: "Museum11",
    link: "#",
    thumbnail:
      "/assets/11.jpg",
  },
 
  {
    title: "Museum12",
    link: "#",
    thumbnail:
      "/assets/12.jpg",
  },
  {
    title: "Museum13",
    link: "#",
    thumbnail:
      "/assets/13.jpg",
  },
  {
    title: "Museum14",
    link: "#",
    thumbnail:
      "/assets/14.jpg",
  },
  {
    title: "Museum15",
    link: "#",
    thumbnail:
      "/assets/15.jpg",
  },
];

export const HeroSection = () => {
  const { isSignedIn } = useAuth();

  return (<>
    <HeroParallax products={products} />;
  </>
  );
};