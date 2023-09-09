/**
 * test scenario for threadDetailReducer
 *
 * - threadDetailReducers function
 *  - should return the initial state when given by unknown action
 *  - should return the thread detail when given by RECEIVE_THREAD_DETAIL action
 *  - should return null when given by CLEAR_THREAD_DETAIL action
 *  - should return the thread detail with upvoted thread when given by UP_VOTE_THREAD_DETAIL action
 *  - should return the thread detail with upvoted thread and remove down voted if any when given by UP_VOTE_THREAD_DETAIL action
 *  - should return the thread detail with no up voted thread if previously has up voted when given by UP_VOTE_TREAD_DETAIL action
 *  - should return the thread detail with down voted thread when given by DOWN_VOTE_THREAD_DETAIL action
 *  - should return the thread detail with down voted thread and remove up voted if any when given by DOWN_VOTE_THREAD_DETAIL action
 *  - should return the thread detail with no down voted thread if previously has down voted when given by DOWN_VOTE_TREAD_DETAIL action
 *  - should return the thead detail with no up voted if previously has up voted when given by NEUTRAL_VOTE_THREAD_DETAIL action
 *  - should return the thead detail with no down voted if previously has down voted when given by NEUTRAL_VOTE_THREAD_DETAIL action
 *  - should return the thread detail with added new comment when given CREATE_COMMENT_THREAD_DETAIL action
 *  - should return the thread detail with upvoted comment when given by UP_VOTE_COMMENT_THREAD_DETAIL action
 *  - should return the thread detail with upvoted comment and remove down voted if any when given by UP_VOTE_COMMENT_THREAD_DETAIL action
 *  - should return the thread detail with no up voted comment if previously has up voted when given by UP_VOTE_COMMENT_THREAD_DETAIL action
 *  - should return the thread detail with down voted comment when given by DOWN_VOTE_COMMENT_THREAD_DETAIL action
 *  - should return the thread detail with down voted comment and remove up voted if any when given by DOWN_VOTE_COMMENT_THREAD_DETAIL action
 *  - should return the thread detail with no down voted comment if previously has down voted when given by DOWN_VOTE_COMMENT_THREAD_DETAIL action
 *  - should return the thead detail with no up voted comment if previously has up voted when given by NEUTRAL_VOTE_COMMENT_THREAD_DETAIL action
 *  - should return the thead detail with no down voted comment if previously has down voted when given by NEUTRAL_VOTE_COMMENT_THREAD_DETAIL action
 */

import { describe, it, expect } from "vitest";
import threadDetailReducer from "./reducer";

