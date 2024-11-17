"use client";

import NoResultAnimation from "@/components/Animation/NoResultAnimation";
import CarCard, { SkeletonCarCard } from "@/components/custom/Card/CarCard";
import AddCar from "@/components/custom/modals/AddCar";
import Navbar from "@/components/custom/navbar/Navbar";
import { Button } from "@/components/ui/button";
import api from "@/utils/axios";
import { useSearchParams } from "next/navigation"; // Use `useSearchParams` for query params
import React, { useEffect, useState } from "react";
import { FaCarSide } from "react-icons/fa";

interface CardProps {
  _id: string;
  images: string[];
  title: string;
  description: string;
}

const HomePage = () => {
  const [carData, setCarData] = useState([]);
  const [showCar, setShowCar] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  const searchParams = useSearchParams(); // Access search params
  const q = searchParams.get("q") || ""; // Get the 'q' search parameter

  const getCarData = async (searchText: string = "") => {
    try {
      const data = await api.get(`/api/car?q=${searchText}`, {
        withCredentials: true,
      });
      console.log(data.data.data);
      setCarData(data.data.data);
      setDataLoaded(true);
    } catch (error) {
      console.error("Error fetching car data:", error);
    }
  };

  useEffect(() => {
    getCarData(q); // Fetch car data based on the query parameter 'q'
  }, [q]); // Re-fetch whenever the 'q' query parameter changes

  return (
    <div>
      <Navbar />

      <div className="flex flex-wrap gap-[2rem] px-[4rem] mt-[2rem] mb-[4rem]">
        {carData.length === 0 && !dataLoaded ? (
          Array(10)
            .fill(null)
            .map((_, i) => <SkeletonCarCard key={i} />)
        ) : carData.length === 0 && dataLoaded ? (
          <>
            <div className="flex h-[calc(100vh-12rem)] w-full flex-col items-center justify-center">
              <NoResultAnimation />
              <h2 className="text-[1.5rem] mt-[.8rem] font-poppins font-[600] mb-4">
                No car found. Create one!
              </h2>
              <Button
                onClick={() => setShowCar(true)}
                className="bg-primary hover:bg-primary/85 rounded-full flex justify-center items-center"
              >
                <FaCarSide className="mt-[.2rem]" />
                Create Car
              </Button>
            </div>
          </>
        ) : (
          carData &&
          carData.map((data: CardProps) => (
            <CarCard
              key={data?._id}
              name={data?.title}
              description={data?.description}
              imageUrl={data?.images[0]}
              id={data?._id}
            />
          ))
        )}
        <AddCar
          visible={showCar}
          onClose={() => setShowCar(false)}
          focusMode={true}
        />
      </div>
    </div>
  );
};

export default HomePage;
