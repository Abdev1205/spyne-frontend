"use client";
import React, { useEffect } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import Progress from "../components/progress/Progress";
import { ToastContainer, toast } from "react-toastify";

interface ConfigProvider {
  children: React.ReactNode;
}

const ConfigProvider: React.FC<ConfigProvider> = ({
  children,
}): React.ReactNode => {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => {
          registration.unregister();
        });
      });
    }
  }, []);
  return (
    <div>
      {/* <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      > */}
      <Progress />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {children}
      {/* </ThemeProvider> */}
    </div>
  );
};

export default ConfigProvider;
