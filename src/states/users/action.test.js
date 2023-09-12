/**
 * skenario test
 *
 * - asyncRegisterUser thunk
 *  - should dispatch action and call toast success correctly when data fetching success
 *  - should dispatch action and call toast error correctly when data fetching failed
 */

import { describe, beforeEach, afterEach, it, vi, expect } from "vitest";
import { hideLoading, showLoading } from "react-redux-loading-bar";
import toast from "react-hot-toast";
import api from "../../utils/api";
import { asyncRegisterUser } from "./action";

const fakeRegisterUserResponse = {
  error: false,
  message: "success",
  data: {
    id: "user-123",
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://generated-image-url.jpg",
  },
};

const fakeErrorResponse = {
  error: true,
  message: "failed",
  data: null,
};

describe("asyncRegisterUser thunk", () => {
  beforeEach(() => {
    api._register = api.register;
    toast._error = toast.error;
    toast._success = toast.success;
  });

  afterEach(() => {
    api.register = api._register;
    toast.error = toast._error;
    toast.success = toast._success;

    delete api._register;
    delete toast._error;
    delete toast._success;
  });

  it("should dispatch action and call toast success correctly when data fetching success", async () => {
    api.register = () => Promise.resolve(fakeRegisterUserResponse);
    const dispatch = vi.fn();
    toast.success = vi.fn();

    await asyncRegisterUser({
      name: "Satriya",
      email: "satriya@mail.com",
      password: "password",
    })(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(toast.success).toHaveBeenCalledWith("Success register!");
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it("should dispatch action and call toast error correctly when data fetching failed", async () => {
    api.register = () => Promise.resolve(fakeErrorResponse);
    const dispatch = vi.fn();
    toast.error = vi.fn();

    await asyncRegisterUser({
      name: "Satriya",
      email: "satriya@mail.com",
      password: "password",
    })(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(toast.error).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
