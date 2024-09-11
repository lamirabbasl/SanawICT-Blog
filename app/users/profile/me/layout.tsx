import Navbar from "@/components/Navbar";
import { ReactNode } from "react";

function layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Navbar simple={true} />
      {children}
    </div>
  );
}

export default layout;
