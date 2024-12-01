import { useEffect } from "react";

import BookCard from "../../components/bookCard";
import CreateBookModal from "../../components/createBookModal";
import LoadingSpinner from "../../components/loadingSpinner";
import { getAllBooksMutate } from "../../services/getAllBooks";

export default function Books() {
  const { data, isSuccess, mutate } = getAllBooksMutate();

  useEffect(() => {
    mutate();
  }, []);

  return (
    <div className="flex flex-col px-24 py-12 h-[100vh] bg-gray-50">
      {!isSuccess ? (
        <LoadingSpinner />
      ) : (
        <>
          <header className="flex justify-end items-center bg-gray-100 rounded-lg text-white p-4">
            <CreateBookModal />
            <button className="flex items-center gap-2 px-4 py-3 mr-4 bg-blue-400 text-white rounded-lg hover:bg-blue-600">
              Logout
            </button>
          </header>
          <h1 className="text-4xl font-bold mt-6 mb-6 text-center text-gray-900 mb-6">
            Livros Disponíveis
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {data.map((book) => (
              <BookCard book={book} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
