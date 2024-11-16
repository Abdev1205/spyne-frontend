import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import useSession from "@/hooks/useSession";
import { LogoImage } from "@/public/assetsmanager";
import Image from "next/image";
import { useRouter } from "nextjs-toploader/app";
import {
  PiUserCircleCheckFill,
  PiUserCircleGearFill,
  PiUserCircleFill,
} from "react-icons/pi";
import { LuLogOut } from "react-icons/lu";
import { Skeleton } from "@/components/ui/skeleton";
import { CustomImage } from "../CustomImage";

const UserProfileMenu = () => {
  const { user, logout } = useSession();
  const router = useRouter();
  return (
    <div className="relative w-fit  ">
      {/* Avatar Trigger */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="w-10 h-10 rounded-full overflow-hidden cursor-pointer border border-gray-200 shadow-sm">
            {/* <Image
              src={user?.profilePicture || LogoImage}
              alt="User Avatar"
              width={40}
              height={40}
              className="object-cover"
            /> */}
            <CustomImage
              src={
                user?.profilePicture ||
                "https://res.cloudinary.com/dujgngjro/image/upload/v1731783000/CloudinaryDemo/neohusgtlq54yal0lg6b.webp"
              }
              alt="User Avatar"
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
        </DropdownMenuTrigger>

        {/* Dropdown Content */}
        <DropdownMenuContent className="w-[14rem]  absolute font-poppins left-[-10rem] border bg-white rounded-lg shadow-md">
          {/* Description */}
          <div className="p-4 border-b border-gray-200">
            <p className="text-sm font-medium text-gray-900">{user?.name}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>

          {/* Menu Items */}
          <DropdownMenuItem
            className="py-2 px-4 hover:bg-gray-100 cursor-pointer text-sm text-gray-700"
            onClick={() => router.push("/profile")}
          >
            <PiUserCircleGearFill className=" text-lg " />
            View Profile
          </DropdownMenuItem>
          <DropdownMenuItem
            className="py-2 px-4 hover:bg-gray-100 cursor-pointer text-sm text-gray-700"
            onClick={() => logout()}
          >
            <LuLogOut className=" text-[.4rem] " />
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserProfileMenu;
