import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface BookResponse {
  title: string;
  id: string;
  price: number;
  description: string;
}

async function fetchBookInfo(bookId: string): Promise<BookResponse> {
  const response = await axios.get(`http://localhost:3000/book/${bookId}`);
  return response.data;
}

export function bookInfoQuery(bookId: string) {
  return useQuery({
    queryKey: ["bookInfo", bookId],
    queryFn: () => fetchBookInfo(bookId),
  });
}
