import { useGetNotifications } from "@/hooks/useReactQuery";

function Notifications() {
  const { data, isLoading, isError } = useGetNotifications();

  return (
    <div className="flex flex-col w-full h-full">
      {data.data.notifications.map((notif: any, index: number) => (
        <div className="flex" key={index}>
          <h1> nofif.message</h1>
        </div>
      ))}
    </div>
  );
}

export default Notifications;
