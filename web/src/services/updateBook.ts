import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface UpdateBookDetails {
  title: string;
  price: number;
  description: string;
  id?: string;
}

async function putData(book: UpdateBookDetails) {
  const response = await axios.put(
    `http://localhost:3000/books/${book.id}`,
    book
  );

  const updatedBook: UpdateBookDetails = response.data;

  return updatedBook;
}

export function updateBookMutate() {
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: putData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookList"] });
    },
  });

  return mutate;
}
