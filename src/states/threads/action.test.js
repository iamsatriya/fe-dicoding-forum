/**
 * skenario test
 *
 * - asyncCreateThread thunk
 *  - should dispatch action and call toast success correctly when data fetching success
 *  - should dispatch action and call toast error correctly when data fetching failed
 * - asyncUpVoteThread thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action correctly when data fetching failed
 * - asyncDownVoteThread thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action correctly when data fetching failed
 * - asyncNeutralVoteThread thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call toast error correctly when data fetching failed from up voted thread
 *  - should dispatch action and call toast error correctly when data fetching failed from down voted thread
 */

import { describe, beforeEach, afterEach, it, vi, expect } from "vitest";
import { hideLoading, showLoading } from "react-redux-loading-bar";
import toast from "react-hot-toast";
import api from "../../utils/api";
import {
  createThreadActionCreator,
  upVoteThreadActionCreator,
  downVoteThreadActionCreator,
  neutralVoteThreadActionCreator,
  asyncCreateThread,
  asyncUpVoteThread,
  asyncDownVoteThread,
  asyncNeutralVoteThread,
} from "./action";

const fakeCreateThreadResponse = {
  error: false,
  message: "success",
  data: {
    id: "thread-1",
    title: "Thread Pertama",
    body: "Ini adalah thread pertama",
    category: "General",
    createdAt: "2021-06-21T07:00:00.000Z",
    ownerId: "users-1",
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
  },
};

const fakeUpVoteThreadResponse = {
  error: false,
  message: "success",
  data: {
    id: "vote-1",
    userId: "users-1",
    threadId: "thread-1",
    voteType: 1,
  },
};
const fakeDownVoteThreadResponse = {
  error: false,
  message: "success",
  data: {
    id: "vote-1",
    userId: "users-1",
    threadId: "thread-1",
    voteType: -1,
  },
};
const fakeNeutralVoteThreadResponse = {
  error: false,
  message: "success",
  data: {
    id: "vote-1",
    userId: "users-1",
    threadId: "thread-1",
    voteType: 0,
  },
};

const fakeErrorResponse = {
  error: true,
  message: "failed",
  data: null,
};

const title = "title";
const body = "body";
const category = "category";
const threadId = "thread-1";
const userId = "user-1";

describe("asyncCreateThread thunk", () => {
  beforeEach(() => {
    api._createThread = api.createThread;
    toast._error = toast.error;
    toast._success = toast.success;
  });

  afterEach(() => {
    api.createThread = api._createThread;
    toast.error = toast._error;
    toast.success = toast._success;

    delete api._createThread;
    delete toast._error;
    delete toast._success;
  });

  it("should dispatch action and call toast success correctly when data fetching success", async () => {
    api.createThread = () => Promise.resolve(fakeCreateThreadResponse);

    const dispatch = vi.fn();
    toast.success = vi.fn();

    await asyncCreateThread({ title, body, category })(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      createThreadActionCreator(fakeCreateThreadResponse.data),
    );
    expect(toast.success).toHaveBeenCalledWith("Thread created");
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it("should dispatch action and call toast error correctly when data fetching failed", async () => {
    api.createThread = () => Promise.resolve(fakeErrorResponse);
    const dispatch = vi.fn();
    toast.error = vi.fn();

    await asyncCreateThread({ title, body, category })(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(toast.error).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});

describe("asyncUpVoteThread thunk", () => {
  beforeEach(() => {
    api._upVoteThread = api.upVoteThread;
    toast._error = toast.error;
  });

  afterEach(() => {
    api.upVoteThread = api._upVoteThread;
    toast.error = toast._error;

    delete api._upVoteThread;
    delete toast._error;
  });

  it("should dispatch action correctly when data fetching success", async () => {
    api.upVoteThread = () => Promise.resolve(fakeUpVoteThreadResponse);
    const getState = () => ({ authUser: { id: userId } });
    const dispatch = vi.fn();

    await asyncUpVoteThread({ threadId })(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      upVoteThreadActionCreator({ threadId, userId }),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it("should dispatch action correctly when data fetching failed", async () => {
    api.upVoteThread = () => Promise.resolve(fakeErrorResponse);
    const getState = () => ({ authUser: { id: userId } });
    const dispatch = vi.fn();
    toast.error = vi.fn();

    await asyncUpVoteThread({ threadId })(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      upVoteThreadActionCreator({ threadId, userId }),
    );
    expect(toast.error).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(
      neutralVoteThreadActionCreator({ threadId, userId }),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});

describe("asyncDownVoteThread thunk", () => {
  beforeEach(() => {
    api._downVoteThread = api.downVoteThread;
    toast._error = toast.error;
  });

  afterEach(() => {
    api.downVoteThread = api._downVoteThread;
    toast.error = toast._error;

    delete api._downVoteThread;
    delete toast._error;
  });

  it("should dispatch action correctly when data fetching success", async () => {
    api.downVoteThread = () => Promise.resolve(fakeDownVoteThreadResponse);
    const getState = () => ({ authUser: { id: userId } });
    const dispatch = vi.fn();

    await asyncDownVoteThread({ threadId })(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      downVoteThreadActionCreator({ threadId, userId }),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it("should dispatch action correctly when data fetching failed", async () => {
    api.downVoteThread = () => Promise.resolve(fakeErrorResponse);
    const getState = () => ({ authUser: { id: userId } });
    const dispatch = vi.fn();
    toast.error = vi.fn();

    await asyncDownVoteThread({ threadId })(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      downVoteThreadActionCreator({ threadId, userId }),
    );
    expect(toast.error).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(
      neutralVoteThreadActionCreator({ threadId, userId }),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});

describe("asyncNeutralVoteThread thunk", () => {
  beforeEach(() => {
    api._neutralVoteThread = api.neutralVoteThread;
    toast._error = toast.error;
  });

  afterEach(() => {
    api.neutralVoteThread = api._neutralVoteThread;
    toast.error = toast._error;

    delete api._neutralVoteThread;
    delete toast._error;
  });

  it("should dispatch action correctly when data fetching success", async () => {
    api.neutralVoteThread = () =>
      Promise.resolve(fakeNeutralVoteThreadResponse);
    const getState = () => ({ authUser: { id: userId } });
    const dispatch = vi.fn();

    await asyncNeutralVoteThread({ threadId })(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      neutralVoteThreadActionCreator({ threadId, userId }),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it("should dispatch action and toast error correctly when data fetching failed from up voted thread", async () => {
    api.neutralVoteThread = () => Promise.resolve(fakeErrorResponse);
    const getState = () => ({ authUser: { id: userId } });
    const dispatch = vi.fn();
    toast.error = vi.fn();

    await asyncNeutralVoteThread({ threadId, neutralFromUp: true })(
      dispatch,
      getState,
    );

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      neutralVoteThreadActionCreator({ threadId, userId }),
    );
    expect(toast.error).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(
      upVoteThreadActionCreator({ threadId, userId }),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it("should dispatch action and toast error correctly when data fetching failed from down voted thread", async () => {
    api.neutralVoteThread = () => Promise.resolve(fakeErrorResponse);
    const getState = () => ({ authUser: { id: userId } });
    const dispatch = vi.fn();
    toast.error = vi.fn();

    await asyncNeutralVoteThread({ threadId, neutralFromDown: true })(
      dispatch,
      getState,
    );

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      neutralVoteThreadActionCreator({ threadId, userId }),
    );
    expect(toast.error).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(
      downVoteThreadActionCreator({ threadId, userId }),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
