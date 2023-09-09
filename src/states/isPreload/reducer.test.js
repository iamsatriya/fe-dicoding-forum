/**
 * test scenario for isPreloadReducer
 *
 * - isPreloadReducers function
 *  - should return the initial state when given by unknown action
 *  - should return the isPreload when given by SET_IS_PRELOAD
 *
 */

import { describe, it, expect } from "vitest";
import isPreloadReducer from "./reducer";

describe("isPreloadReducers function", () => {
  it("should return the initial state when given by unknown action", () => {
    const initialState = true;
    const action = { type: "UNKNOWN" };

    const nextState = isPreloadReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it("should return the isPreload when given by SET_IS_PRELOAD", () => {
    const initialState = true;
    const action = { type: "SET_IS_PRELOAD", payload: { isPreload: false } };

    const nextState = isPreloadReducer(initialState, action);

    expect(nextState).toEqual(action.payload.isPreload);
  });
});
