import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { BiSend } from "react-icons/bi";
import {
  asyncReceiveThreadDetail,
  asyncCreateComment,
} from "../states/threadDetail/action";
import ThreadDetail from "../components/threads/ThreadDetail";
import CommentItem from "../components/comments/CommentItem";

function DetailPage() {
  const { id } = useParams();
  const threadDetail = useSelector((states) => states.threadDetail);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch]);

  if (!threadDetail) {
    return null;
  }

  const {
    title,
    createdAt,
    category,
    body,
    upVotesBy,
    downVotesBy,
    comments,
    owner: { name, avatar },
  } = threadDetail;

  const onSubmitComment = (data) => {
    dispatch(asyncCreateComment({ content: data.content, threadId: id }));
    reset();
  };

  return (
    <section className="container mx-auto pb-6">
      <ThreadDetail
        threadId={id}
        title={title}
        avatar={avatar}
        name={name}
        createdAt={createdAt}
        category={category}
        body={body}
        upVotesBy={upVotesBy}
        downVotesBy={downVotesBy}
        commentsLength={comments.length}
      />
      <form
        className="p-4 mt-2 rounded-lg bg-white flex border-2"
        onSubmit={handleSubmit(onSubmitComment)}
      >
        <input
          className="flex-1 bg-inherit outline-none"
          placeholder="Write a comment"
          {...register("content", { required: "Please put a comment first!" })}
        />
        <button className="ml-2 p-1 rounded-lg text-primary" type="submit">
          <BiSend size={24} />
        </button>
      </form>
      {errors.comment?.message && (
        <p className="text-primary-light text-sm">{errors.comment?.message}</p>
      )}
      {comments.map(
        (
          {
            id: commentId,
            content,
            createdAt,
            owner: { name, avatar },
            upVotesBy,
            downVotesBy,
          },
          index,
        ) => (
          <CommentItem
            key={index}
            commentId={commentId}
            threadId={id}
            content={content}
            createdAt={createdAt}
            name={name}
            avatar={avatar}
            upVotesBy={upVotesBy}
            downVotesBy={downVotesBy}
          />
        ),
      )}
    </section>
  );
}

export default DetailPage;
