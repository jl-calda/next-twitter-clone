import { formatDistanceToNowStrict } from "date-fns";
import { useMemo } from "react";
import { BsTwitter } from "react-icons/bs";

interface NotificationItemProps {
  data: Record<string, any>;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ data }) => {
  const createdAt = useMemo(() => {
    if (!data?.createdAt) return null;
    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data?.createdAt]);

  return (
    <div
      className="
    flex
    flex-row
    items-center
    p-6
    gap-4
    border-b-[1px]
    border-neutral-800"
    >
      <BsTwitter color="white" size={32} />
      <p className="text-white">{data.body}</p>{" "}
      <span className="text-neutral-500 text-sm">{`${createdAt} ago`}</span>
    </div>
  );
};

export default NotificationItem;
