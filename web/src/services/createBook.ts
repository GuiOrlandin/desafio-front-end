import axios from "axios";
import { useMutation } from "@tanstack/react-query";

export interface UserRegisterDetails {
  title: string;
  price: number;
  description: string;
}

async function postData(data: UserRegisterDetails) {
  await axios.post("http://localhost:3000/books", data);
}

export function createBookMutate() {
  const mutate = useMutation({
    mutationFn: postData,
  });
  return mutate;
}
