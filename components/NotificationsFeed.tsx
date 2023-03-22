import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import useCurrentUser from "../hooks/useCurrentUser";
import useNotifications from "../hooks/useNotifications";
import NotificationItem from "./NotificationItem";

const NotificationsFeed = () => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { data: fetchedNotifications = [] } = useNotifications(currentUser?.id);

  useEffect(() => {
    mutateCurrentUser();
  }, [mutateCurrentUser]);

  if (fetchedNotifications.length === 0) {
    return (
      <div
        className="
                text-neutral-600
                text-center
                p-6
                text-xl"
      >
        No Notifications
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {fetchedNotifications.map((notification: Record<string, any>) => (
        <NotificationItem key={uuidv4()} data={notification} />
      ))}
    </div>
  );
};

export default NotificationsFeed;
