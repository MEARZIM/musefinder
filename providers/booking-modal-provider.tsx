"use client"

import { useEffect, useState } from "react";

import { BookingModal } from "@/components/ui/booking-modal";

export const ModalProvider = () =>{
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() =>{
        setIsMounted(true);
    },[])

    if(!isMounted) {
        return null;
    }

    return (
        <>
        <BookingModal />
        </>
    )
}