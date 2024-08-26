import Categories from "@/components/Categories";
import Navbar from "@/components/Navbar";
import { ReactNode } from "react";

function layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Navbar />
      <Categories />
      {children}
    </div>
  );
}

export default layout;
