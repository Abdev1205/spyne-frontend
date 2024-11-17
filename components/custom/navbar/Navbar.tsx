"use client";

import { LogoImage } from "@/public/assetsmanager";
import Image from "next/image";
import React, { useState } from "react";
import SearchBar from "../search/SearchBar";
import SingleLinks from "./SingleLinks";
import UserProfileMenu from "../menu/UserProfileMenu";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaCarSide } from "react-icons/fa";
import AddCar from "../modals/AddCar";

const Navbar = () => {
  const [showCar, setShowCar] = useState(false);
  const navbarData = [
    { title: "Home", href: "/" },
    // { title: "Contact", href: "/contact" },
    // { title: "About", href: "/about" },
  ];
  return (
    <div className=" w-full z-[40] sticky h-[4rem] top-0 bg-white  flex justify-between items-center px-16 border-b-2 shadow-sm   ">
      {/* Logo Brand Part */}
      <Link
        href={"/"}
        className="  top-4  flex items-center gap-[.5rem] cursor-pointer  "
      >
        <Image
          src={LogoImage}
          width={400}
          height={400}
          alt="Spyne"
          className="  w-[2.5rem]    "
        />
        <h1 className=" text-[1.6rem] font-poppins font-[500] ">Spyne</h1>
      </Link>

      {/* Search Bar */}
      <SearchBar />

      {/* Extra Route links  */}
      <div className=" flex justify-center items-center gap-[2rem] ">
        <div className="flex items-center gap-[1.5rem] ">
          {navbarData.map((navItems, index) => {
            return <SingleLinks key={index} data={navItems} />;
          })}

          <Button
            onClick={() => setShowCar(true)}
            className=" bg-primary hover:bg-primary/85 rounded-full flex justify-center items-center "
          >
            <FaCarSide className=" mt-[.2rem] " />
            Create Car
          </Button>
        </div>

        <UserProfileMenu />
      </div>
      <AddCar
        visible={showCar}
        onClose={() => setShowCar(false)}
        focusMode={true}
      />
    </div>
  );
};

export default Navbar;
