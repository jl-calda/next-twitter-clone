import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners";

import Header from "../../components/Header";
import UserBio from "../../components/users/UserBio";
import UserHero from "../../components/users/UserHero";
import useUser from "../../hooks/useUser";

const UserView = () => {
  const router = useRouter();
  const { userId } = router.query;
  const { data: fetchUser, isLoading } = useUser(userId as string);

  if (isLoading || !fetchUser) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }

  return (
    <>
      <Header showBackArrow label={fetchUser?.name} />
      <UserHero userId={userId as string} />
      <UserBio userId={userId as string} />
    </>
  );
};

export default UserView;
