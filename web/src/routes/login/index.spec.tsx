import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import Login from "./index";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../../lib/react-query";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import AxiosMockAdapter from "axios-mock-adapter";
import axios from "axios";
import userEvent from "@testing-library/user-event";

const mock = new AxiosMockAdapter(axios);

describe("Longin or register page", () => {
  it("should be able to render login page", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={["/login"]}>
          <Routes>
            <Route path="/login" element={<Login />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("Já tenho conta")).toBeInTheDocument();
      expect(screen.getByText("Cadastrar")).toBeInTheDocument();
    });
    expect(true).toBeTruthy();
  });
  it("should be able to register", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={["/"]}>
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );

    mock
      .onPost("/register", { email: "test@gmail.com", password: "123456" })
      .reply(201);

    const registerPageButton = screen.getByTestId("register-page");

    await waitFor(() => {
      userEvent.click(registerPageButton);

      expect(screen.getByTestId("register-button")).toBeInTheDocument();
    });

    const registerUserButton = screen.getByTestId("register-button");
    const registerEmailInput = screen.getByTestId("register-email-input");
    const registerPasswordInput = screen.getByTestId("register-password-input");

    await userEvent.type(registerEmailInput, "test@gmail.com");

    expect(registerEmailInput).toHaveValue("test@gmail.com");

    await userEvent.type(registerPasswordInput, "123456");

    expect(registerPasswordInput).toHaveValue("123456");

    await userEvent.click(registerUserButton);

    await waitFor(() => {
      expect(mock.history.post.length).toBe(1);
    });
  });

  it("should be able to login", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={["/"]}>
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );

    mock
      .onPost("/login", { email: "test@gmail.com", password: "123456" })
      .reply(200);

    const loginUserButton = screen.getByTestId("login-button");
    const loginEmailInput = screen.getByTestId("login-email-input");
    const loginPasswordInput = screen.getByTestId("login-password-input");

    await userEvent.type(loginEmailInput, "test@gmail.com");

    expect(loginEmailInput).toHaveValue("test@gmail.com");

    await userEvent.type(loginPasswordInput, "123456");

    expect(loginPasswordInput).toHaveValue("123456");

    await userEvent.click(loginUserButton);

    await waitFor(() => {
      expect(mock.history.post.length).toBe(2);
    });
  });
});
