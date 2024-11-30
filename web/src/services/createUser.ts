import axios from "axios";
import { useMutation } from "@tanstack/react-query";

export interface UserRegisterDetails {
  email: string;
  password: string;
}

async function postData(data: UserRegisterDetails) {
  await axios.post("http://localhost:3000/register", data);
}

export function userRegisterMutate() {
  const mutate = useMutation({
    mutationFn: postData,
  });
  return mutate;
}
