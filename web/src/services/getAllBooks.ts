import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface BookResponse {
  title: string;
  id: string;
  price: number;
  description: string;
  author: string;
}

async function fetchBooks(): Promise<BookResponse[]> {
  const response = await axios.get("http://localhost:3000/books");
  return response.data;
}

export function booksQuery() {
  return useQuery({
    queryKey: ["bookList"],
    queryFn: fetchBooks,
  });
}
