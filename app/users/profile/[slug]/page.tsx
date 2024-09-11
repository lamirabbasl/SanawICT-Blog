import Profile from "@/components/Profile";

function Page({ params }: { params: any }) {
  return (
    <div className="w-screen h-screen">
      <Profile user="other" />
    </div>
  );
}

export default Page;
