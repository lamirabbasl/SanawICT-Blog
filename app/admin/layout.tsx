import AdminSidebar from "@/components/AdminSidebar";
import Navbar from "@/components/Navbar";
import { ReactNode } from "react";

function layout({ children }: { children: ReactNode }) {
  return (
    <div className="w-screen h-screen">
      <Navbar />
      <AdminSidebar />
      {children}
    </div>
  );
}

export default layout;
