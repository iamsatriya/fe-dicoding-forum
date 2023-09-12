/**
 * skenario test
 *
 * - asyncSetAuthUser thunk
 *  - should dispatch action and call toast success correctly when data fetching success
 *  - should dispatch action and call toast error correctly when data fetching failed in getOwnProfile
 *  - should dispatch action and call toast error correctly when data fetching login failed
 * - asyncUnsetAuthUser thunk
 *  - should dispatch action correctly
*/

import { describe, beforeEach, afterEach, it, vi, expect } from "vitest";
import { hideLoading, showLoading } from "react-redux-loading-bar";
import toast from "react-hot-toast";
import api from "../../utils/api";
import {
  asyncSetAuthUser,
  asyncUnsetAuthUser,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
} from "./action";

const fakeLoginResponse = {
  error: false,
  message: "",
  data: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRpbWFzMiIsIm5hbWUiOiJEaW1hcyBTYXB1dHJhIiwicGhvdG8iOiJodHRwczovL3VpLWF2YXRhcnMuY29tL2FwaS8_bmFtZT1EaW1hcyBTYXB1dHJhJmJhY2tncm91bmQ9cmFuZG9tIiwiaXNfcGVybWFuZW50IjpmYWxzZSwiaWF0IjoxNjYzODQwNzY0fQ._HrzpinFYX_m9WfvM-lGCdVrnhnaGHhzt1e6eATE1Iw",
};

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

describe("asyncSetAuthUser thunk", () => {
  beforeEach(() => {
    api._login = api.login;
    api._getOwnProfile = api.getOwnProfile;
    toast._error = toast.error;
    toast._success = toast.success;
  });

  afterEach(() => {
    api.login = api._login;
    api.getOwnProfile = api._getOwnProfile;
    toast.error = toast._error;
    toast.success = toast._success;

    delete api._getAllThreads;
    delete api._getAllUsers;
    delete toast._error;
    delete toast._success;
  });

  it("should dispatch action and call toast success correctly when data fetching success", async () => {
    const loginData = { email: "johndoe@mail.com", password: "password" };
    //stub implementation
    api.login = () => Promise.resolve(fakeLoginResponse);
    api.getOwnProfile = () => Promise.resolve(fakeOwnProfileResponse);

    // mock dispatch
    const dispatch = vi.fn();
    toast.success = vi.fn();

    await asyncSetAuthUser(loginData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      setAuthUserActionCreator(fakeOwnProfileResponse.data),
    );
    expect(toast.success).toHaveBeenCalledWith(fakeOwnProfileResponse.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it("should dispatch action and call toast error correctly when data fetching failed in getOwnProfile", async () => {
    const loginData = { email: "johndoe@mail.com", password: "password" };
    //stub implementation
    api.login = () => Promise.resolve(fakeLoginResponse);
    api.getOwnProfile = () => Promise.resolve(fakeErrorResponse);

    // mock dispatch
    const dispatch = vi.fn();
    toast.error = vi.fn();

    await asyncSetAuthUser(loginData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(toast.error).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it("should dispatch action and call toast error correctly when data fetching login failed", async () => {
    const loginData = { email: "johndoe@mail.com", password: "password" };
    //stub implementation
    api.login = () => Promise.resolve(fakeErrorResponse);

    // mock dispatch
    const dispatch = vi.fn();
    toast.error = vi.fn();

    await asyncSetAuthUser(loginData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(toast.error).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});

describe("asyncUnsetAuthUser thunk", () => {
  beforeEach(() => {
    api._logout = api.logout;
  });

  afterEach(() => {
    api.logout = api._logout;
    delete api._logout;
  });

  it("should dispatch action correctly", async () => {
    api.logout = () => Promise.resolve();

    const dispatch = vi.fn();

    await asyncUnsetAuthUser()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(unsetAuthUserActionCreator());
  });
});
