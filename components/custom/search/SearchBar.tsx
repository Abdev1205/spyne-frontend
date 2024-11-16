"use client";

import { Input } from "@/components/ui/input";
import { usePathname, useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";

const SearchBar = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const pathname = usePathname();

  // we will update the searh after 3 sec so that our child compoent product shoudl not
  // cal the api frequnt 3 min gap sould be there
  // Wich meas here we have to update our router with params after 3 sec
  const handleSearch = () => {
    // now if our search text have chnages so we also have to add this in my use effect
    setTimeout(() => {
      if (searchText) {
        router.push(`${pathname}/?q=${searchText}`);
      }
    }, 3000);
  };

  useEffect(() => {
    handleSearch();
  }, [searchText]);
  return (
    <div className="flex w-[30rem] font-openSans bg-white ">
      <div className=" w-[100%] flex items-center gap-[.1rem] border-2 h-[2.8rem] px-[1rem] rounded-full">
        <IoSearch className=" text-[1.3rem] text-gray-400  " />
        <Input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Type here to Search   "
          className=" focus-visible:ring-0 outline-none border-none shadow-none placeholder:text-black/50 placeholder:font-openSans placeholder:font-[500] "
        />
      </div>
      <button
        type="submit"
        className="absolute right-0 top-0 mt-5 mr-4"
      ></button>
    </div>
  );
};

export default SearchBar;
