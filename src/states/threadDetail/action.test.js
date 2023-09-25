/**
 * skenario test
 *
 * - asyncReceiveThreadDetail thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call toast error correctly when data fetching failed
 * - asyncUpVoteThreadDetail thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call toast error correctly when data fetching failed
 * - asyncDownVoteThreadDetail thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call toast error correctly when data fetching failed
 * - asyncNeutralVoteThreadDetail thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and toast error correctly when data fetching failed from up voted thread
 *  - should dispatch action and toast error correctly when data fetching failed from down voted thread
 * - asyncCreateComment thunk
 *  - should dispatch action and call toast success correctly when data fetching success
 *  - should dispatch action and call toast error correctly when data fetching failed
 * - asyncUpVoteCommentThreadDetail thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call toast error correctly when data fetching failed
 * - asyncDownVoteCommentThreadDetail thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call toast error correctly when data fetching failed
 * - asyncNeutralVoteCommentThreadDetail thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call toast error correctly when data fetching failed from up voted comment
 *  - should dispatch action and call toast error correctly when data fetching failed from down voted comment
*/

import { describe, beforeEach, afterEach, it, vi, expect } from "vitest";
import { hideLoading, showLoading } from "react-redux-loading-bar";
import toast from "react-hot-toast";
import api from "../../utils/api";
import {
  createCommentActionCreator,
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  upVoteThreadDetailActionCreator,
  downVoteThreadDetailActionCreator,
  neutralVoteThreadDetailActionCreator,
  upVoteCommentThreadDetailActionCreator,
  downVoteCommentThreadDetailActionCreator,
  neutralVoteCommentThreadDetailActionCreator,
  asyncReceiveThreadDetail,
  asyncUpVoteThreadDetail,
  asyncDownVoteThreadDetail,
  asyncNeutralVoteThreadDetail,
  asyncCreateComment,
  asyncUpVoteCommentThreadDetail,
  asyncDownVoteCommentThreadDetail,
  asyncNeutralVoteCommentThreadDetail,
} from "./action";

