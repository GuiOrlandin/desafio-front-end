import { useState, useEffect } from "react";
import LoadingSpinner from "../../components/loadingSpinner";
import { bookInfoQuery } from "../../services/getBookByid";

import { useParams } from "react-router-dom";
import Header from "../../components/header";

export default function BookDetails() {
  const { id } = useParams();

  const { data: book, isSuccess } = bookInfoQuery(id as string);

  console.log(book);

  return (
    <div className="flex flex-col px-24 py-12 bg-gray-50 min-h-screen">
      <Header />
      <main>
        {isSuccess ? (
          <section className="max-w-4xl p-10 mx-auto bg-gray-100 rounded-lg shadow-lg">
            <h1 className="text-4xl font-bold text-center text-gray-900 mb-6">
              {book.title}
            </h1>

            <h2 className="text-xl mb-4">{book.author}</h2>
            <div className="flex">
              <div className="flex flex-col justify-between">
                <p className="text-lg text-gray-800 mb-4">{book.description}</p>
                <div className="flex flex-col gap-4 text-gray-600">
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
