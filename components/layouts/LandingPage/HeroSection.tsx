"use client";

import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { FlipWords } from "@/components/ui/flip-words";
import { HoverEffect } from "@/components/ui/card-hover-effect";

const items = [
  {
    title: "Analytics",
    description: "Monitor the performance of your startup and base decisions on data. Get website analytics with no extra setup.",
    link: ""
  },
  {
    title: "Custom Forms",
    description: "Don't launch to crickets build an audience for your startup. Collect leads directly within Umso, without any 3rd-party services.",
    link: ""
  },
  {
    title: "User Management",
    description: "Enable collaborative work by giving guests access to your sites, projects & other resources.",
    link: ""
  },
  {
    title: "Blogs",
    description: "Produce new content, extend your reach, start appearing on Google. Add a simple blog to your site with a few clicks.",
    link: ""
  },
  {
    title: "Cookie Solution",
    description: "Set up cookie banners that help you respect your visitor's privacy. This is especially important for Europe.",
    link: ""
  },
  {
    title: "Analytics",
    description: "Easily manage your website in multiple languages. With this feature you can offer your site to everyone.",
    link: ""
  }
]

export const HeroSection = () => {
  const { isSignedIn } = useAuth();

  return (<>
    <div className="text-white font-bold py-40 text-center space-y-5">
      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
        <h1 className="bg-gradient-to-r from-blue-800 via-purple-700 to-purple-700 bg-clip-text text-transparent">The Best AI Tool for</h1>
        <div className="text-transparent bg-clip-text  p-2">
          <FlipWords 
          words={["Impressive", "Colorfull", "Bright", "High Quality"]} 
          
          />
        </div>
      </div>
      <div className="text-sm md:text-xl font-light text-white">
        Create content using AI 10x faster.
      </div>
      <div>
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button className="md:text-lg p-4 md:p-6 rounded-full font-semibold">
            Start Generating For Free
          </Button>
        </Link>
      </div>
      <div className="text-white text-xs md:text-sm font-normal">
        No credit card required.
      </div>
    </div>

    <div className="container max-w-7xl">
      <HoverEffect items={items} />
    </div>
  </>
  );
};