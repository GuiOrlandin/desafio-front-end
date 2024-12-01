import axios from "axios";
import { useMutation } from "@tanstack/react-query";

export interface BookResponse {
  title: string;
  id: string;
  price: number;
  description?: string;
}

async function getData() {
  const response = await axios.get("http://localhost:3000/books");

  const books: BookResponse[] = response.data;

  return books;
}

export function getAllBooksMutate() {
  const mutate = useMutation({
    mutationFn: getData,
  });
  return mutate;
}
