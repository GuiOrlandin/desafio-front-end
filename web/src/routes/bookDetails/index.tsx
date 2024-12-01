import { useState, useEffect } from "react";
import LoadingSpinner from "../../components/loadingSpinner";
import { bookInfoQuery } from "../../services/getBookByid";

import { useParams } from "react-router-dom";

export default function BookDetails() {
  const { id } = useParams();

  const {
    data: book,
    isLoading,
    isError,
    isSuccess,
  } = bookInfoQuery(id as string);

  console.log(book);

  return (
    <div className="flex flex-col px-24 py-12 bg-gray-50 min-h-screen">
      <header className="flex justify-between items-center gap-4 bg-gray-100 rounded-lg text-white p-4 mb-8">
        <button className="flex items-center gap-2 px-4 py-3 bg-blue-400 text-white rounded-lg hover:bg-blue-600">
          Voltar
        </button>
        <button className="flex items-center gap-2 px-4 py-3 bg-red-400 text-white rounded-lg hover:bg-red-600">
          Logout
        </button>
      </header>
      <main>
        {isSuccess ? (
          <section className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
            <h1 className="text-4xl font-bold text-center text-gray-900 mb-6">
              {book.title}
            </h1>
            <div className="flex">
              <div className="flex flex-col justify-between">
                <p className="text-lg text-gray-800 mb-4">{book.description}</p>
                <div className="flex gap-4 text-gray-600">
                  <p className="font-semibold">Preço: ${book.price}</p>
                </div>
                <div className="mt-6 flex justify-center gap-4"></div>
              </div>
            </div>
          </section>
        ) : (
          <div>
            <LoadingSpinner />
          </div>
        )}
      </main>
    </div>
  );
}
