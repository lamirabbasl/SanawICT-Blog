import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { ReactNode } from "react";

function layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Navbar />
      <Sidebar />
      {children}
    </div>
  );
}

export default layout;
