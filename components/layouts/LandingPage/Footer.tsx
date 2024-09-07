"use client";
import React from "react";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
const people = [
    {
        id: 1,
        name: "Subrata Das",
        designation: "UX Designer",
        image:
            "/assets/subrata.jpg",
  },
    {
        id: 2,
        name: "Ayan Saha",
        designation: "Product Manager",
        image:
            "/assets/ayan.jpg",
    },
    {
        id: 3,
        name: "Anumay Samajpati",
        designation: "Data Scientist",
        image:
            "/assets/anumay.jpg",
    },
    {
        id: 4,
        name: "Soumya Majhi",
        designation: "Software Engineer",
        image:
            "/assets/soumya.jpg",
    },
    {
        id: 5,
        name: "Rimi Sreemany",
        designation: "Soap Developer",
        image:
            "/assets/rimi.jpg",
    },
    {
        id: 6,
        name: "Sayani Basu",
        designation: "The Explorer",
        image:
            "/assets/sayani.jpg",
    },
];
export const Footer = () => {
    return (
        <footer className="relative bg-inherit p-16">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap text-left lg:text-left">
                    <div className="w-full lg:w-6/12 px-4">

                        <h5 className="text-lg mt-0 mb-2 text-white">
                            Find me on any of these platforms, and I respond within 1-2 business days.
                        </h5>
                        <div className="flex mt-6 lg:mb-0 mb-6">
                            <div className="flex flex-row items-center justify-center mb-10 w-full">
                                <AnimatedTooltip items={people} />
                            </div>
                        </div>
                    </div>

                </div>
                <hr className="my-6 border-blueGray-300" />
                <div className="flex flex-wrap items-center md:justify-between justify-center">
                    <div className="w-full md:w-4/12 px-4 mx-auto text-center">
                        <div className="text-sm text-black font-semibold py-1">
                            All rights reserved © <span id="get-current-year"> 2024</span> Ayan Saha
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};