const fakeThreadDetailResponse = {
  error: false,
  message: "success",
  data: {
    id: "thread-1",
    title: "Thread Pertama",
    body: "Ini adalah thread pertama",
    category: "General",
    createdAt: "2021-06-21T07:00:00.000Z",
    owner: {
      id: "users-1",
      name: "John Doe",
      avatar: "https://generated-image-url.jpg",
    },
    upVotesBy: [],
    downVotesBy: [],
    comments: [
      {
        id: "comment-1",
        content: "Ini adalah komentar pertama",
        createdAt: "2021-06-21T07:00:00.000Z",
        owner: {
          id: "users-1",
          name: "John Doe",
          avatar: "https://generated-image-url.jpg",
        },
        upVotesBy: [],
        downVotesBy: [],
      },
    ],
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

const fakeCreateCommentResponse = {
  error: false,
  message: "success",
  data: {
    id: "comment-1",
    content: "Ini adalah komentar pertama",
    createdAt: "2021-06-21T07:00:00.000Z",
    upVotesBy: [],
    downVotesBy: [],
    owner: {
      id: "users-1",
      name: "John Doe",
      email: "john@example.com",
    },
  },
};

const fakeUpVoteCommentResponse = {
  error: false,
  message: "success",
  data: {
    id: "vote-1",
    userId: "users-1",
    commentId: "comment-1",
    voteType: 1,
  },
};

const fakeDownVoteCommentResponse = {
  error: false,
  message: "success",
  data: {
    id: "vote-1",
    userId: "users-1",
    commentId: "comment-1",
    voteType: -1,
  },
};

const fakeNeutralVoteCommentResponse = {
  error: false,
  message: "success",
  data: {
    id: "vote-1",
    userId: "users-1",
    commentId: "comment-1",
    voteType: 0,
  },
};

const fakeErrorResponse = {
  error: true,
  message: "failed",
  data: null,
};

const threadId = "thread-1";
const commentId = "comment-1";
const userId = "user-1";
const content = "content";

describe("asyncReceiveThreadDetail thunk", () => {
  beforeEach(() => {
    api._getThreadDetail = api.getThreadDetail;
    toast._error = toast.error;
  });

  afterEach(() => {
    api.getThreadDetail = api._getThreadDetail;
    toast.error = toast._error;

    delete api._getThreadDetail;
    delete toast._error;
  });

  it("should dispatch action correctly when data fetching success", async () => {
    api.getThreadDetail = () => Promise.resolve(fakeThreadDetailResponse);

    const dispatch = vi.fn();

    await asyncReceiveThreadDetail(1)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(clearThreadDetailActionCreator());
    expect(dispatch).toHaveBeenCalledWith(
      receiveThreadDetailActionCreator(fakeThreadDetailResponse.data),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it("should dispatch action and call toast error correctly when data fetching failed", async () => {
    api.getThreadDetail = () => Promise.resolve(fakeErrorResponse);

    const dispatch = vi.fn();
    toast.error = vi.fn();

    await asyncReceiveThreadDetail(1)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(clearThreadDetailActionCreator());
    expect(toast.error).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});

describe("asyncUpVoteThreadDetail thunk", () => {
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

    await asyncUpVoteThreadDetail({ threadId })(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      upVoteThreadDetailActionCreator({ userId }),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it("should dispatch action and call toast error correctly when data fetching failed", async () => {
    api.upVoteThread = () => Promise.resolve(fakeErrorResponse);
    const getState = () => ({ authUser: { id: userId } });

    const dispatch = vi.fn();
    toast.error = vi.fn();

    await asyncUpVoteThreadDetail({ threadId })(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      upVoteThreadDetailActionCreator({ userId }),
    );
    expect(toast.error).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(
      neutralVoteThreadDetailActionCreator({ userId }),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});

describe("asyncDownVoteThreadDetail thunk", () => {
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

    await asyncDownVoteThreadDetail({ threadId })(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      downVoteThreadDetailActionCreator({ userId }),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it("should dispatch action and call toast error correctly when data fetching failed", async () => {
    api.downVoteThread = () => Promise.resolve(fakeErrorResponse);
    const getState = () => ({ authUser: { id: userId } });

    const dispatch = vi.fn();
    toast.error = vi.fn();

    await asyncDownVoteThreadDetail({ threadId })(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      downVoteThreadDetailActionCreator({ userId }),
    );
    expect(toast.error).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(
      neutralVoteThreadDetailActionCreator({ userId }),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});

describe("asyncNeutralVoteThreadDetail thunk", () => {
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

    await asyncNeutralVoteThreadDetail({ threadId })(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      neutralVoteThreadDetailActionCreator({ userId }),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it("should dispatch action and call toast error correctly when data fetching failed from up voted thread", async () => {
    api.neutralVoteThread = () => Promise.resolve(fakeErrorResponse);
    const getState = () => ({ authUser: { id: userId } });

    const dispatch = vi.fn();
    toast.error = vi.fn();

    await asyncNeutralVoteThreadDetail({ threadId, neutralFromUp: true })(
      dispatch,
      getState,
    );

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      neutralVoteThreadDetailActionCreator({ userId }),
    );
    expect(toast.error).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(
      upVoteThreadDetailActionCreator({ userId }),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it("should dispatch action and call toast error correctly when data fetching failed from down voted thread", async () => {
    api.neutralVoteThread = () => Promise.resolve(fakeErrorResponse);
    const getState = () => ({ authUser: { id: userId } });

    const dispatch = vi.fn();
    toast.error = vi.fn();

    await asyncNeutralVoteThreadDetail({ threadId, neutralFromDown: true })(
      dispatch,
      getState,
    );

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      neutralVoteThreadDetailActionCreator({ userId }),
    );
    expect(toast.error).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(
      downVoteThreadDetailActionCreator({ userId }),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});

describe("asyncCreateComment thunk", () => {
  beforeEach(() => {
    api._createComment = api.createComment;
    toast._error = toast.error;
    toast._success = toast.success;
  });
  afterEach(() => {
    api.createComment = api._createComment;
    toast.error = toast._error;
    toast.success = toast._success;

    delete api._createComment;
    delete toast._error;
    delete toast._success;
  });
  it("should dispatch action and call toast success correctly when data fetching success", async () => {
    api.createComment = () => Promise.resolve(fakeCreateCommentResponse);

    const dispatch = vi.fn();
    toast.success = vi.fn();

    await asyncCreateComment({ threadId, content })(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      createCommentActionCreator({ comment: fakeCreateCommentResponse.data }),
    );
    expect(toast.success).toHaveBeenCalledWith("Comment Created");
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it("should dispatch action and call toast error correctly when data fetching failed", async () => {
    api.createComment = () => Promise.resolve(fakeErrorResponse);

    const dispatch = vi.fn();
    toast.error = vi.fn();

    await asyncCreateComment({ threadId, content })(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(toast.error).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});

describe("asyncUpVoteCommentThreadDetail thunk", () => {
  beforeEach(() => {
    api._upVoteComment = api.upVoteComment;
    toast._error = toast.error;
  });

  afterEach(() => {
    api.upVoteComment = api._upVoteComment;
    toast.error = toast._error;

    delete api._upVoteComment;
    delete toast._error;
  });

  it("should dispatch action correctly when data fetching success", async () => {
    api.upVoteComment = () => Promise.resolve(fakeUpVoteCommentResponse);

    const getState = () => ({ authUser: { id: userId } });
    const dispatch = vi.fn();

    await asyncUpVoteCommentThreadDetail({ threadId, commentId })(
      dispatch,
      getState,
    );

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      upVoteCommentThreadDetailActionCreator({ userId, commentId }),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it("should dispatch action and call toast error correctly when data fetching failed", async () => {
    api.upVoteComment = () => Promise.resolve(fakeErrorResponse);
    const getState = () => ({ authUser: { id: userId } });
    const dispatch = vi.fn();
    toast.error = vi.fn();

    await asyncUpVoteCommentThreadDetail({ threadId, commentId })(
      dispatch,
      getState,
    );

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      upVoteCommentThreadDetailActionCreator({ userId, commentId }),
    );
    expect(toast.error).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(
      neutralVoteCommentThreadDetailActionCreator({ userId, commentId }),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});

describe("asyncDownVoteCommentThreadDetail thunk", () => {
  beforeEach(() => {
    api._upVoteComment = api.upVoteComment;
    api._downVoteComment = api.downVoteComment;
    toast._error = toast.error;
  });

  afterEach(() => {
    api.upVoteComment = api._upVoteComment;
    api.downVoteComment = api._downVoteComment;
    toast.error = toast._error;

    delete api._upVoteComment;
    delete api._downVoteComment;
    delete toast._error;
  });

  it("should dispatch action correctly when data fetching success", async () => {
    api.downVoteComment = () => Promise.resolve(fakeDownVoteCommentResponse);

    const getState = () => ({ authUser: { id: userId } });
    const dispatch = vi.fn();

    await asyncDownVoteCommentThreadDetail({ threadId, commentId })(
      dispatch,
      getState,
    );

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      downVoteCommentThreadDetailActionCreator({ userId, commentId }),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it("should dispatch action and call toast error correctly when data fetching failed", async () => {
    api.downVoteComment = () => Promise.resolve(fakeErrorResponse);
    const getState = () => ({ authUser: { id: userId } });
    const dispatch = vi.fn();
    toast.error = vi.fn();

    await asyncDownVoteCommentThreadDetail({ threadId, commentId })(
      dispatch,
      getState,
    );

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      downVoteCommentThreadDetailActionCreator({ userId, commentId }),
    );
    expect(toast.error).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(
      neutralVoteCommentThreadDetailActionCreator({ userId, commentId }),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});

describe("asyncNeutralVoteCommentThreadDetail thunk", () => {
  beforeEach(() => {
    api._neutralComment = api.neutralComment;
    toast._error = toast.error;
  });

  afterEach(() => {
    api.neutralComment = api._neutralComment;
    toast.error = toast._error;

    delete api._neutralComment;
    delete toast._error;
  });

  it("should dispatch action correctly when data fetching success", async () => {
    api.neutralComment = () => Promise.resolve(fakeNeutralVoteCommentResponse);
    const getState = () => ({ authUser: { id: userId } });
    const dispatch = vi.fn();

    await asyncNeutralVoteCommentThreadDetail({ threadId, commentId })(
      dispatch,
      getState,
    );

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      neutralVoteCommentThreadDetailActionCreator({ userId, commentId }),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it("should dispatch action and call toast error correctly when data fetching failed from up voted comment", async () => {
    api.neutralComment = () => Promise.resolve(fakeErrorResponse);
    const getState = () => ({ authUser: { id: userId } });
    const dispatch = vi.fn();
    toast.error = vi.fn();

    await asyncNeutralVoteCommentThreadDetail({
      threadId,
      commentId,
      neutralFromUp: true,
    })(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      neutralVoteCommentThreadDetailActionCreator({ userId, commentId }),
    );
    expect(toast.error).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(
      upVoteCommentThreadDetailActionCreator({ commentId, userId }),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it("should dispatch action and call toast error correctly when data fetching failed from down voted comment", async () => {
    api.neutralComment = () => Promise.resolve(fakeErrorResponse);
    const getState = () => ({ authUser: { id: userId } });
    const dispatch = vi.fn();
    toast.error = vi.fn();

    await asyncNeutralVoteCommentThreadDetail({
      threadId,
      commentId,
      neutralFromDown: true,
    })(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      neutralVoteCommentThreadDetailActionCreator({ userId, commentId }),
    );
    expect(toast.error).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(
      downVoteCommentThreadDetailActionCreator({ commentId, userId }),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
