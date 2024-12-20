import type { Metadata } from "next";
import ConfigProvider from "@/providers/ConfigProvider";
import "./globals.css";
// import Navbar from "@/components/custom/common/navbar";
import { montserrat, openSans, poppins } from "../public/font.js";
import AuthLayer from "@/layer/AuthLayer";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${openSans.variable} ${poppins.variable}  `}
      >
        <ConfigProvider>
          {/* <Navbar /> */}
          <AuthLayer>{children}</AuthLayer>
        </ConfigProvider>
      </body>
    </html>
  );
}
