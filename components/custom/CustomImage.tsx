import React, { useState } from "react";
import Image, { ImageProps } from "next/image";
import { Skeleton } from "@/components/ui/skeleton"; // ShadCN Skeleton
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility function to merge class names
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const CustomImage: React.FC<ImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
  ...props
}) => {
  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => {
    // Delay hiding the skeleton for 3 seconds
    setTimeout(() => {
      setLoading(false);
    }, 100);
  };

  return (
    <div className={cn("relative", className)}>
      {/* Show Skeleton while loading */}
      {loading && (
        <Skeleton
          className={cn(
            "absolute inset-0 w-full h-full",
            className // Apply same styles to skeleton
          )}
        />
      )}

      {/* Render Image */}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={cn(
          "object-cover",
          loading ? "opacity-0" : "opacity-100",
          className
        )}
        onLoadingComplete={handleImageLoad} // Trigger delay on image load
        {...props} // Pass any other props (e.g., priority, layout, etc.)
      />
    </div>
  );
};
