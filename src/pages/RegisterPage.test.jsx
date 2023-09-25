/**
 * skenario testing
 *
 * - RegisterPage component
 *   - should handle name typing correctly
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should handle confirm password typing correctly
 *   - should handle validation password and confirm password correctly
 *   - should open login page correctly
 */

import React from "react";
import { Provider } from "react-redux";
import { describe, it, expect, afterEach, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import store from "../states";
import RegisterPage from "./RegisterPage";

describe("LoginPage component", () => {
  afterEach(cleanup);

  it("should handle name typing correctly", async () => {
    render(
      <Provider store={store}>
        <RegisterPage onOpenLogin={() => {}} />
      </Provider>,
    );
    const nameInput = screen.getByPlaceholderText("Enter your name");

    await userEvent.type(nameInput, "satriya");

    expect(nameInput).toHaveValue("satriya");
  });

  it("should handle email typing correctly", async () => {
    render(
      <Provider store={store}>
        <RegisterPage onOpenLogin={() => {}} />
      </Provider>,
    );
    const emailInput = screen.getByPlaceholderText("Enter your email");

    await userEvent.type(emailInput, "satriya@email.com");

    expect(emailInput).toHaveValue("satriya@email.com");
  });

  it("should handle password typing correctly", async () => {
    render(
      <Provider store={store}>
        <RegisterPage onOpenLogin={() => {}} />
      </Provider>,
    );
    const passwordInput = screen.getAllByPlaceholderText("Enter your password");

    await userEvent.type(passwordInput[0], "password");

    expect(passwordInput[0]).toHaveValue("password");
  });

  it("should handle confirm password typing correctly", async () => {
    render(
      <Provider store={store}>
        <RegisterPage onOpenLogin={() => {}} />
      </Provider>,
    );
    const passwordInput = screen.getAllByPlaceholderText("Enter your password");

    await userEvent.type(passwordInput[1], "password");

    expect(passwordInput[1]).toHaveValue("password");
  });

  it("should handle validation password and confirm password correctly", async () => {
    render(
      <Provider store={store}>
        <RegisterPage onOpenLogin={() => {}} />
      </Provider>,
    );
    const passwordInput = screen.getAllByPlaceholderText("Enter your password");

    await userEvent.type(passwordInput[0], "password");
    await userEvent.type(passwordInput[1], "password");

    expect(passwordInput[0]).toHaveValue("password");
    expect(passwordInput[1]).toHaveValue("password");
  });

  it("should open register page", async () => {
    const mockOnOpenLogin = vi.fn();
    render(
      <Provider store={store}>
        <RegisterPage onOpenLogin={mockOnOpenLogin} />
      </Provider>,
    );
    const buttonLogin = screen.getByText("Login");

    await userEvent.click(buttonLogin);

    expect(mockOnOpenLogin).toHaveBeenCalled();
  });
});
