import { v4 as uuidv4 } from "uuid";
import CommentItem from "./CommentItem";

interface CommentFeedProps {
  comments?: Record<string, any>[];
}

const CommentFeed: React.FC<CommentFeedProps> = ({ comments }) => {
  return (
    <>
      {comments?.map((comment: Record<string, any>) => (
        <CommentItem key={uuidv4()} data={comment} />
      ))}
    </>
  );
};

export default CommentFeed;
