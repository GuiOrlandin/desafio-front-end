import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface UserResponse {
  email: string;
  isAdmin: boolean;
  id: string;
}

async function fetchUser(): Promise<UserResponse[]> {
  const response = await axios.get("http://localhost:3000/users");
  return response.data;
}

export function usersQuery() {
  return useQuery({
    queryKey: ["userList"],
    queryFn: fetchUser,
  });
}
