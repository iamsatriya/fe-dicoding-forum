/**
 * skenario test
 *
 * - asyncPopulateLeaderboards thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call toast error correctly when data fetching failed
*/

import { describe, beforeEach, afterEach, it, vi, expect } from "vitest";
import { hideLoading, showLoading } from "react-redux-loading-bar";
import toast from "react-hot-toast";
import api from "../../utils/api";
import {
  asyncPopulateLeaderboards,
  receiveLeaderboardsActionCreator,
} from "./action";

const fakeLeaderboardsResponse = {
  error: false,
  message: "success retrieve leaderboards",
  data: [
    {
      user: {
        id: "users-1",
        name: "John Doe",
        email: "john@example.com",
        avatar: "https://generated-image-url.jpg",
      },
      score: 10,
    },
    {
      user: {
        id: "users-2",
        name: "Jane Doe",
        email: "jane@example.com",
        avatar: "https://generated-image-url.jpg",
      },
      score: 5,
    },
  ],
};

const fakeErrorResponse = {
  error: true,
  message: "failed to retrieve data",
  data: null,
};

describe("asyncPopulateLeaderboards thunk", () => {
  beforeEach(() => {
    toast._error = toast.error;
    api._getLeaderboards = api.getLeaderboards;
  });

  afterEach(() => {
    toast.error = toast._error;
    api.getLeaderboards = api._getLeaderboards;

    delete toast._error;
    delete api._getLeaderboards;
  });

  it("should dispatch action correctly when data fetching success", async () => {
    api.getLeaderboards = () => Promise.resolve(fakeLeaderboardsResponse);

    const dispatch = vi.fn();

    await asyncPopulateLeaderboards()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      receiveLeaderboardsActionCreator({
        leaderboards: fakeLeaderboardsResponse.data,
      }),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it("should dispatch action and call toast error correctly when data fetching failed", async () => {
    api.getLeaderboards = () => Promise.resolve(fakeErrorResponse);

    const dispatch = vi.fn();
    toast.error = vi.fn();

    await asyncPopulateLeaderboards()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(toast.error).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
