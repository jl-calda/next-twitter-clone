import { format } from "date-fns";
import { useMemo } from "react";
import { BiCalendar } from "react-icons/bi";

import useCurrentUser from "../../hooks/useCurrentUser";
import useUser from "../../hooks/useUser";
import Button from "../Button";

interface UserBioProps {
  userId: string;
}

const UserBio: React.FC<UserBioProps> = ({ userId }) => {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedUser } = useUser(userId);

  const createAt = useMemo(() => {
    if (!fetchedUser?.createAt) return null;

    return format(new Date(fetchedUser.createAt), "MMMM yyyy");
  }, [fetchedUser?.createAt]);

  return (
    <div className="border-b[1px] border-neutral-800 pb-4">
      <div className="flex justify-end p-2">
        {currentUser?.id === fetchedUser?.id ? (
          <Button secondary label="Edit" onClick={() => {}} />
        ) : (
          <Button label="Follow" onClick={() => {}} secondary />
        )}
      </div>
      <div className="mt-8 px-4">
        <div className="flex flex-col">
          <p className="text-white text-2xl font-semibold">
            {fetchedUser?.name}
          </p>
          <p className="text-neutral-500 text-md">@{fetchedUser?.username}</p>
        </div>
      </div>
      <div className="flex flex-col mt-4">
        <p className="text-white">{fetchedUser?.bio}</p>
        <div className="flex flex-row items-center gap-2 mt-4 text-neutral-500">
          <BiCalendar size={24} />
          <p>Joined {createAt}</p>
        </div>
      </div>
    </div>
  );
};

export default UserBio;
