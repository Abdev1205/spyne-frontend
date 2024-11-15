import React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import Progress from "../components/progress/Progress";

interface ConfigProvider {
  children: React.ReactNode;
}

const ConfigProvider: React.FC<ConfigProvider> = ({
  children,
}): React.ReactNode => {
  return (
    <div>
      {/* <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      > */}
      <Progress />
      {children}
      {/* </ThemeProvider> */}
    </div>
  );
};

export default ConfigProvider;
