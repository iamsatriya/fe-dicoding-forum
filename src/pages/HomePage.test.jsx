/**
 * skenario testing
 *
 * - LoginPage component
 *   - should handle title typing correctly
 *   - should handle body typing correctly
 *   - should handle category typing correctly
 */

import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect } from "vitest";
import { Provider } from "react-redux";
import HomePage from "./HomePage";
import store from "../states";

describe("HomePage component", () => {
  afterEach(cleanup);

  it("should handle title typing correctly", async () => {
    render(
      <Provider store={store}>
        <HomePage />
      </Provider>,
    );
    const title = screen.getByPlaceholderText("Enter the title here");

    await userEvent.type(title, "title");

    expect(title).toHaveValue("title");
  });

  it("should handle body typing correctly", async () => {
    render(
      <Provider store={store}>
        <HomePage />
      </Provider>,
    );
    const body = screen.getByPlaceholderText("Enter the body here");

    await userEvent.type(body, "body");

    expect(body).toHaveValue("body");
  });

  it("should handle category typing correctly", async () => {
    render(
      <Provider store={store}>
        <HomePage />
      </Provider>,
    );
    const category = screen.getByPlaceholderText("Enter the category here");

    await userEvent.type(category, "category");

    expect(category).toHaveValue("category");
  });
});
