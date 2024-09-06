"use client"

import axios from "axios";
import { useState } from "react";
import { Check, ImageIcon, Zap } from "lucide-react";

import { Modal } from "./modal"
import { Card } from "./card";
import { cn } from "@/lib/utils";
import { useBookingModal } from "@/hooks/use-booking-modal";
import { Button } from "./button";


export const BookingModal = () => {
    const BookingModal = useBookingModal();
    const [loading, setLoading] = useState(false);
    const links = [
        {
            label: "Image Genetation",
            href: "/image",
            icon: (
                <ImageIcon className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
            bgColor: "bg-pink-700/10"
        },
    ];

    const onSubscribe = async () => {
        try {

            setLoading(true);
            const response = await axios.get("/api/stripe");
            console.log(response);
            window.location.href = response.data.url.url;

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Modal title={"Book Your ticket"}
                description={"update to pro for better performance"}
                isOpen={BookingModal.isOpen}
                onClose={BookingModal.onClose}
                badge="Pro"
            >
                {
                    links.map((link) => (

                        <Card
                            key={link.label}
                            className="p-3 border-black/5 flex items-center justify-between"
                        >
                            <div className="flex items-center gap-x-4">
                                <div className={cn("p-2 w-fit rounded-md", link.bgColor)}>
                                    {link.icon}
                                </div>
                                <div className="font-semibold text-sm">
                                    {link.label}
                                </div>
                            </div>
                            <Check className="text=primary w-5 h-5" />
                        </Card>
                    ))
                }

                <div className="my-2 flex justify-end">
                    <Button
                        className="bg-violet-600 hover:bg-violet-500 w-full"
                        size="lg"
                        onClick={onSubscribe}
                    >
                        Upgrade
                        <Zap className="w-4 h-4 ml-2 fill-white" />
                    </Button>
                </div>
            </Modal>
        </>
    )
}