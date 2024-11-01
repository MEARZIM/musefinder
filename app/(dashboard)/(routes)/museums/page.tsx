"use client";

import {
  useEffect,
  useState
} from "react";
import axios from "axios";

import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { UserAvatar } from "@/components/layouts/User-Avatar/user-avatar";

export const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100">

  </div>
);

export interface MuseumProps {
  id: string;
  name: string;
  description: string;
  img?: string;
  location: string;
  rating: number;
  ticketPrice: number;
}

const MuseumListPage = () => {

  const [museums, setMuseums] = useState<MuseumProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);


  const getAllMuseumLists = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/api/museum");
      setMuseums(response.data);
    } catch (error) {
      console.log("Error fetching museum data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllMuseumLists();
  }, []);


  if (isLoading) {
    return (
      <>
      <div className="m-auto">
        <div className="grid grid-cols-3 gap-4 max-w-4xl mx-auto">
          {Array(9)
            .fill(0)
            .map((_, index) => (
              <Skeleton key={index} />
            ))}
        </div>
      </div>
      </>
    );
  }


  return (
    <>
      <div className="flex items-center justify-between p-4 bg-slate-600">
        <div className="text-gray-200">
          This is the list of all the available museums.
        </div>
        <UserAvatar/>
      </div>
      <BentoGrid className="max-w-4xl mx-auto">
        {museums.length > 0 ? (
          museums.map((museum) => (
            <BentoGridItem
              key={museum.id}
              id={museum.id}
              title={museum.name}
              description={museum.description}
              img={museum.img || "/placeholder.jpg"}
              className="border"
            />
          ))
        ) : (
          <p>No museums available.</p>
        )}
      </BentoGrid>
    </>
  );
};

export default MuseumListPage;
