import axios from "axios";
import { useMutation } from "@tanstack/react-query";

async function postData(bookId: string) {
  const response = await axios.delete(`http://localhost:3000/books/${bookId}`);

  console.log(response.status);
  if (response.status === 204) {
    return true;
  }

  throw new Error("Erro na exclusão do livro");
}

export function deleteBookMutate() {
  const mutate = useMutation({
    mutationFn: postData,
  });
  return mutate;
}
