"use client"
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { useBookingModal } from "@/hooks/use-booking-modal";
import Link from "next/link";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
        className
      )}
    >
      {children}
    </div>
  );
};


export const BentoGridItem = ({
  id,
  className,
  title,
  description,
  img,
}: {
  id: string;
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  img?: string;
}) => {

  const BookingModal = useBookingModal();
  return (
    <div
      className={cn(
        "row-span-2  rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none mt-4 p-4 dark:bg-black dark:border-white/[0.2] bg-slate-400 border border-transparent justify-between flex flex-col space-y-2",
        className
      )}
    >
      <div>
        <img src={img} alt="" />
        <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
          {title}
        </div>
        <div className="font-sans font-normal text-neutral-600 text-lg dark:text-neutral-300">
          {description}
        </div>
        <div className="my-2 py-6">
          <Link href={`/museums/${id}`}>
            <Button
              size="sm"
              variant="destructive"
              className="hover:scale-105 transition duration-200"
            >
              Book Ticket
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
