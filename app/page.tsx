import ThemeButton from "@/components/custom/Button/ThemeButton";
import { Button } from "@/components/ui/button";
import React from "react";

const HomePage = () => {
  return (
    <>
      <Button className=" rounded-[.1rem] w-[20rem] ">Home page button</Button>

      <div className=" w-[20rem] h-[20rem] dark:bg-green-400 bg-pink-600  "></div>
    </>
  );
};

export default HomePage;
