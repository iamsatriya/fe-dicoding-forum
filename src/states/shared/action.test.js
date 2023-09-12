/**
 * skenario test
 *
 * - asyncPopulateUsersAndThreads thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call toast error correctly when data fetching users failed
 *  - should dispatch action and call toast error correctly when data fetching threads failed
 */

import { describe, beforeEach, afterEach, it, vi, expect } from "vitest";
import { hideLoading, showLoading } from "react-redux-loading-bar";
import toast from "react-hot-toast";
import api from "../../utils/api";
import asyncPopulateUsersAndThreads from "./action";
import { receiveThreadsActionCreator } from "../threads/action";
import { receiveUsersActionCreator } from "../users/action";

const fakeUsersResponse = {
  error: false,
  message: "",
  data: [
    {
      id: "john_doe",
      name: "John Doe",
      email: "john@example.com",
      avatar: "https://generated-image-url.jpg",
    },
    {
      id: "jane_doe",
      name: "Jane Doe",
      email: "jane@example.com",
      avatar: "https://generated-image-url.jpg",
    },
    {
      id: "fulan",
      name: "Si Fulan",
      email: "fulan@example.com",
      avatar: "https://generated-image-url.jpg",
    },
  ],
};

const fakeThreadsResponse = {
  error: false,
  message: "",
  data: [
    {
      id: "thread-1",
      title: "Thread Pertama",
      body: "Ini adalah thread pertama",
      category: "General",
      createdAt: "2021-06-21T07:00:00.000Z",
      ownerId: "users-1",
      upVotesBy: [],
      downVotesBy: [],
      totalComments: 0,
    },
    {
      id: "thread-2",
      title: "Thread Kedua",
      body: "Ini adalah thread kedua",
      category: "General",
      createdAt: "2021-06-21T07:00:00.000Z",
      ownerId: "users-2",
      upVotesBy: [],
      downVotesBy: [],
      totalComments: 0,
    },
  ],
};

const fakeErrorResponse = {
  error: true,
  message: "failed to get data",
  data: null,
};

describe("asyncPopulateUsersAndThreads thunk", () => {
  beforeEach(() => {
    api._getAllUsers = api.getAllUsers;
    api._getAllThreads = api.getAllThreads;
    toast._error = toast.error;
  });

  afterEach(() => {
    api.getAllThreads = api._getAllThreads;
    api.getAllUsers = api._getAllUsers;
    toast.error = toast._error;

    delete api._getAllThreads;
    delete api._getAllUsers;
    delete toast._error;
  });

  it("should dispatch action correctly when data fetching success", async () => {
    //stub implementation
    api.getAllUsers = () => Promise.resolve(fakeUsersResponse);
    api.getAllThreads = () => Promise.resolve(fakeThreadsResponse);
    // mock dispatch
    const dispatch = vi.fn();

    await asyncPopulateUsersAndThreads()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      receiveUsersActionCreator({ users: fakeUsersResponse.data }),
    );
    expect(dispatch).toHaveBeenCalledWith(
      receiveThreadsActionCreator({ threads: fakeThreadsResponse.data }),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it("should dispatch action and call toast error correctly when data fetching users failed", async () => {
    api.getAllUsers = () => Promise.resolve(fakeErrorResponse);
    api.getAllThreads = () => Promise.resolve(fakeThreadsResponse);
    const dispatch = vi.fn();
    toast.error = vi.fn();

    await asyncPopulateUsersAndThreads()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(toast.error).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it("should dispatch action and call toast error correctly when data fetching threads failed", async () => {
    api.getAllUsers = () => Promise.resolve(fakeUsersResponse);
    api.getAllThreads = () => Promise.resolve(fakeErrorResponse);
    const dispatch = vi.fn();
    toast.error = vi.fn();

    await asyncPopulateUsersAndThreads()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(toast.error).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
