import { hideLoading, showLoading } from "react-redux-loading-bar";
import toast from "react-hot-toast";
import api from "../../utils/api";

const ActionType = {
  SET_AUTH_USER: "SET_AUTH_USER",
  UNSET_AUTH_USER: "UNSET_AUTH_USER",
};

function setAuthUserActionCreator(authUser) {
  return {
    type: ActionType.SET_AUTH_USER,
    payload: {
      authUser,
    },
  };
}

function unsetAuthUserActionCreator() {
  return {
    type: ActionType.UNSET_AUTH_USER,
    payload: {
      authUser: null,
    },
  };
}

function asyncSetAuthUser({ email, password }) {
  return async (dispatch) => {
    dispatch(showLoading());
    const response = await api.login({ email, password });
    if (response.error) {
      toast.error(response.message);
    } else {
      const { error, message, data } = await api.getOwnProfile();
      if (error) {
        toast.error(message);
      } else {
        dispatch(setAuthUserActionCreator(data));
        toast.success(message);
      }
    }
    dispatch(hideLoading());
  };
}

function asyncUnsetAuthUser() {
  return async (dispatch) => {
    dispatch(unsetAuthUserActionCreator());
    api.logout();
  };
}

export {
  ActionType,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
  asyncSetAuthUser,
  asyncUnsetAuthUser,
};
