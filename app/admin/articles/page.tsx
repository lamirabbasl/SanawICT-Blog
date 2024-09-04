import Articles from "@/components/Articles";

function Page() {
  return (
    <div className=" flex items-center justify-center w-screen max-lg:ml-8 max-lg:w-5/6 mt-[90px] ">
      <Articles user="admin" />
    </div>
  );
}

export default Page;
