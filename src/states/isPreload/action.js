import { hideLoading, showLoading } from 'react-redux-loading-bar';
import toast from 'react-hot-toast';
import api from '../../utils/api';
import { setAuthUserActionCreator } from '../authUser/action';

const ActionType = {
  SET_IS_PRELOAD: 'SET_IS_PRELOAD',
};

function setIsPreloadActionCreator(isPreload) {
  return {
    type: ActionType.SET_IS_PRELOAD,
    payload: {
      isPreload,
    },
  };
}

function asyncPreloadProcess() {
  return async (dispatch) => {
    dispatch(showLoading());
    const { error, data, message } = api.getOwnProfile();
    if (error) {
      dispatch(setAuthUserActionCreator(null));
      toast.error(message);
    } else {
      dispatch(setAuthUserActionCreator(data));
    }
    dispatch(setIsPreloadActionCreator(false));
    dispatch(hideLoading());
  };
}

export {
  ActionType,
  asyncPreloadProcess,
};
