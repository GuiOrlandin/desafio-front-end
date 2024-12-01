import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface UpdateRoleAdminDetails {
  isAdmin: boolean;
  userId: string;
}

export interface UserResponse {
  email: string;
  isAdmin: boolean;
  id: string;
}

async function putData(data: UpdateRoleAdminDetails) {
  const response = await axios.put(
    `http://localhost:3000/user/${data.userId}`,
    { isAdmin: data.isAdmin }
  );

  const updatedUser: UserResponse = response.data;

  return updatedUser;
}

export function updateUserAdminMutate() {
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: putData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userList"] });
    },
  });

  return mutate;
}
