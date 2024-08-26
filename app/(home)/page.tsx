import Articles from "@/components/Articles";
import MostViewed from "@/components/MostViewed";
import Popular from "@/components/Popular";

function page() {
  return (
    <div className="flex flex-row-reverse justify-between w-screen h-screen mt-[85px]  ">
      <Articles />
      <div className=" fixed top-[20%] left-[40%] h-2/3 w-[1px] bg-secondery"></div>
      <Popular />
      <MostViewed />
    </div>
  );
}

export default page;
