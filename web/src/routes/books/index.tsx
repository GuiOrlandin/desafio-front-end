import BookCard from "../../components/bookCard";
import CreateBookModal from "../../components/EditOrCreatebookModal";
import Header from "../../components/header";
import LoadingSpinner from "../../components/loadingSpinner";
import { booksQuery } from "../../services/getAllBooks";

export default function Books() {
  const { data, isLoading } = booksQuery();

  return (
    <div className="flex flex-col px-24 py-12 h-[100vh] bg-gray-50">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Header />
          <h1 className="text-4xl font-bold mt-6 mb-6 text-center text-gray-900 mb-6">
            Livros Disponíveis
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {data && data.map((book) => <BookCard key={book.id} book={book} />)}
          </div>
        </>
      )}
    </div>
  );
}
