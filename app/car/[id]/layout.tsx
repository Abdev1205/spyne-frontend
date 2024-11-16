import Navbar from "@/components/custom/navbar/Navbar";
import React from "react";

const CarLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default CarLayout;
