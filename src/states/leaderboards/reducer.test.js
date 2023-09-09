/**
 * test scenario for leaderboardsReducer
 *
 * - leaderboardsReducers function
 *  - should return the initial state when given by unknown action
 *  - sshould return the leaderboards when given by RECEIVE_LEADERBOARDS
 *
 */

import { describe, it, expect } from "vitest";
import leaderboardsReducer from "./reducer";

describe("leaderboardReducers function", () => {
  it("should return the initial state when given by unknown action", () => {
    const initialState = [];
    const action = { type: "UNKNOWN" };

    const nextState = leaderboardsReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it("should return the leaderboards when given by RECEIVE_LEADERBOARDS", () => {
    const initialState = [];
    const action = {
      type: "RECEIVE_LEADERBOARDS",
      payload: { leaderboards: [{ id: 1, name: "Satriya", score: 100 }] },
    };

    const nextState = leaderboardsReducer(initialState, action);

    expect(nextState).toEqual(action.payload.leaderboards);
  });
});
