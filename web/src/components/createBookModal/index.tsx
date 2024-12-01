import { useEffect, useState } from "react";

import { z } from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createBookMutate } from "../../services/createBook";

const createBookSchema = z.object({
  title: z.string().min(3, "O título deve ter pelo menos 3 caracteres."),
  description: z
    .string()
    .min(3, "A descrição deve ter pelo menos 3 caracteres."),
  price: z
    .string()
    .min(1, "O preço deve ter pelo menos 1 caractere.")
    .transform((val) => {
      const number = parseFloat(val.replace(/[^0-9.]/g, ""));
      return isNaN(number) ? 0 : number;
    })
    .refine((val) => val > 0, "O preço deve ser um número positivo."),
});

type CreateBookSchema = z.infer<typeof createBookSchema>;

export default function CreateBookModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isSuccess, mutate, error } = createBookMutate();

  function handleCreateBook(data: CreateBookSchema) {
    mutate(data);
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateBookSchema>({
    resolver: zodResolver(createBookSchema),
  });

  console.log(error?.message);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    if (isSuccess) {
      setIsModalOpen(!isModalOpen);
    }
  }, [isSuccess]);

  return (
    <div>
      <button
        onClick={toggleModal}
        className="flex items-center gap-2 px-4 py-3 mr-4 bg-blue-400 text-white rounded-lg hover:bg-blue-600"
        type="button"
      >
        Criar
      </button>

      {isModalOpen && (
        <div
          id="authentication-modal"
          tabIndex={-1}
          aria-hidden={!isModalOpen}
          className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-md bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Crie um novo livro
              </h3>
              <button
                type="button"
                onClick={toggleModal}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-4">
              <form
                className="space-y-4"
                onSubmit={handleSubmit(handleCreateBook)}
              >
                <div className="flex flex-col mb-4">
                  <label
                    htmlFor="title"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Titulo
                  </label>
                  <input
                    type="text"
                    {...register("title")}
                    id="title"
                    className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Digite o título do livro"
                    required
                  />
                  <p className="absolute text-red-600 text-sm mt-[75px]">
                    {errors.title && errors.title.message}
                  </p>
                </div>
                <div>
                  <label
                    htmlFor="price"
                    className="block mb-2 mt-4 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Preço
                  </label>
                  <input
                    type="text"
                    {...register("price")}
                    placeholder="Digite o preço do livro"
                    id="price"
                    className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  />

                  <p className="absolute text-red-600 text-sm mt-[-10px]">
                    {errors.price && errors.price.message}
                  </p>
                </div>
                <div>
                  <label
                    htmlFor="price"
                    className="block mb-2 mt-4 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Descrição
                  </label>
                  <textarea
                    {...register("description")}
                    placeholder="Digite a descrição do livro"
                    id="price"
                    className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white resize-none"
                    required
                  />

                  {error?.message === "Request failed with status code 400" &&
                  !errors.description ? (
                    <p className="absolute text-red-600 text-sm mt-[-10px]">
                      Nome de livro ja registrado!
                    </p>
                  ) : (
                    <p className="absolute text-red-600 text-sm mt-[-10px]">
                      {errors.description && errors.description.message}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-400 text-white rounded-lg hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Criar
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
