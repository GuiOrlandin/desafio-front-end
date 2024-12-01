import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function postData(userId: string) {
  const response = await axios.delete(`http://localhost:3000/users/${userId}`);

  if (response.status === 204 || response.status === 200) {
    return true;
  }

  throw new Error("Erro na exclusão do usuário");
}

export function deleteUserMutate() {
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: postData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userList"] });
    },
  });

  return mutate;
}
