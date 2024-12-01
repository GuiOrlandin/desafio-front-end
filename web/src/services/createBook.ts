import axios from "axios";
import { useMutation } from "@tanstack/react-query";

export interface CreateBookDetails {
  title: string;
  price: number;
  description: string;
  author: string;
}

async function postData(data: CreateBookDetails) {
  await axios.post("http://localhost:3000/books", data);
}

export function createBookMutate() {
  const mutate = useMutation({
    mutationFn: postData,
  });
  return mutate;
}
