import axios from "axios";
import { useCallback, useMemo } from "react";
import toast from "react-hot-toast";

import useCurrentUser from "./useCurrentUser";
import useLoginModal from "./useLoginModal";
import usePost from "./usePost";
import usePosts from "./usePosts";

interface UseLikeProps {
  postId: string;
  userId?: string;
}

const useLike = ({ postId, userId }: UseLikeProps) => {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(
    postId as string
  );
  const { mutate: mutateFetchedPosts } = usePosts(userId);

  const loginModal = useLoginModal();

  const hasLiked = useMemo(() => {
    const list = fetchedPost?.likedIds || [];

    return list.includes(currentUser?.id);
  }, [fetchedPost, currentUser]);

  const toggleLike = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    try {
      let request;

      let action;

      if (hasLiked) {
        request = () => axios.delete("/api/like", { data: { postId } });
        action = "unliked";
      } else {
        request = () => axios.post("/api/like", { postId });
        action = "liked";
      }
      await request();

      mutateFetchedPost();
      mutateFetchedPosts();

      toast.success(`You ${action} this post`);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }, [
    loginModal,
    currentUser,
    hasLiked,
    postId,
    mutateFetchedPost,
    mutateFetchedPosts,
  ]);

  return {
    hasLiked,
    toggleLike,
  };
};

export default useLike;
