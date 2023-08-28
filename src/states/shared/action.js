import { hideLoading, showLoading } from "react-redux-loading-bar";
import toast from "react-hot-toast";
import api from "../../utils/api";
import { receiveUsersActionCreator } from "../users/action";
import { receiveThreadsActionCreator } from "../threads/action";

function asyncPopulateUsersAndThreads() {
  return async (dispatch) => {
    dispatch(showLoading());
    const {
      error: usersError,
      message: usersMessage,
      data: usersData,
    } = await api.getAllUsers();

    const {
      error: threadError,
      message: threadMessage,
      data: threadData,
    } = await api.getAllThreads();

    if (usersError) {
      toast.error(usersMessage);
    } else if (threadError) {
      toast.error(threadMessage);
    } else {
      dispatch(receiveUsersActionCreator({ users: usersData }));
      dispatch(receiveThreadsActionCreator({ threads: threadData }));
    }

    dispatch(hideLoading());
  };
}

export { asyncPopulateUsersAndThreads };
