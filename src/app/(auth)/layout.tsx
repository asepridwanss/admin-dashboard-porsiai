import Image from "next/image";
import Link from "next/link";
import { ThemeProvider } from "@/context/ThemeContext";
import ThemeTogglerTwo from "@/components/common/ThemeTogglerTwo";
import GridShape from "@/components/common/GridShape";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative  bg-white z-1 dark:bg-gray-900 sm:p-0">

      {children}


    </div>
  );
}
