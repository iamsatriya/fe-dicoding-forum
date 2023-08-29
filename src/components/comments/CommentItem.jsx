import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { BiChevronUp, BiChevronDown } from "react-icons/bi";
import { postedAt } from "../../utils/time-formater";
import {
  asyncUpVoteCommentThreadDetail,
  asyncDownVoteCommentThreadDetail,
  asyncNeutralVoteCommentThreadDetail,
} from "../../states/threadDetail/action";

function CommentItem({
  threadId,
  commentId,
  content,
  createdAt,
  name,
  avatar,
  upVotesBy,
  downVotesBy,
}) {
  const dispatch = useDispatch();

  const authUser = useSelector((states) => states.authUser);

  if (!authUser) return null;

  const { id: userId } = authUser;

  const isUpVoteIncludeUserId = upVotesBy.includes(userId);

  const isDownVoteIncludeUserId = downVotesBy.includes(userId);

  const onClickUpVote = () => {
    if (isUpVoteIncludeUserId) {
      dispatch(
        asyncNeutralVoteCommentThreadDetail({
          threadId,
          commentId,
          neutralFromUp: true,
        }),
      );
    } else {
      dispatch(asyncUpVoteCommentThreadDetail({ threadId, commentId }));
    }
  };

  const onClickDownVote = () => {
    if (isDownVoteIncludeUserId) {
      dispatch(
        asyncNeutralVoteCommentThreadDetail({
          threadId,
          commentId,
          neutralFromDown: true,
        }),
      );
    } else {
      dispatch(asyncDownVoteCommentThreadDetail({ threadId, commentId }));
    }
  };

  return (
    <section className="ml-10 mt-2 rounded-lg flex p-2 bg-[#f1f1f1]">
      <section className="">
        <img src={avatar} alt={name} className="w-12 h-12 rounded-lg" />
      </section>
      <section className="ml-4">
        <p className="font-poppins font-semibold">{name}</p>
        <p className="text-gray-400 font-light">{postedAt(createdAt)}</p>
        <p>{content}</p>
        <section className="flex mt-4">
          <section className="flex items-center mr-2">
            <button
              type="button"
              className={`${
                isUpVoteIncludeUserId
                  ? "bg-primary text-white"
                  : "text-primary bg-white"
              } mr-1 grid place-items-center rounded-md`}
              onClick={onClickUpVote}
            >
              <BiChevronUp size={32} />
            </button>
            <span>{upVotesBy.length}</span>
          </section>
          <section className="flex items-center">
            <button
              type="button"
              className={`${
                isDownVoteIncludeUserId
                  ? "bg-primary text-white"
                  : "text-primary bg-white"
              } mr-1 grid place-items-center rounded-md`}
              onClick={onClickDownVote}
            >
              <BiChevronDown size={32} />
            </button>
            <span>{downVotesBy.length}</span>
          </section>
        </section>
      </section>
    </section>
  );
}

CommentItem.propTypes = {
  commentId: PropTypes.string.isRequired,
  threadId: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CommentItem;
