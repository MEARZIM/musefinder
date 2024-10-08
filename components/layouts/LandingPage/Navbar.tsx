"use client";

import Link from "next/link"
import Image from "next/image"
import { Montserrat } from "next/font/google";
import { useAuth } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const font = Montserrat({ weight: '600', subsets: ['latin'] });

export  const LandingNavbar = () => {
  const { isSignedIn } = useAuth();

  return (
    <nav className="p-4 bg-gray-100 flex items-center justify-between">
      <Link href="/" className="flex items-center">
        <div className="relative h-8 w-8 mr-4">
          <Image fill alt="Logo" src="/bot.gif" />
        </div>
        <h1 className={cn("text-2xl font-bold text-black", font.className)}>
          MuseFind
        </h1>
      </Link>
      <div className="flex items-center gap-x-2">
        <Link href={isSignedIn ? "/conversation" : "/sign-up"}>
          <Button variant="outline" className="rounded-full text-black">
            Get Started
          </Button>
        </Link>
      </div>
    </nav>
  )
}