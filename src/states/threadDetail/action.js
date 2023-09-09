import { hideLoading, showLoading } from "react-redux-loading-bar";
import toast from "react-hot-toast";
import api from "../../utils/api";

const ActionType = {
  RECEIVE_THREAD_DETAIL: "RECEIVE_THREAD_DETAIL",
  CLEAR_THREAD_DETAIL: "CLEAR_THREAD_DETAIL",
  UP_VOTE_THREAD_DETAIL: "UP_VOTE_THREAD_DETAIL",
  DOWN_VOTE_THREAD_DETAIL: "DOWN_VOTE_THREAD_DETAIL",
  NEUTRAL_VOTE_THREAD_DETAIL: "NEUTRAL_VOTE_THREAD_DETAIL",
  CREATE_COMMENT_THREAD_DETAIL: "CREATE_COMMENT_THREAD_DETAIL",
  UP_VOTE_COMMENT_THREAD_DETAIL: "UP_VOTE_COMMENT_THREAD_DETAIL",
  DOWN_VOTE_COMMENT_THREAD_DETAIL: "DOWN_VOTE_COMMENT_THREAD_DETAIL",
  NEUTRAL_VOTE_COMMENT_THREAD_DETAIL: "NEUTRAL_VOTE_COMMENT_THREAD_DETAIL",
};

function receiveThreadDetailActionCreator(threadDetail) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: {
      threadDetail,
    },
  };
}

function clearThreadDetailActionCreator() {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL,
  };
}

function upVoteThreadDetailActionCreator({ userId }) {
  return {
    type: ActionType.UP_VOTE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
}

function downVoteThreadDetailActionCreator({ userId }) {
  return {
    type: ActionType.DOWN_VOTE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
}

function neutralVoteThreadDetailActionCreator({ userId }) {
  return {
    type: ActionType.NEUTRAL_VOTE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
}

function createCommentActionCreator({ comment }) {
  return {
    type: ActionType.CREATE_COMMENT_THREAD_DETAIL,
    payload: {
      comment,
    },
  };
}

function upVoteCommentThreadDetailActionCreator({ userId, commentId }) {
  return {
    type: ActionType.UP_VOTE_COMMENT_THREAD_DETAIL,
    payload: {
      userId,
      commentId,
    },
  };
}

function downVoteCommentThreadDetailActionCreator({ userId, commentId }) {
  return {
    type: ActionType.DOWN_VOTE_COMMENT_THREAD_DETAIL,
    payload: {
      userId,
      commentId,
    },
  };
}

function neutralVoteCommentThreadDetailActionCreator({ userId, commentId }) {
  return {
    type: ActionType.NEUTRAL_VOTE_COMMENT_THREAD_DETAIL,
    payload: {
      userId,
      commentId,
    },
  };
}

function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(clearThreadDetailActionCreator());
    const { error, message, data } = await api.getThreadDetail({ threadId });
    if (error) {
      toast.error(message);
    } else {
      dispatch(receiveThreadDetailActionCreator(data));
    }
    dispatch(hideLoading());
  };
}

function asyncUpVoteThreadDetail({ threadId }) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser } = getState();
    dispatch(
      upVoteThreadDetailActionCreator({
        userId: authUser.id,
      }),
    );
    const { error, message } = await api.upVoteThread({ threadId });
    if (error) {
      toast.error(message);
      dispatch(
        neutralVoteThreadDetailActionCreator({
          userId: authUser.id,
        }),
      );
    }
    dispatch(hideLoading());
  };
}

function asyncDownVoteThreadDetail({ threadId }) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser } = getState();
    dispatch(
      downVoteThreadDetailActionCreator({
        userId: authUser.id,
      }),
    );
    const { error, message } = await api.downVoteThread({ threadId });
    if (error) {
      toast.error(message);
      dispatch(
        neutralVoteThreadDetailActionCreator({
          userId: authUser.id,
        }),
      );
    }
    dispatch(hideLoading());
  };
}

function asyncNeutralVoteThreadDetail({
  threadId,
  neutralFromUp = false,
  neutralFromDown = false,
}) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser } = getState();
    dispatch(neutralVoteThreadDetailActionCreator({ userId: authUser.id }));
    const { error, message } = await api.neutralVoteThread({ threadId });
    if (error) {
      toast.error(message);
      if (neutralFromUp) {
        dispatch(upVoteThreadDetailActionCreator({ userId: authUser.id }));
      }
      if (neutralFromDown) {
        dispatch(downVoteThreadDetailActionCreator({ userId: authUser.id }));
      }
    }
    dispatch(hideLoading());
  };
}

function asyncCreateComment({ threadId, content }) {
  return async (dispatch) => {
    dispatch(showLoading());
    const { error, message, data } = await api.createComment({
      threadId,
      content,
    });
    if (error) {
      toast.error(message);
    } else {
      dispatch(createCommentActionCreator({ comment: data }));
      toast.success("Comment Created");
    }
    dispatch(hideLoading());
  };
}

function asyncUpVoteCommentThreadDetail({ threadId, commentId }) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const {
      authUser: { id: userId },
    } = getState();
    dispatch(upVoteCommentThreadDetailActionCreator({ userId, commentId }));
    const { error, message } = await api.upVoteComment({
      threadId,
      commentId,
    });
    if (error) {
      toast.error(message);
      dispatch(
        neutralVoteCommentThreadDetailActionCreator({ userId, commentId }),
      );
    }
    dispatch(hideLoading());
  };
}

function asyncDownVoteCommentThreadDetail({ threadId, commentId }) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const {
      authUser: { id: userId },
    } = getState();
    dispatch(downVoteCommentThreadDetailActionCreator({ userId, commentId }));
    const { error, message } = await api.downVoteComment({
      threadId,
      commentId,
    });
    if (error) {
      toast.error(message);
      dispatch(
        neutralVoteCommentThreadDetailActionCreator({ userId, commentId }),
      );
    }
    dispatch(hideLoading());
  };
}

function asyncNeutralVoteCommentThreadDetail({
  threadId,
  commentId,
  neutralFromUp = false,
  neutralFromDown = false,
}) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const {
      authUser: { id: userId },
    } = getState();
    dispatch(
      neutralVoteCommentThreadDetailActionCreator({ commentId, userId }),
    );
    const { error, message } = await api.neutralVoteComment({
      threadId,
      commentId,
    });
    if (error) {
      toast.error(message);
      if (neutralFromUp) {
        dispatch(upVoteCommentThreadDetailActionCreator({ commentId, userId }));
      }
      if (neutralFromDown) {
        dispatch(
          downVoteCommentThreadDetailActionCreator({ commentId, userId }),
        );
      }
    }
    dispatch(hideLoading());
  };
}

export {
  ActionType,
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
};
