import Articles from "@/components/Articles";
import MostViewed from "@/components/MostViewed";
import Popular from "@/components/Popular";

function page() {
  return (
    <div className="flex flex-row-reverse justify-start w-screen h-screen mt-[85px]  ">
      <div className="mr-[120px]">
        <Articles />
      </div>
      <div className="fixed left-[40%] h-screen w-[2px] bg-secondery"></div>
      <Popular />
      <MostViewed />
    </div>
  );
}

export default page;
