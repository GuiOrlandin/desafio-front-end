import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { QueryClientProvider } from "@tanstack/react-query";
import userEvent from "@testing-library/user-event";
import { queryClient } from "../../lib/react-query";
import AxiosMockAdapter from "axios-mock-adapter";

import EditOrCreateBookModal from "./index";
import axios from "axios";

const mock = new AxiosMockAdapter(axios);

describe("editOrCreateBookModal component", () => {
  it("should be able to create a books", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <EditOrCreateBookModal />
      </QueryClientProvider>
    );

    mock.onPost("/books").reply(201);

    const openModalButton = screen.getByTestId("open-modal");

    await userEvent.click(openModalButton);

    const bookTitleInput = screen.getByTestId("create-book-title");
    const bookAuthorInput = screen.getByTestId("create-book-author");
    const bookPriceInput = screen.getByTestId("create-book-price");
    const bookDescriptionInput = screen.getByTestId("create-book-description");

    await userEvent.type(
      bookDescriptionInput,
      "Uma das maiores obras de fantasia épica, 'O Senhor dos Anéis' narra a luta do bem contra o mal na Terra Média em uma jornada inesquecível."
    );

    expect(bookDescriptionInput).toHaveValue(
      "Uma das maiores obras de fantasia épica, 'O Senhor dos Anéis' narra a luta do bem contra o mal na Terra Média em uma jornada inesquecível."
    );

    await userEvent.type(bookAuthorInput, "J.K. Rowling");

    expect(bookAuthorInput).toHaveValue("J.K. Rowling");

    await userEvent.type(bookPriceInput, "49");

    expect(bookPriceInput).toHaveValue("49");

    await userEvent.type(bookTitleInput, "O Senhor dos Anéis");

    expect(bookTitleInput).toHaveValue("O Senhor dos Anéis");

    const actionConfirmButton = screen.getByTestId("action-confirm-button");

    await userEvent.click(actionConfirmButton);

    await waitFor(() => {
      expect(mock.history.post.length).toBe(1);
    });
  });
  it("should be able to edit a books", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <EditOrCreateBookModal
          book={{
            description:
              "Uma das maiores obras de fantasia épica, 'O Senhor dos Anéis' narra a luta do bem contra o mal na Terra Média em uma jornada inesquecível.",
            price: 49,
            title: "O Senhor dos Anéis",
            id: "2",
          }}
        />
      </QueryClientProvider>
    );

    mock.onPost("/books").reply(201);

    const openModalButton = screen.getByTestId("open-modal");

    await userEvent.click(openModalButton);

    const bookAuthorInput = screen.getByTestId("edit-book-author");
    const bookPriceInput = screen.getByTestId("edit-book-price");
    const bookDescriptionInput = screen.getByTestId("edit-book-description");

    await userEvent.clear(bookDescriptionInput);
    await userEvent.type(
      bookDescriptionInput,
      "O Senhor dos Anéis narra a luta do bem contra o mal na Terra Média em uma jornada inesquecível."
    );

    expect(bookDescriptionInput).toHaveValue(
      "O Senhor dos Anéis narra a luta do bem contra o mal na Terra Média em uma jornada inesquecível."
    );

    await userEvent.clear(bookAuthorInput);
    await userEvent.type(bookAuthorInput, "J.K.");

    expect(bookAuthorInput).toHaveValue("J.K.");

    await userEvent.clear(bookPriceInput);
    await userEvent.type(bookPriceInput, "51");

    expect(bookPriceInput).toHaveValue("51");

    const actionConfirmButton = screen.getByTestId("action-confirm-button");

    await userEvent.click(actionConfirmButton);

    await waitFor(() => {
      expect(mock.history.put.length).toBe(1);
    });
  });
});
