import { hideLoading, showLoading } from "react-redux-loading-bar";
import toast from "react-hot-toast";
import api from "../../utils/api";

const ActionType = {
  RECEIVE_THREADS: "RECEIVE_THREADS",
  CREATE_THREAD: "CREATE_THREAD",
  UP_VOTE_THREAD: "UP_VOTE_THREAD",
  DOWN_VOTE_THREAD: "DOWN_VOTE_THREAD",
  NEUTRAL_VOTE_THREAD: "NEUTRAL_VOTE_THREAD",
};

function receiveThreadsActionCreator({ threads }) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads,
    },
  };
}

function createThreadActionCreator(thread) {
  return {
    type: ActionType.CREATE_THREAD,
    payload: {
      thread,
    },
  };
}

function upVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.UP_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function downVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.DOWN_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function neutralVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.NEUTRAL_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function asyncCreateThread({ title, body, category = "" }) {
  return async (dispatch) => {
    dispatch(showLoading());
    const { error, message, data } = await api.createThread({
      title,
      body,
      category,
    });
    if (error) {
      toast.error(message);
    } else {
      dispatch(createThreadActionCreator(data));
      toast.success("Thread created");
    }
    dispatch(hideLoading());
  };
}

function asyncUpVoteThread({ threadId }) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser } = getState();
    dispatch(upVoteThreadActionCreator({ threadId, userId: authUser.id }));
    const { error, message } = await api.upVoteThread({ threadId });
    if (error) {
      toast.error(message);
      dispatch(
        neutralVoteThreadActionCreator({ threadId, userId: authUser.id }),
      );
    }
    dispatch(hideLoading());
  };
}

function asyncDownVoteThread({ threadId }) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser } = getState();
    dispatch(downVoteThreadActionCreator({ threadId, userId: authUser.id }));
    const { error, message } = await api.downVoteThread({ threadId });
    if (error) {
      toast.error(message);
      dispatch(
        neutralVoteThreadActionCreator({ threadId, userId: authUser.id }),
      );
    }
    dispatch(hideLoading());
  };
}

function asyncNeutralVoteThread({
  threadId,
  neutralFromUp = false,
  neutralFromDown = false,
}) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser } = getState();
    dispatch(neutralVoteThreadActionCreator({ threadId, userId: authUser.id }));
    const { error, message } = await api.neutralVoteThread({ threadId });
    if (error) {
      toast.error(message);
      if (neutralFromUp) {
        dispatch(upVoteThreadActionCreator({ threadId, userId: authUser.id }));
      }
      if (neutralFromDown) {
        dispatch(
          downVoteThreadActionCreator({ threadId, userId: authUser.id }),
        );
      }
    }
    dispatch(hideLoading());
  };
}

export {
  ActionType,
  receiveThreadsActionCreator,
  createThreadActionCreator,
  upVoteThreadActionCreator,
  downVoteThreadActionCreator,
  neutralVoteThreadActionCreator,
  asyncCreateThread,
  asyncUpVoteThread,
  asyncDownVoteThread,
  asyncNeutralVoteThread,
};
