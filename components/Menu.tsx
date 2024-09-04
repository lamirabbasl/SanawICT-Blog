"use client";

import React, { useEffect, useRef, useState } from "react";
import { IoMenu } from "react-icons/io5";
import tabsData from "../utility/tabs.json";
import Tab from "@/components/Tab";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoClose } from "react-icons/io5";
import adminTab from "@/utility/adminTab.json";
type ElementProps = {
  id: string;
  name: string;
  path: string;
};

function Menu({ user }: { user?: string }) {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let handler = (e: any) => {
      if (!menuRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [path]);

  let Data;
  if (user == "admin") Data = adminTab;
  else Data = tabsData;

  return (
    <div className="xl:hidden ">
      {open ? (
        <>
          <div className="fixed inset-0 z-50 bg-black opacity-85 left-0 top-0 h-screen w-screen "></div>
          <div
            className=" fixed top-0 left-0 bottom-0 w-1/2 z-50 h-screen  bg-white "
            ref={menuRef}
          >
            <IoClose
              className=" absolute text-black text-[30px] top-1 left-1"
              onClick={() => setOpen(false)}
            />

            <div className="flex flex-col  gap-5 mt-7 w-full">
              {Data.tabs[0].elements.map((element: ElementProps, index) => (
                <div
                  key={index}
                  className={
                    path.includes(element.id)
                      ? " neon flex ml-12 justify-end bg-[#3CE1C4] rounded-l-[40px] p-2  "
                      : "text-black p-2 "
                  }
                >
                  <Link
                    href={`/${element.path}`}
                    key={index}
                    className="flex flex-row  gap-5 justify-end  text-[33px] mr-4 cursor-default"
                  >
                    <Tab key={index} id={element.id} name={element.name} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <IoMenu
          className=" text-[33px] text-black xl:hidden  "
          onClick={() => setOpen(true)}
        />
      )}
    </div>
  );
}

export default Menu;