describe("threadDetailReducers function", () => {
  it("should return the initial state when given by unknown action", () => {
    const initialState = null;
    const action = { type: "UNKNOWN" };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState).toBe(initialState);
  });

  it("should return the thread detail when given by RECEIVE_THREAD_DETAIL action", () => {
    const initialState = null;
    const action = {
      type: "RECEIVE_THREAD_DETAIL",
      payload: { threadDetail: { id: 1, title: "Thread Title" } },
    };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState).toBe(action.payload.threadDetail);
  });

  it("should return null when given by CLEAR_THREAD_DETAIL action", () => {
    const initialState = null;
    const action = {
      type: "CLEAR_THREAD_DETAIL",
    };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState).toBe(null);
  });

  it("should return the thread detail with upvoted thread when given by UP_VOTE_THREAD_DETAIL action", () => {
    const userId = "user-1";
    const initialState = { upVotesBy: [], downVotesBy: [] };
    const action = {
      type: "UP_VOTE_THREAD_DETAIL",
      payload: {
        userId,
      },
    };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState).toEqual({
      ...initialState,
      upVotesBy: [action.payload.userId],
    });
  });

  it("should return the thread detail with upvoted thread and remove down voted if any when given by UP_VOTE_THREAD_DETAIL action", () => {
    const userId = "user-1";
    const initialState = { upVotesBy: [], downVotesBy: [userId] };
    const action = {
      type: "UP_VOTE_THREAD_DETAIL",
      payload: {
        userId,
      },
    };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState).toEqual({
      upVotesBy: [action.payload.userId],
      downVotesBy: [],
    });
  });

  it("should return the thread detail with no up voted thread if previously has up voted when given by UP_VOTE_TREAD_DETAIL action", () => {
    const userId = "user-1";
    const initialState = { upVotesBy: [userId], downVotesBy: [] };
    const action = {
      type: "UP_VOTE_THREAD_DETAIL",
      payload: {
        userId,
      },
    };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState).toEqual({ ...initialState, upVotesBy: [] });
  });

  it("should return the thread detail with downvoted thread when given by DOWN_VOTE_THREAD_DETAIL action", () => {
    const initialState = { upVotesBy: [], downVotesBy: [] };
    const action = {
      type: "DOWN_VOTE_THREAD_DETAIL",
      payload: {
        userId: "user-id-1",
      },
    };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState).toEqual({
      ...initialState,
      downVotesBy: [action.payload.userId],
    });
  });

  it("should return the thread detail with downvoted thread and remove up voted if any when given by DOWN_VOTE_THREAD_DETAIL action", () => {
    const userId = "user-1";
    const initialState = { upVotesBy: [userId], downVotesBy: [] };
    const action = {
      type: "DOWN_VOTE_THREAD_DETAIL",
      payload: {
        userId,
      },
    };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState).toEqual({
      upVotesBy: [],
      downVotesBy: [action.payload.userId],
    });
  });

  it("should return the thread detail with no down voted thread if previously has down voted when given by DOWN_VOTE_TREAD_DETAIL action", () => {
    const userId = "user-1";
    const initialState = { upVotesBy: [], downVotesBy: [userId] };
    const action = {
      type: "DOWN_VOTE_THREAD_DETAIL",
      payload: {
        userId,
      },
    };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState).toEqual({ ...initialState, downVotesBy: [] });
  });

  it("should return the thead detail with no up voted if previously has up voted when given by NEUTRAL_VOTE_THREAD_DETAIL action", () => {
    const userId = "user-1";
    const initialState = { upVotesBy: [userId], downVotesBy: [] };
    const action = {
      type: "NEUTRAL_VOTE_THREAD_DETAIL",
      payload: {
        userId,
      },
    };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState).toEqual({ ...initialState, upVotesBy: [] });
  });

  it("should return the thead detail with no down voted if previously has down voted when given by NEUTRAL_VOTE_THREAD_DETAIL action", () => {
    const userId = "user-1";
    const initialState = { upVotesBy: [], downVotesBy: [userId] };
    const action = {
      type: "NEUTRAL_VOTE_THREAD_DETAIL",
      payload: {
        userId,
      },
    };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState).toEqual({ ...initialState, downVotesBy: [] });
  });

  it("should return the thread detail with added new comment when given CREATE_COMMENT_THREAD_DETAIL action", () => {
    const comment = "new-comment";
    const initialState = { comments: ["prev-comment"] };
    const action = {
      type: "CREATE_COMMENT_THREAD_DETAIL",
      payload: {
        comment,
      },
    };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState).toEqual({
      comments: [action.payload.comment, ...initialState.comments],
    });
  });

  it("should return the thread detail with upvoted comment when given by UP_VOTE_COMMENT_THREAD_DETAIL action", () => {
    const userId = "user-1";
    const commentId = "comment-1";
    const comment = {
      id: commentId,
      upVotesBy: [],
      downVotesBy: [],
    };
    const initialState = { comments: [comment] };
    const action = {
      type: "UP_VOTE_COMMENT_THREAD_DETAIL",
      payload: {
        userId,
        commentId,
      },
    };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState).toEqual({
      comments: [
        {
          ...initialState.comments[0],
          upVotesBy: [action.payload.userId],
        },
      ],
    });
  });

  it("should return the thread detail with upvoted comment and remove down voted if any when given by UP_VOTE_COMMENT_THREAD_DETAIL action", () => {
    const userId = "user-1";
    const commentId = "comment-1";
    const comment = {
      id: commentId,
      upVotesBy: [],
      downVotesBy: [userId],
    };
    const initialState = { comments: [comment] };
    const action = {
      type: "UP_VOTE_COMMENT_THREAD_DETAIL",
      payload: {
        userId,
        commentId,
      },
    };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState).toEqual({
      comments: [
        {
          ...initialState.comments[0],
          upVotesBy: [action.payload.userId],
          downVotesBy: [],
        },
      ],
    });
  });

  it("should return the thread detail with no up voted comment if previously has up voted when given by UP_VOTE_COMMENT_THREAD_DETAIL action", () => {
    const userId = "user-1";
    const commentId = "comment-1";
    const comment = {
      id: commentId,
      upVotesBy: [userId],
      downVotesBy: [],
    };
    const initialState = { comments: [comment] };
    const action = {
      type: "UP_VOTE_COMMENT_THREAD_DETAIL",
      payload: {
        userId,
        commentId,
      },
    };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState).toEqual({
      comments: [
        {
          ...initialState.comments[0],
          upVotesBy: [],
        },
      ],
    });
  });

  it("should return the thread detail with down voted comment when given by DOWN_VOTE_COMMENT_THREAD_DETAIL action", () => {
    const userId = "user-1";
    const commentId = "comment-1";
    const comment = {
      id: commentId,
      upVotesBy: [],
      downVotesBy: [],
    };
    const initialState = { comments: [comment] };
    const action = {
      type: "DOWN_VOTE_COMMENT_THREAD_DETAIL",
      payload: {
        userId,
        commentId,
      },
    };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState).toEqual({
      comments: [
        {
          ...initialState.comments[0],
          downVotesBy: [action.payload.userId],
        },
      ],
    });
  });

  it("should return the thread detail with down voted comment and remove up voted if any when given by DOWN_VOTE_COMMENT_THREAD_DETAIL action", () => {
    const userId = "user-1";
    const commentId = "comment-1";
    const comment = {
      id: commentId,
      upVotesBy: [userId],
      downVotesBy: [],
    };
    const initialState = { comments: [comment] };
    const action = {
      type: "DOWN_VOTE_COMMENT_THREAD_DETAIL",
      payload: {
        userId,
        commentId,
      },
    };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState).toEqual({
      comments: [
        {
          ...initialState.comments[0],
          upVotesBy: [],
          downVotesBy: [action.payload.userId],
        },
      ],
    });
  });
  
  it("should return the thread detail with no down voted comment if previously has down voted when given by DOWN_VOTE_COMMENT_THREAD_DETAIL action", () => {
    const userId = "user-1";
    const commentId = "comment-1";
    const comment = {
      id: commentId,
      upVotesBy: [],
      downVotesBy: [userId],
    };
    const initialState = { comments: [comment] };
    const action = {
      type: "DOWN_VOTE_COMMENT_THREAD_DETAIL",
      payload: {
        userId,
        commentId,
      },
    };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState).toEqual({
      comments: [
        {
          ...initialState.comments[0],
          downVotesBy: [],
        },
      ],
    });
  });
  
  it('should return the thead detail with no up voted comment if previously has up voted when given by NEUTRAL_VOTE_COMMENT_THREAD_DETAIL action', () => {
    const userId = "user-1";
    const commentId = "comment-1";
    const comment = {
      id: commentId,
      upVotesBy: [userId],
      downVotesBy: [],
    };
    const initialState = { comments: [comment] };
    const action = {
      type: "NEUTRAL_VOTE_COMMENT_THREAD_DETAIL",
      payload: {
        userId,
        commentId,
      },
    };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState).toEqual({
      comments: [
        {
          ...initialState.comments[0],
          upVotesBy: [],
        },
      ],
    });
  })
  
  it('should return the thead detail with no down voted comment if previously has down voted when given by NEUTRAL_VOTE_COMMENT_THREAD_DETAIL action', () => {
    const userId = "user-1";
    const commentId = "comment-1";
    const comment = {
      id: commentId,
      upVotesBy: [],
      downVotesBy: [userId],
    };
    const initialState = { comments: [comment] };
    const action = {
      type: "NEUTRAL_VOTE_COMMENT_THREAD_DETAIL",
      payload: {
        userId,
        commentId,
      },
    };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState).toEqual({
      comments: [
        {
          ...initialState.comments[0],
          downVotesBy: [],
        },
      ],
    });
  })
});
