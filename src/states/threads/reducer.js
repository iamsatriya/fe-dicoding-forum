import { ActionType } from "./action";

function threadsReducer(threads = [], action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_THREADS:
      return action.payload.threads;
    case ActionType.CREATE_THREAD:
      return action.payload.thread;
    case ActionType.UP_VOTE_THREAD:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          const isIncludeInUpVotes = thread.upVotesBy.includes(
            action.payload.userId,
          );
          const isIncludeInDownVotes = thread.downVotesBy.includes(
            action.payload.userId,
          );
          return {
            ...thread,
            upVotesBy: isIncludeInUpVotes
              ? thread.upVotesBy.filter((id) => id !== action.payload.userId)
              : thread.upVotesBy.push(action.payload.userId),
            downVotesBy: isIncludeInDownVotes
              ? thread.downVotesBy.filter((id) => id !== action.payload.userId)
              : thread.downVotesBy,
          };
        } else return thread;
      });
    case ActionType.DOWN_VOTE_THREAD:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          const isIncludeInUpVotes = thread.upVotesBy.includes(
            action.payload.userId,
          );
          const isIncludeInDownVotes = thread.downVotesBy.includes(
            action.payload.userId,
          );
          return {
            ...thread,
            downVotesBy: isIncludeInDownVotes
              ? thread.downVotesBy.filter((id) => id !== action.payload.userId)
              : thread.downVotesBy.push(action.payload.userId),
            upVotesBy: isIncludeInUpVotes
              ? thread.downVotesBy.filter((id) => id !== action.payload.userId)
              : thread.upVotesBy,
          };
        } else return thread;
      });
    case ActionType.NEUTRAL_VOTE_THREAD:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          const isIncludeInUpVotes = thread.upVotesBy.includes(
            action.payload.userId,
          );
          const isIncludeInDownVotes = thread.downVotesBy.includes(
            action.payload.userId,
          );
          return {
            ...thread,
            upVotesBy: isIncludeInUpVotes
              ? thread.upVotesBy.filter((id) => id !== action.payload.userId)
              : thread.upVotesBy,
            downVotesBy: isIncludeInDownVotes
              ? thread.downVotesBy.filter((id) => id !== action.payload.userId)
              : thread.downVotesBy,
          };
        } else return thread;
      });
    default:
      return threads;
  }
}

export default threadsReducer;
