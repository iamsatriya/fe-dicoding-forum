/**
 * skenario test
 *
 * - asyncPreloadProcess thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call toast error correctly when data fetching failed
*/

import { describe, beforeEach, afterEach, it, vi, expect } from "vitest";
import { hideLoading, showLoading } from "react-redux-loading-bar";
import toast from "react-hot-toast";
import api from "../../utils/api";
import { asyncPreloadProcess, setIsPreloadActionCreator } from "./action";
import { setAuthUserActionCreator } from "../authUser/action";

const fakeOwnProfileResponse = {
  error: false,
  message: "",
  data: {
    id: "john_doe",
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://generated-image-url.jpg",
  },
};

const fakeErrorResponse = {
  error: true,
  message: "failed to get data",
  data: null,
};

describe("asyncPreloadProcess thunk", () => {
  beforeEach(() => {
    api._getOwnProfile = api.getOwnProfile;
    toast._error = toast.error;
  });

  afterEach(() => {
    api.getOwnProfile = api._getOwnProfile;
    toast.error = toast._error;
    delete api._getOwnProfile;
    delete toast._error;
  });

  it("should dispatch action correctly when data fetching success", async () => {
    api.getOwnProfile = () => Promise.resolve(fakeOwnProfileResponse);

    const dispatch = vi.fn();

    await asyncPreloadProcess()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      setAuthUserActionCreator(fakeOwnProfileResponse.data),
    );
    expect(dispatch).toHaveBeenCalledWith(setIsPreloadActionCreator(false));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it("should dispatch action and call toast error correctly when data fetching failed", async () => {
    api.getOwnProfile = () => Promise.resolve(fakeErrorResponse);

    const dispatch = vi.fn();
    toast.error = vi.fn();

    await asyncPreloadProcess()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(null));
    expect(toast.error).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(setIsPreloadActionCreator(false));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
