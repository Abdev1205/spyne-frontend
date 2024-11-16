"use client";

import { CustomImage } from "@/components/custom/CustomImage";
import api from "@/utils/axios";
import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface CarInterface {
  _id: string;
  images: string[];
  title: string;
  description: string;
}

export const CarMainPageSkelton: React.FC = () => {
  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col items-center">
      {/* Main Image Skeleton */}
      <div className="w-full h-[calc(100vh-4rem)]  ">
        <Skeleton className="w-full h-[calc(100vh-4rem)] rounded-lg shadow-md" />
      </div>

      {/* Row of Images Skeleton */}
      <div className="flex flex-wrap justify-center gap-4 w-fit absolute p-[1rem] bottom-0">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
          <Skeleton key={index} className="w-24 h-24 rounded-md shadow-sm" />
        ))}
      </div>

      {/* Title and Description Skeleton */}
      <div className="mt-6 text-center">
        <Skeleton className="w-3/4 h-8 mb-2" />
        <Skeleton className="w-1/2 h-6" />
      </div>
    </div>
  );
};

const CarPage = ({ params }: any) => {
  const { id } = params;

  const [carData, setCarData] = useState<CarInterface | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const getCarData = async () => {
    try {
      const carData = await api.get("/api/car/" + id, {
        withCredentials: true,
      });
      setCarData(carData.data.data);
      setSelectedImage(carData.data.data.images[0]); // Set the first image as default
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCarData();
  }, []);

  if (!carData) {
    return <CarMainPageSkelton />;
  }

  return (
    <div className="flex w-full h-[calc(100vh-4rem)] relative flex-col items-center">
      {/* Main Image */}
      <div className="w-full  h-full  mb-4">
        <CustomImage
          src={selectedImage || ""}
          alt={carData.title}
          width={1000}
          height={1000}
          className="w-full h-full object-cover "
        />
      </div>

      {/* Row of Images */}
      <div className="flex w-fit absolute bg-black/10 shadow-transparent shadow-2xl  p-[1rem] bottom-0 ">
        <div className=" flex md:w-[100%] w-[40rem]   justify-center gap-4 ">
          {carData.images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(image)}
              className={`w-24 h-24 rounded-md overflow-hidden shadow-sm transition-transform transform ${
                selectedImage === image
                  ? "scale-110 border-2 border-blue-500"
                  : ""
              }`}
            >
              <CustomImage
                src={image}
                alt={`Thumbnail ${index}`}
                width={100}
                height={100}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Title and Description */}
      <div className="mt-[5rem] text-center">
        <h1 className="text-2xl font-semibold">{carData.title}</h1>
        <p className="text-gray-600 mt-2">{carData.description}</p>
      </div>
    </div>
  );
};

export default CarPage;
