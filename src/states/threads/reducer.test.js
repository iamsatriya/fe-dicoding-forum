/**
 * test scenario for threadsReducer
 *
 * - threadsReducer function
 *  - should return the initial state when given by unknown action
 *  - should return the threads list when given by RECEIVE_THREADS action
 *  - should return the thread list with new added thread when given by CREATE_THREAD action
 *  - should return the thread list with upvoted thread when given by UP_VOTE_THREAD action
 *  - should return the thread list with upvoted thread and removed downvoted if any when given by UP_VOTE_THREAD action
 *  - should return the thread list with no up voted thread if previously has up voted when given by UP_VOTE_THREAD action
 *  - should return the thread list with downvoted thread when given by DOWN_VOTE_THREAD action
 *  - should return the thread list with downvoted thread and removed upvoted if any when given by DOWN_VOTE_THREAD action
 *  - should return the thread list with no down voted thread if previously has down voted when given by DOWN_VOTE_THREAD action
 *  - should return the thread list with no up voted therad if previously has up voted when given by NEUTRAL_VOTE_THREAD action
 *  - should return the thread list with no down voted therad if previously has down voted when given by NEUTRAL_VOTE_THREAD action
 */

import { describe, it, expect } from "vitest";
import threadsReducer from "./reducer";

describe("threadsReducer function", () => {
  it("should return the initial state when given by unknown action", () => {
    const initialState = [];
    const action = {
      type: "UNKNOWN",
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toBe(initialState);
  });

  it("should return the threads list when given by RECEIVE_THREADS action", () => {
    const initialState = [];
    const thread = { id: 1, title: "thread-1" };
    const action = {
      type: "RECEIVE_THREADS",
      payload: {
        threads: [thread],
      },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toBe(action.payload.threads);
  });

  it("should return the thread list with new added thread when given by CREATE_THREAD action", () => {
    const initialState = [];
    const thread = { id: 1, title: "thread-1" };
    const action = {
      type: "RECEIVE_THREADS",
      payload: {
        threads: thread,
      },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toBe(action.payload.threads);
  });

  it("should return the thread list with upvoted thread when given by UP_VOTE_THREAD action", () => {
    const userId = "user-1";
    const initialState = [{ upVotesBy: [], downVotesBy: [] }];
    const action = {
      type: "UP_VOTE_THREAD",
      payload: {
        userId,
      },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual([
      {
        ...initialState[0],
        upVotesBy: [action.payload.userId],
      },
    ]);
  });

  it("should return the thread list with upvoted thread and removed downvoted if any when given by UP_VOTE_THREAD action", () => {
    const userId = "user-1";
    const initialState = [{ upVotesBy: [], downVotesBy: [userId] }];
    const action = {
      type: "UP_VOTE_THREAD",
      payload: {
        userId,
      },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual([
      {
        ...initialState[0],
        upVotesBy: [action.payload.userId],
        downVotesBy: [],
      },
    ]);
  });

  it("should return the thread list with no up voted thread if previously has up voted when given by UP_VOTE_THREAD action", () => {
    const userId = "user-1";
    const initialState = [{ upVotesBy: [userId], downVotesBy: [] }];
    const action = {
      type: "UP_VOTE_THREAD",
      payload: {
        userId,
      },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual([
      {
        ...initialState[0],
        upVotesBy: [],
      },
    ]);
  });

  it("should return the thread list with downvoted thread when given by DOWN_VOTE_THREAD action", () => {
    const userId = "user-1";
    const initialState = [{ upVotesBy: [], downVotesBy: [] }];
    const action = {
      type: "DOWN_VOTE_THREAD",
      payload: {
        userId,
      },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual([
      {
        ...initialState[0],
        downVotesBy: [action.payload.userId],
      },
    ]);
  });

  it("should return the thread list with downvoted thread and removed upvoted if any when given by DOWN_VOTE_THREAD action", () => {
    const userId = "user-1";
    const initialState = [{ upVotesBy: [userId], downVotesBy: [] }];
    const action = {
      type: "DOWN_VOTE_THREAD",
      payload: {
        userId,
      },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual([
      {
        ...initialState[0],
        downVotesBy: [action.payload.userId],
        upVotesBy: [],
      },
    ]);
  });

  it("should return the thread list with no down voted thread if previously has down voted when given by DOWN_VOTE_THREAD action", () => {
    const userId = "user-1";
    const initialState = [{ upVotesBy: [], downVotesBy: [userId] }];
    const action = {
      type: "DOWN_VOTE_THREAD",
      payload: {
        userId,
      },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual([
      {
        ...initialState[0],
        downVotesBy: [],
      },
    ]);
  });
  
  it("should return the thread list with no up voted therad if previously has up voted when given by NEUTRAL_VOTE_THREAD action", () => {
    const userId = "user-1";
    const initialState = [{ upVotesBy: [userId], downVotesBy: [] }];
    const action = {
      type: "NEUTRAL_VOTE_THREAD",
      payload: {
        userId,
      },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual([
      {
        ...initialState[0],
        upVotesBy: [],
      },
    ]);
  });
  
  it("should return the thread list with no down voted therad if previously has down voted when given by NEUTRAL_VOTE_THREAD action", () => {
    const userId = "user-1";
    const initialState = [{ upVotesBy: [], downVotesBy: [userId] }];
    const action = {
      type: "NEUTRAL_VOTE_THREAD",
      payload: {
        userId,
      },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual([
      {
        ...initialState[0],
        downVotesBy: [],
      },
    ]);
  });
});
