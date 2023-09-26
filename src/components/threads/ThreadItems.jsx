import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  asyncUpVoteThread,
  asyncDownVoteThread,
  asyncNeutralVoteThread,
} from "../../states/threads/action";
import postedAt from "../../utils/time-formater";

function ThreadItems({
  userId,
  id,
  title,
  body,
  category,
  createdAt,
  owner,
  upVotesBy,
  downVotesBy,
  totalComments,
}) {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const isUpVoteIncludesUserId = upVotesBy.includes(userId);

  const isDownVoteIncludesUserId = downVotesBy.includes(userId);

  const onClickUpVote = () => {
    if (isUpVoteIncludesUserId) {
      dispatch(asyncNeutralVoteThread({ threadId: id, neutralFromUp: true }));
    } else {
      dispatch(asyncUpVoteThread({ threadId: id }));
    }
  };

  const onClickDownVote = () => {
    if (isDownVoteIncludesUserId) {
      dispatch(asyncNeutralVoteThread({ threadId: id, neutralFromDown: true }));
    } else {
      dispatch(asyncDownVoteThread({ threadId: id }));
    }
  };

  const onClickToDetail = () => {
    navigate(`/threads/${id}`);
  };

  return (
    <article className="m-4 rounded-lg bg-[#f1f1f1] p-4">
      <button
        type="button"
        className="font-poppins font-semibold text-3xl truncate"
        onClick={onClickToDetail}
      >
        {title}
      </button>
      <section className="flex justify-between items-center my-2">
        <section className="flex items-center">
          <img
            src={owner.avatar}
            alt="profile"
            className="w-12 h-12 rounded-lg"
          />
          <section className="flex flex-col ml-2">
            <span className="font-poppins font-semibold">{owner.name}</span>
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
      <section className="truncate mb-4">{body}</section>
      <section className="flex justify-between">
        <section className="flex">
          <section className="flex items-center mr-2">
            <button
              type="button"
              className={`${
                isUpVoteIncludesUserId
                  ? "bg-primary text-white"
                  : "text-primary bg-white"
              } mr-1 h-7 w-7 grid place-items-center rounded-md`}
              onClick={onClickUpVote}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 15.75l7.5-7.5 7.5 7.5"
                />
              </svg>
            </button>
            <span>{upVotesBy.length}</span>
          </section>
          <section className="flex items-center">
            <button
              type="button"
              className={`${
                isDownVoteIncludesUserId
                  ? "bg-primary text-white"
                  : "text-primary bg-white"
              } mr-1 h-7 w-7 grid place-items-center rounded-md rotate-180`}
              onClick={onClickDownVote}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 15.75l7.5-7.5 7.5 7.5"
                />
              </svg>
            </button>
            <span>{downVotesBy.length}</span>
          </section>
        </section>
        <button
          type="button"
          className="bg-primary rounded-lg text-white px-2 py-1"
          onClick={onClickToDetail}
        >
          {totalComments} replies
        </button>
      </section>
    </article>
  );
}

ThreadItems.propTypes = {
  userId: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    avatar: PropTypes.string,
  }).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  totalComments: PropTypes.number.isRequired,
};

export default ThreadItems;
