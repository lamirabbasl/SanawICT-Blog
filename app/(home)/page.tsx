import Articles from "@/components/Articles";
import MostViewed from "@/components/MostViewed";
import Popular from "@/components/Popular";

function page() {
  return (
    <div className="flex flex-row-reverse justify-start  max-lg:justify-center w-screen h-screen mt-[85px]  ">
      <div className="mr-[220px] max-lg:m-0 max-lg:w-5/6 ">
        <Articles />
      </div>
      <div className="w-[600px] absolute left-0 h-screen max-lg:hidden">
        <div className="fixed left-[40%] h-screen w-[2px] bg-secondery max-lg:hidden"></div>
        <Popular />
        <MostViewed />
      </div>
    </div>
  );
}

export default page;
