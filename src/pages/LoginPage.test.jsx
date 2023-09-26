/**
 * skenario testing
 *
 * - LoginPage component
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should open register page correctly
 */

import React from "react";
import { Provider } from "react-redux";
import { describe, it, expect, afterEach, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginPage from "./LoginPage";
import store from "../states";

describe("LoginPage component", () => {
  afterEach(cleanup);

  it("should handle email typing correctly", async () => {
    render(
      <Provider store={store}>
        <LoginPage onOpenRegister={() => {}} />
      </Provider>,
    );
    const emailInput = screen.getByPlaceholderText("Enter your email");

    await userEvent.type(emailInput, "satriya@email.com");

    expect(emailInput).toHaveValue("satriya@email.com");
  });

  it("should handle password typing correctly", async () => {
    render(
      <Provider store={store}>
        <LoginPage onOpenRegister={() => {}} />
      </Provider>,
    );
    const passwordInput = screen.getByPlaceholderText(
      "Enter your password",
    );

    await userEvent.type(passwordInput, "password");

    expect(passwordInput).toHaveValue("password");
  });

  it('should open register page correctly', async () => {
    const mockOnOpenRegister = vi.fn();
    render(
      <Provider store={store}>
        <LoginPage onOpenRegister={mockOnOpenRegister} />
      </Provider>,
    );
    const buttonRegister = screen.getByText('Create an account')

    await userEvent.click(buttonRegister);

    expect(mockOnOpenRegister).toHaveBeenCalled();
  })
});
