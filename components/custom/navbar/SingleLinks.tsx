"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface SingleLinksPropsData {
  title: string;
  href: string;
}

const SingleLinks: React.FC<{ data: SingleLinksPropsData }> = ({ data }) => {
  const { title, href } = data;
  const pathname = usePathname();

  // Determine if the link is active based on the current pathname
  const isActive = pathname === href;

  return (
    <Link
      className={`${
        isActive
          ? "underline underline-offset-[7px] decoration-2 decoration-red-700"
          : ""
      } text-black font-poppins font-[400]`}
      href={href}
    >
      {title}
    </Link>
  );
};

export default SingleLinks;
