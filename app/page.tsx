"use client";

import CarCard, { SkeletonCarCard } from "@/components/custom/Card/CarCard";
import Navbar from "@/components/custom/navbar/Navbar";
import api from "@/utils/axios";
import React, { useEffect, useState } from "react";
interface CardProps {
  _id: string;
  images: string[];
  title: string;
  description: string;
}

const HomePage = () => {
  const [carData, setCarData] = useState([]);
  const getCarData = async () => {
    const data = await api.get("/api/car/", { withCredentials: true });
    console.log(data.data.data);
    setCarData(data.data.data);
  };

  useEffect(() => {
    getCarData();
  }, []);
  return (
    <div>
      <Navbar />

      <div className=" flex flex-wrap gap-[2rem] px-[4rem] mt-[2rem] mb-[4rem]  ">
        {carData.length === 0
          ? Array(10)
              .fill(null)
              .map((_, i) => <SkeletonCarCard key={i} />)
          : carData &&
            carData.map((data: CardProps) => {
              return (
                <CarCard
                  key={data?._id}
                  name={data?.title}
                  description={data?.description}
                  imageUrl={data?.images[0]}
                  id={data?._id}
                />
              );
            })}
      </div>
    </div>
  );
};

export default HomePage;
