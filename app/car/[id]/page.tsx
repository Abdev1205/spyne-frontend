"use client";

import { CustomImage } from "@/components/custom/CustomImage";
import api from "@/utils/axios";
import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { MdDeleteForever, MdModeEdit } from "react-icons/md";
import EditCar from "@/components/custom/modals/EditCar";
import DeleteCar from "@/components/custom/modals/DeleteCar";
import { useRouter } from "nextjs-toploader/app";

export interface CarInterface {
  _id: string;
  images: string[];
  tags: string[];
  title: string;
  description: string;
}

// Fix type issue by ensuring component structure is correct
const CarMainPageSkelton: React.FC = () => {
  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col items-center">
      {/* Main Image Skeleton */}
      <div className="w-full h-[calc(100vh-4rem)]">
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
  const router = useRouter();

  const [carData, setCarData] = useState<CarInterface | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const getCarData = async () => {
    try {
      const carData = await api.get("/api/car/" + id, {
        withCredentials: true,
      });
      setCarData(carData?.data?.data);
      setSelectedImage(carData?.data?.data?.images[0]); // Set the first image as default
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
    <div className="flex flex-col mb-[5rem]">
      <div className="flex w-full h-[calc(100vh-4rem)] relative flex-col items-center">
        {/* Main Image */}
        <div className="w-full h-full mb-4">
          <CustomImage
            src={selectedImage || ""}
            alt={carData.title}
            width={1000}
            height={1000}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Row of Images */}
        <div className="flex w-fit absolute bg-black/10 shadow-transparent shadow-2xl p-[1rem] bottom-0">
          <div className="flex md:w-[100%] w-[40rem] justify-center gap-4">
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
      </div>
      <div className="flex w-full justify-center relative">
        {/* Title and Description */}
        <div className="mt-[5rem] relative w-[40rem] font-openSans gap-[.3rem]">
          <h2 className="font-poppins font-[600] text-[3rem]">
            {carData.title}
          </h2>
          <p className="text-gray-600 mt-2">{carData.description}</p>

          <h3 className="mt-[2rem] font-poppins font-[600] text-[1.3rem]">
            Tags
          </h3>
          <div className="flex flex-wrap gap-[1rem] mt-[1rem]">
            {carData.tags.map((tag, index) => (
              <span
                key={index}
                className="p-[.4rem] border rounded-full text-[.8rem] font-openSans px-[.7rem] bg-gray-100 hover:bg-gray-200 cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="absolute top-[-3rem] flex gap-[.5rem] right-0">
            <Button
              onClick={() => setEditModalOpen(true)}
              title="edit"
              className="rounded-full shadow-none text-black border bg-gray-100 size-[2rem] flex justify-center items-center hover:text-white duration-300"
            >
              <MdModeEdit />
            </Button>
            <Button
              onClick={() => setDeleteModalOpen(true)}
              title="delete"
              className="rounded-full shadow-none text-black border bg-red-100 size-[2rem] flex justify-center items-center hover:bg-red-200 duration-300"
            >
              <MdDeleteForever className="text-red-500 text-[1.2rem]" />
            </Button>
          </div>
        </div>
      </div>
      <EditCar
        visible={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        focusMode={true}
        callback={() => window.location.reload()}
        id={id}
      />
      <DeleteCar
        visible={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        focusMode={true}
        callback={() => router.push("/")}
        id={id}
      />
    </div>
  );
};

export default CarPage;
