import { create } from "zustand";

interface useBookingModalInterface  {
    isOpen: boolean;
    onOpen: ()=>void;
    onClose: ()=>void;
}

export const useBookingModal = create<useBookingModalInterface>((set)=>({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
}));