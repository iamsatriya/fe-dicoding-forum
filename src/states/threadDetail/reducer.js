import { ActionType } from "./action";

function threadDetailReducer(threadDetail = null, action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_THREAD_DETAIL:
      return action.payload.threadDetail;
    case ActionType.CLEAR_THREAD_DETAIL:
      return null;
    case ActionType.UP_VOTE_THREAD_DETAIL: {
      const isIncludeInUpVotes = threadDetail.upVotesBy.includes(
        action.payload.userId,
      );
      const isIncludeInDownVotes = threadDetail.downVotesBy.includes(
        action.payload.userId,
      );
      return {
        ...threadDetail,
        upVotesBy: isIncludeInUpVotes
          ? threadDetail.upVotesBy.filter((id) => id !== action.payload.userId)
          : threadDetail.upVotesBy.concat([action.payload.userId]),
        downVotesBy: isIncludeInDownVotes
          ? threadDetail.downVotesBy.filter(
              (id) => id !== action.payload.userId,
            )
          : threadDetail.downVotesBy,
      };
    }
    case ActionType.DOWN_VOTE_THREAD_DETAIL: {
      const isIncludeInUpVotes = threadDetail.upVotesBy.includes(
        action.payload.userId,
      );
      const isIncludeInDownVotes = threadDetail.downVotesBy.includes(
        action.payload.userId,
      );
      return {
        ...threadDetail,
        upVotesBy: isIncludeInUpVotes
          ? threadDetail.upVotesBy.filter((id) => id !== action.payload.userId)
          : threadDetail.upVotesBy,
        downVotesBy: isIncludeInDownVotes
          ? threadDetail.downVotesBy.filter(
              (id) => id !== action.payload.userId,
            )
          : threadDetail.downVotesBy.concat([action.payload.userId]),
      };
    }
    case ActionType.NEUTRAL_VOTE_THREAD_DETAIL: {
      const isIncludeInUpVotes = threadDetail.upVotesBy.includes(
        action.payload.userId,
      );
      const isIncludeInDownVotes = threadDetail.downVotesBy.includes(
        action.payload.userId,
      );
      return {
        ...threadDetail,
        upVotesBy: isIncludeInUpVotes
          ? threadDetail.upVotesBy.filter((id) => id !== action.payload.userId)
          : threadDetail.upVotesBy,
        downVotesBy: isIncludeInDownVotes
          ? threadDetail.downVotesBy.filter(
              (id) => id !== action.payload.userId,
            )
          : threadDetail.downVotesBy,
      };
    }
    case ActionType.CREATE_COMMENT_THREAD_DETAIL:
      return {
        ...threadDetail,
        comments: [action.payload.comment, ...threadDetail.comments],
      };

    case ActionType.UP_VOTE_COMMENT_THREAD_DETAIL: {
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            const isIncludeInUpVotes = comment.upVotesBy.includes(
              action.payload.userId,
            );
            const isIncludeInDownVotes = comment.downVotesBy.includes(
              action.payload.userId,
            );
            return {
              ...comment,
              upVotesBy: isIncludeInUpVotes
                ? comment.upVotesBy.filter((id) => id !== action.payload.userId)
                : comment.upVotesBy.concat([action.payload.userId]),
              downVotesBy: isIncludeInDownVotes
                ? comment.downVotesBy.filter(
                    (id) => id !== action.payload.userId,
                  )
                : comment.downVotesBy,
            };
          }
          return comment;
        }),
      };
    }
    case ActionType.DOWN_VOTE_COMMENT_THREAD_DETAIL: {
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            const isIncludeInUpVotes = comment.upVotesBy.includes(
              action.payload.userId,
            );
            const isIncludeInDownVotes = comment.downVotesBy.includes(
              action.payload.userId,
            );
            return {
              ...comment,
              upVotesBy: isIncludeInUpVotes
                ? comment.upVotesBy.filter((id) => id !== action.payload.userId)
                : comment.upVotesBy,
              downVotesBy: isIncludeInDownVotes
                ? comment.downVotesBy.filter(
                    (id) => id !== action.payload.userId,
                  )
                : comment.downVotesBy.concat([action.payload.userId]),
            };
          }
          return comment;
        }),
      };
    }
    case ActionType.NEUTRAL_VOTE_COMMENT_THREAD_DETAIL: {
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            const isIncludeInUpVotes = comment.upVotesBy.includes(
              action.payload.userId,
            );
            const isIncludeInDownVotes = comment.downVotesBy.includes(
              action.payload.userId,
            );
            return {
              ...comment,
              upVotesBy: isIncludeInUpVotes
                ? comment.upVotesBy.filter((id) => id !== action.payload.userId)
                : comment.upVotesBy,
              downVotesBy: isIncludeInDownVotes
                ? comment.downVotesBy.filter(
                    (id) => id !== action.payload.userId,
                  )
                : comment.downVotesBy,
            };
          }
          return comment;
        }),
      };
    }
    default:
      return threadDetail;
  }
}

export default threadDetailReducer;
