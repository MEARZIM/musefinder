"use client";
import React, { useState } from "react";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Montserrat } from 'next/font/google'
import { useUser } from "@clerk/nextjs";
import { usePathname } from 'next/navigation'
import { LuCrown } from "react-icons/lu";
import { MdOutlineMuseum } from "react-icons/md";


import {
  Sidebar,
  SidebarBody,
  SidebarLink
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { UserAvatar } from "../User-Avatar/user-avatar";
// import FreeCounter from "../free-counter/FreeCounter";
import { Settings } from "lucide-react";


const montserrat = Montserrat({
  weight: "700",
  subsets: ["latin"]
});

interface SideBarProps {
  apiLimitCount: number;
  isPro: boolean;
}

export function SidebarLayout({
  apiLimitCount = 0,
  isPro = false
}: SideBarProps) {
  const pathname = usePathname();
  const { user, isLoaded } = useUser();
  const links = [
    {
      label: "Museums",
      href: "/museums",
      icon: (
        <MdOutlineMuseum className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Conversation",
      href: "/conversation",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Profile",
      href: "/user-profile",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Settings",
      href: "/settings",
      icon: (
        <Settings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },

  ];
  const [open, setOpen] = useState(false);


  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 max-w-7xl mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "md:h-screen"
      )}
    >
      <Sidebar open={open} setOpen={setOpen} animate={false}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <>
              <Logo />
            </>
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} pathName={pathname} />
              ))}
            </div>
          </div>
          <div className="flex items-center gap-x-2">
            <SidebarLink
              link={{
                label: `${user?.firstName} ${user?.lastName}`,
                href: "#",
                icon: (
                  <UserAvatar />
                ),
              }}
            />

            {
              isPro && (<>
                <LuCrown color="orange" size={25} />
              </>
              )
            }
          </div>
          {/* <FreeCounter apiLimitCount={apiLimitCount} isPro={isPro} /> */}
        </SidebarBody>
      </Sidebar>
    </div>
  );
}



export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={cn(`text-2xl font-bold text-black dark:text-white whitespace-pre`, montserrat.className)}
      >
        National_Museum
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};