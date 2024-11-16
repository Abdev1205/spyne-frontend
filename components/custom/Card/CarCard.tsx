import React from "react";
import { CustomImage } from "../CustomImage";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "nextjs-toploader/app";

interface CardProps {
  imageUrl: string;
  name: string;
  description: string;
  id: string;
}

export const SkeletonCarCard: React.FC = () => {
  return (
    <div className="flex flex-col md:w-[48%] border animate-pulse rounded-t-[.5rem]">
      {/* Image Placeholder */}
      <Skeleton className="w-full h-[20rem]  rounded-lg" />

      {/* Text Placeholders */}
      <div className=" flex flex-col gap-[1rem] justify-start p-4">
        {/* Title Placeholder */}
        <Skeleton className="h-8 w-1/2 bg-gray-200 rounded-[.2rem] " />

        {/* Description Placeholder */}
        <div className=" flex flex-col gap-[.2rem] ">
          <Skeleton className="h-14 w-full  rounded-[.3rem]" />
          {/* <Skeleton className="h-4 w-2/3  rounded-md" /> */}
        </div>
      </div>
    </div>
  );
};

const CarCard: React.FC<CardProps> = ({ imageUrl, name, description, id }) => {
  const router = useRouter();
  return (
    <div className="flex flex-col md:w-[48%] border rounded-[.5rem] cursor-pointer ">
      <div
        onClick={() => router.push("/car/" + id)}
        className=" w-full h-[20rem]  "
      >
        <CustomImage
          src={imageUrl}
          width={1000}
          height={800}
          alt={name}
          className="w-full h-full rounded-t-[.5rem]   "
        />
      </div>
      <div className=" flex flex-col justify-start p-4">
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="mt-2 text-gray-500 text-sm">{description}</p>
      </div>
    </div>
  );
};

export default CarCard;
