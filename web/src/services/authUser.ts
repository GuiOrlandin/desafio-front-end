import axios from "axios";
import { useMutation } from "@tanstack/react-query";

export interface userAuthDetails {
  email: string;
  password: string;
}
export interface userAuthResponse {
  user: {
    email: string;
    isAdmin: boolean;
    id: string;
  };

  token: string;
}

async function postData(data: userAuthDetails) {
  try {
    const response = await axios.post("http://localhost:3000/login", data);
    const responseData: userAuthResponse = response.data;

    return {
      token: responseData.token,
      email: responseData.user.email,
      id: responseData.user.id,
      isAdmin: responseData.user.isAdmin,
    };
  } catch (error) {
    throw new Error("Falha ao autenticar usuário");
  }
}

export function userAuthenticateMutate() {
  const mutate = useMutation({
    mutationFn: postData,
  });

  return mutate;
}
