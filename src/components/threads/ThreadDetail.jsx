import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { BiChevronUp, BiChevronDown } from "react-icons/bi";
import { postedAt } from "../../utils/time-formater";
import {
  asyncUpVoteThreadDetail,
  asyncDownVoteThreadDetail,
  asyncNeutralVoteThreadDetail,
} from "../../states/threadDetail/action";

function ThreadDetail({
  threadId,
  title,
  avatar,
  name,
  createdAt,
  category,
  body,
  upVotesBy,
  downVotesBy,
  commentsLength,
}) {
  const authUser = useSelector((states) => states.authUser);

  if (!authUser) return null;

  const { id: userId } = authUser;

  const dispatch = useDispatch();

  const isUpVoteIncludeUserId = upVotesBy.includes(userId);

  const isDownVoteIncludeUserId = downVotesBy.includes(userId);

  const onClickUpVote = () => {
    if (isUpVoteIncludeUserId) {
      dispatch(asyncNeutralVoteThreadDetail({ threadId, neutralFromUp: true }));
    } else {
      dispatch(asyncUpVoteThreadDetail({ threadId }));
    }
  };

  const onClickDownVote = () => {
    if (isDownVoteIncludeUserId) {
      dispatch(
        asyncNeutralVoteThreadDetail({ threadId, neutralFromDown: true }),
      );
    } else {
      dispatch(asyncDownVoteThreadDetail({ threadId }));
    }
  };

  return (
    <article className="rounded-lg bg-[#f1f1f1] p-4 ">
      <button className="font-poppins font-semibold text-3xl truncate">
        {title}
      </button>
      <section className="flex justify-between items-center my-2">
        <section className="flex items-center">
          <img src={avatar} alt="profile" className="w-12 h-12 rounded-lg" />
          <section className="flex flex-col ml-2">
            <span className="font-poppins font-semibold">{name}</span>
            <span className="text-gray-400 font-light">
              {postedAt(createdAt)}
            </span>
          </section>
        </section>
        <section>
          <span className="inline-block px-2 py-1 bg-primary-light text-white text-sm rounded-md">
            {category}
          </span>
        </section>
      </section>
      <section className="mb-4">{body}</section>
      <section className="flex justify-between">
        <section className="flex">
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
        <button
          type="button"
          className="bg-primary rounded-lg text-white px-2 py-1"
        >
          {commentsLength} replies
        </button>
      </section>
    </article>
  );
}

ThreadDetail.propTypes = {
  threadId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  upVotesBy: PropTypes.array.isRequired,
  downVotesBy: PropTypes.array.isRequired,
  commentsLength: PropTypes.number.isRequired,
};

export default ThreadDetail;
