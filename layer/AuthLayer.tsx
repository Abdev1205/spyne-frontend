"use client";

import { ReactNode, useEffect } from "react";
import useSession from "@/hooks/useSession";
import { usePathname, useRouter } from "next/navigation";

interface AuthLayerProps {
  children: ReactNode; // Ensures type safety for children prop
}

const AuthLayer: React.FC<AuthLayerProps> = ({ children }) => {
  const { user, loading, loggedIn } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const publicRoute: string[] = ["/auth/login", "/auth/register"];
  const isPublicRoute = publicRoute.includes(pathname);

  useEffect(() => {
    if (!loading && !loggedIn && !isPublicRoute) {
      router.push("/auth/login");
    }
  }, [loading, loggedIn, isPublicRoute, router]);

  if (loading) {
    return <div>Loading .......</div>;
  }

  // Prevent rendering protected content while redirecting
  if (!loggedIn && !isPublicRoute) {
    return null; // Ensures no flicker before redirect
  }

  return <div className="w-[100%]">{children}</div>;
};

export default AuthLayer;
