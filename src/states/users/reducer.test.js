/**
 * test scenario for usersReducer
 *
 * - usersReducers function
 *  - should return the initial state when given by unknown action
 *  - should return the users list when given by RECEIVE_USERS
 *
 */

import { describe, it, expect } from "vitest";
import usersReducer from "./reducer";

describe("isPreloadReducers function", () => {
  it("should return the initial state when given by unknown action", () => {
    const initialState = [];
    const action = { type: "UNKNOWN" };

    const nextState = usersReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it("should return the isPreload when given by SET_IS_PRELOAD", () => {
    const initialState = [];
    const user = { id: 1, name: "Satriya" };
    const action = { type: "RECEIVE_USERS", payload: { users: [user] } };

    const nextState = usersReducer(initialState, action);

    expect(nextState).toEqual(action.payload.users);
  });
});
