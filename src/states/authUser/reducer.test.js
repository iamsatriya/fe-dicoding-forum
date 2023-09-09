/**
 * test scenario for authUserReducer
 *
 * - authUserReducer function
 *  - sshould return the initial state when given by unknown action
 *  - should return the authenticated user when given SET_AUTH_USER action
 *  - should return null when given UNSET_AUTH_USER action
 *
 */

import { describe, it, expect } from "vitest";
import authUserReducer from "./reducer";

describe("authUserReducer function", () => {
  it("should return the initial state when given by unknown action", () => {
    const initialState = null;
    const action = { type: "UNKNOWN" };

    const nextState = authUserReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it("should return the authenticated user when given SET_AUTH_USER action", () => {
    const initialState = null;
    const action = {
      type: "SET_AUTH_USER",
      payload: { authUser: { name: "Satriya" } },
    };

    const nextState = authUserReducer(initialState, action);

    expect(nextState).toEqual(action.payload.authUser);
  });

  it("should return null when given UNSET_AUTH_USER action", () => {
    const initialState = null;
    const action = {
      type: "UNSET_AUTH_USER",
    };

    const nextState = authUserReducer(initialState, action);

    expect(nextState).toEqual(null);
  });
});
