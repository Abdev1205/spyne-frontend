"use client";

import React from "react";
import useSession from "@/hooks/useSession";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import formatDate from "@/utils/formatDate";
import { Button } from "@/components/ui/button";
import { CustomImage } from "@/components/custom/CustomImage";

const ProfilePage = () => {
  const { user, loading, logout } = useSession();
  // const { user, logout } = useSession();
  // const loading = false;

  if (loading) {
    return (
      <div className="flex w-full justify-center items-center h-screen">
        <Card className="w-[35rem] relative border shadow-lg">
          <CardHeader className="relative">
            <Skeleton className="w-24 h-24 rounded-full absolute top-[-50%] left-[calc(50%-3rem)]" />
            <div className="">
              <Skeleton className="h-6 w-32 mx-auto mb-2 mt-4" />
              <Skeleton className="h-4 w-48 mx-auto" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-20" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-4">
            <Skeleton className="h-10 w-24 rounded-md" />
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex w-full justify-center items-center h-screen">
      <Card className="w-[35rem] relative border shadow-lg">
        <CardHeader className="relative">
          <CustomImage
            src={
              user?.profilePicture ||
              "https://res.cloudinary.com/dujgngjro/image/upload/v1731783000/CloudinaryDemo/neohusgtlq54yal0lg6b.webp"
            }
            alt="Profile Picture"
            width={96}
            height={96}
            className="absolute size-[7rem] rounded-full top-[-1.8rem] left-[calc(50%-3.5rem)]"
          />
          <div className="mt-16">
            <h1 className="font-openSans text-[1.05rem] font-[500] text-center mt-[2rem] text-gray-900">
              {user?.name || "Guest"}
            </h1>
            <p className="font-openSans text-center text-sm text-gray-500">
              {user?.email || "guest@example.com"}
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <span className="text-sm font-medium text-gray-700">
                Google Account:
              </span>
              <span className="text-sm text-gray-600">
                {user?.googleId ? " Connected " : "Not Connected"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium text-gray-700">
                Account Created:
              </span>
              <span className="text-sm text-gray-600">
                {formatDate(user?.joinedAt)}
              </span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-4">
          <Button
            className="px-4 py-2 text-sm font-openSans font-[500] text-black border shadow-none bg-white hover:bg-black hover:text-white rounded-[.2rem]"
            onClick={() => logout()}
          >
            Logout
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProfilePage;
