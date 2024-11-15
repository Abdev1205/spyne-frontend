"use client";

import Link from "next/link";
import React from "react";
import useSession from "@/hooks/useSession";
import { Button } from "@/components/ui/button";

const DashboardPage = () => {
  const { user, loading, loggedIn, logout } = useSession();
  console.log(user);
  return (
    <>
      <div>Hello from the dashboard</div>
      <Link href={"/"}>Home</Link>
      {loggedIn && <button onClick={logout}>Logout</button>}
      {!loading && user && <div>Welcome, {user && user.name}</div>}
      <Button onClick={() => logout()}>Logout</Button>
    </>
  );
};

export default DashboardPage;
