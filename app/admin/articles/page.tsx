import Articles from "@/components/Articles";

function Page() {
  return (
    <div className=" flex items-center justify-center w-screen mt-[90px] ">
      <Articles user="admin" />
    </div>
  );
}

export default Page;
