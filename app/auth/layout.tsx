"use client";

import { LogoImage } from "@/public/assetsmanager";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  return (
    <div className=" w-[100%] min-h-[100vh] relative    ">
      <div className=" w-full sticky h-[4rem] top-0 bg-white  flex justify-between px-16 border-b-2 shadow-sm  ">
        <div className="  top-4  flex items-center gap-[.5rem]  ">
          <Image
            src={LogoImage}
            width={400}
            height={400}
            alt="Spyne"
            className="  w-[2.5rem]    "
          />
          <h1 className=" text-[1.6rem] font-poppins font-[500] ">Spyne</h1>
        </div>
        <div className="  flex justify-center items-center  font-poppins text-[1.1rem]   ">
          {pathname.endsWith("register") ? (
            <Link href={"/auth/login"} className=" mx-auto ">
              Login
            </Link>
          ) : (
            <Link href={"/auth/register"}>Register</Link>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default AuthLayout;
