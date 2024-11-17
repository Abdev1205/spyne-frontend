import React from "react";
import Lottie from "lottie-react";
import { deleteAnimationFile } from "@/public/assetsmanager";

const DeleteLottieAnimation = () => {
  return (
    <div className="  flex mx-auto justify-center w-[8rem] ">
      <Lottie animationData={deleteAnimationFile} autoplay={true} loop={true} />
    </div>
  );
};

export default DeleteLottieAnimation;
