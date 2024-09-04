"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IoIosSearch } from "react-icons/io";

function Searchbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = (e: any) => {
    e.preventDefault();
    if (searchTerm.length > 3) {
      const formattedSearchTerm = searchTerm;
      router.push(`/articles/search?query=${formattedSearchTerm}`);
    }
  };

  return (
    <div className="flex justify-center items-center w-[700px] h-full max-lg:w-1/2">
      <form
        className="w-5/6 h-[39px] flex justify-center items-center mr-[30px] bg-secondery rounded-[45px] max-lg:h-[36px] max-lg:mr-0 max-lg:ml-6"
        onSubmit={handleSearch}
      >
        <input
          type="text"
          placeholder="جستجو"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="text-right w-full bg-secondery m-auto rounded-[45px] mr-2 placeholder-[#303030] outline-none text-[14px] focus:placeholder-opacity-0 max-lg:h-[30px] max-lg:text-[11px]"
        />
        <IoIosSearch
          className="text-[20px] mr-4 cursor-pointer max-lg:text-[15px]"
          onClick={handleSearch}
        />
      </form>
    </div>
  );
}

export default Searchbar;
