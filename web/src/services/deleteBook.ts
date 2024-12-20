import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function postData(bookId: string) {
  const response = await axios.delete(`http://localhost:3000/books/${bookId}`);

  if (response.status === 204 || response.status === 200) {
    return true;
  }

  throw new Error("Erro na exclusão do livro");
}

export function deleteBookMutate() {
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: postData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookList"] });
    },
  });

  return mutate;
}
