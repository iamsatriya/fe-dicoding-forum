import { hideLoading, showLoading } from "react-redux-loading-bar";
import toast from "react-hot-toast";
import api from "../../utils/api";

const ActionType = {
  RECEIVE_LEADERBOARDS: "RECEIVE_LEADERBOARDS",
};

function receiveLeaderboardsActionCreator({ leaderboards }) {
  return {
    type: ActionType.RECEIVE_LEADERBOARDS,
    payload: {
      leaderboards,
    },
  };
}

function asyncPopulateLeaderboards() {
  return async (dispatch) => {
    dispatch(showLoading());
    const { error, message, data } = await api.getLeaderboards();
    if (error) {
      toast.error(message);
    } else {
      dispatch(receiveLeaderboardsActionCreator({ leaderboards: data }));
    }
    dispatch(hideLoading());
  };
}

export {
  ActionType,
  receiveLeaderboardsActionCreator,
  asyncPopulateLeaderboards,
};
