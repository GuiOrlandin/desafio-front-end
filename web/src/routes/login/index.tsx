import { useState, useEffect } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import { userRegisterMutate } from "../../services/createUser";
import { userAuthenticateMutate } from "../../services/authUser";
import { userStore } from "../../store/userStore";
import { useNavigate } from "react-router-dom";

interface AuthAndRegisterData {
  email: string;
  password: string;
}

const registerSchema = z.object({
  email: z.string().email("Insira um e-mail válido."),
  password: z.string().min(3, "A senha deve conter mais de 3 caracteres"),
});

type RegisterSchema = z.infer<typeof registerSchema>;

const authSchema = z.object({
  email: z.string().email("Insira um e-mail válido."),
  password: z.string().min(3, "A senha deve conter mais de 3 caracteres"),
});

type AuthSchema = z.infer<typeof authSchema>;

export default function LoginOrRegister() {
  const [isActive, setIsActive] = useState<string>("login");
  const { mutate, isSuccess: registerSuccess, error } = userRegisterMutate();
  const { mutate: userAuthMutate, isSuccess, data } = userAuthenticateMutate();
  const navigate = useNavigate();

  const setUser = userStore((state) => state.setUser);
  const user = userStore((state) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const {
    register: registerAuth,
    handleSubmit: handleSubmitAuth,
    reset,
    formState: { errors: errorsAuth },
  } = useForm<AuthSchema>({
    resolver: zodResolver(authSchema),
  });

  function handleRegister(data: AuthAndRegisterData) {
    mutate({
      email: data.email,
      password: data.password,
    });

    reset();
  }

  function handleAuth(data: AuthAndRegisterData) {
    userAuthMutate(data);
  }

  function handleClick(activeMod: string) {
    setIsActive(activeMod);
    reset();
  }

  useEffect(() => {
    if (isSuccess && data) {
      setUser({
        accessToken: data.token,
        email: data.email,
        id: data.id,
        isAdmin: data.isAdmin,
      });

      navigate("/books");
    }
  }, [isSuccess, data]);
  useEffect(() => {
    if (registerSuccess) {
      setIsActive("login");
    }
  }, [registerSuccess]);

  useEffect(() => {
    if (user.email !== "") {
      navigate("/books");
    }
  }, [user]);

  console.log(error);

  return (
    <div className="flex flex-col min-h-screen justify-center p-8 pt-0 items-center ">
      <div className="flex flex-col justify-center p-16 border-[#d7dde9] border rounded-[10px] ">
        <div className="flex">
          <button
            className={`text-gray-700 border-b border-gray-700 py-2 px-4 hover:text-blue-500 hover:border-blue-500 focus:outline-none 
      
          `}
            onClick={() => handleClick("login")}
          >
            Já tenho conta
          </button>
          <button
            data-testid="register-page"
            className={`text-gray-700 border-b border-gray-700 py-2 px-4 transition-colors duration-200 hover:text-blue-500 hover:border-blue-500 focus:outline-none 
          `}
            onClick={() => handleClick("register")}
          >
            Cadastrar
          </button>
        </div>

        <div>
          {isActive === "login" ? (
            <form onSubmit={handleSubmitAuth(handleAuth)}>
              <div className="pt-8">
                <label htmlFor="email">Email</label>
                <input
                  data-testid="login-email-input"
                  type="text"
                  id="email"
                  className="border rounded-md border-gray-300 p-2 w-full mt-2"
                  {...registerAuth("email")}
                />
                <p className="absolute text-red-600 text-sm mt-1">
                  {errorsAuth.email?.message}
                </p>
              </div>
              <div className="pt-8">
                <label htmlFor="password">Senha</label>
                <input
                  data-testid="login-password-input"
                  type="password"
                  id="password"
                  className="border rounded-md border-gray-300 p-2 w-full mt-2"
                  {...registerAuth("password")}
                />

                <p className="absolute text-red-600 text-sm mt-1">
                  {errorsAuth.password?.message}
                </p>
              </div>

              <button
                data-testid="login-button"
                type="submit"
                className="border rounded-md border-gray-300 p-2 w-full mt-12 bg-gradient-to-r from-[#0796d3] to-[#53c0f0] text-gray-100"
              >
                Entrar
              </button>
            </form>
          ) : (
            <form onSubmit={handleSubmit(handleRegister)}>
              <div className="pt-8">
                <label htmlFor="email">Email</label>
                <input
                  data-testid="register-email-input"
                  type="text"
                  id="email"
                  {...register("email")}
                  className="border rounded-md border-gray-300 p-2 w-full mt-2"
                />

                <p className="absolute text-red-600 text-sm mt-1">
                  {errors.email?.message}
                </p>
              </div>
              <div className="pt-8">
                <label htmlFor="password">Senha</label>
                <input
                  data-testid="register-password-input"
                  type="password"
                  id="password"
                  {...register("password")}
                  className="border rounded-md border-gray-300 p-2 w-full mt-2"
                />
                <p className="absolute text-red-600 text-sm mt-1">
                  {errors.password?.message}
                  {error &&
                    error.message === "Request failed with status code 400" &&
                    "Usuário ja cadastrado"}
                </p>
              </div>

              <button
                data-testid="register-button"
                type="submit"
                className="border rounded-md border-gray-300 p-2 w-full mt-12 bg-gradient-to-r from-[#0796d3] to-[#53c0f0] text-gray-100"
              >
                Cadastrar
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
