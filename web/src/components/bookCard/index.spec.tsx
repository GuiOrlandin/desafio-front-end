import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../../lib/react-query";
import AxiosMockAdapter from "axios-mock-adapter";
import userEvent from "@testing-library/user-event";

import axios from "axios";
import BookCard from "./index";
import { MemoryRouter } from "react-router-dom";
import { userStore } from "../../store/userStore";

const mock = new AxiosMockAdapter(axios);

describe("editOrCreateBookModal component", () => {
  beforeEach(() => {
    userStore.setState({
      user: {
        id: "609babee-dee4-4dfe-a700-962casfafasfasd7f51908",
        email: "gu@gmail.com",
        accessToken:
          "$2b$08$V4NYFcyC8cg4M25P9RE01esKYT4LjDKPNMTR9S.eBZSar2GQHE.sy",
        isAdmin: true,
      },
    });
  });

  it("should be able to delete a books", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={["/"]}>
          <QueryClientProvider client={queryClient}>
            <BookCard
              book={{
                description:
                  "Uma das maiores obras de fantasia épica, 'O Senhor dos Anéis' narra a luta do bem contra o mal na Terra Média em uma jornada inesquecível.",
                price: 49,
                title: "O Senhor dos Anéis",
                author: "J.K. Rowling",
                id: "2",
              }}
            />
          </QueryClientProvider>
        </MemoryRouter>
      </QueryClientProvider>
    );

    mock.onDelete("/books/2").reply(204);

    const openModal = screen.getByTestId("open-delete-modal");

    await userEvent.click(openModal);

    const deleteButton = screen.getByTestId("delete-button-modal");

    await userEvent.click(deleteButton);

    await waitFor(() => {
      expect(mock.history.delete.length).toBe(1);
    });
  });
});
