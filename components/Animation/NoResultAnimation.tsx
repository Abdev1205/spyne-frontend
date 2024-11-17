import React from 'react'
import Lottie from 'lottie-react';
import { noResultAnimation } from "@/public/assetsmanager";

const NoResultAnimation = () => {
  return (
    <>
      <Lottie
        animationData={noResultAnimation}
        autoplay={true}
        loop={true}
      />
    </>
  )
}

export default NoResultAnimation
