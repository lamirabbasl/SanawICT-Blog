import React from "react";
import iconMap from "../utility/icon_links";

function Tab({ id, name }: { id: string; name: string }) {
  const IconComponent = iconMap[id];
  return (
    <div className=" flex  cursor-pointer gap-3 max-xl:text-[15px] ">
      <p className="text-[24px] max-xl:text-[15px]">{name}</p>
      <IconComponent />
    </div>
  );
}

export default Tab;
