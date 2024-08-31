"use client";

import Tabs from "@/utility/adminSidebar";
import { useRouter, usePathname } from "next/navigation";

function AdminSidebar() {
  const router = useRouter();
  const path = usePathname();

  const handleTabClick = (tab: any) => {
    router.push(`/admin/${tab.id}`);
  };

  return (
    <div className=" fixed left-0 top-[90px] h-screen z-50  w-[200px] text-black shadow-md">
      {Tabs.map((tab: any, index: number) => (
        <div
          className={
            path.includes(tab.id)
              ? "flex  w-[190px] rounded-r-[10px] h-10 mt-3 bg-[#3CE1C4]  items-center justify-center text-[18px] cursor-pointer text-balance "
              : "flex  w-[190px] rounded-r-[10px] h-10 mt-3  text-gray-700 items-center justify-center text-[18px] cursor-pointerbg-[#3CE1C4] cursor-pointer"
          }
          key={index}
          onClick={() => handleTabClick(tab)}
        >
          <p className="font-extrabold">{tab.name}</p>
        </div>
      ))}
    </div>
  );
}

export default AdminSidebar;
