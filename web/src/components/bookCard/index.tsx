import { userStore } from "../../store/userStore";
import DeleteBook from "../deleteBookModal";
import BookModal from "../EditOrCreatebookModal";

interface BookCardProps {
  book: {
    title: string;
    author: string;
    price: number;
    id: string;
    description: string;
  };
}

export default function BookCard({ book }: BookCardProps) {
  const user = userStore((state) => state.user);

  return (
    <div className="bg-gray-100 rounded-lg shadow-lg overflow-hidden hover:cursor-pointer">
      <div className="flex flex-col p-4 w-full h-full">
        {user.isAdmin ? (
          <div>
            <div className="flex-grow">
              <h2 className="text-xl font-semibold text-gray-800">
                {book.title}
              </h2>
              <h3 className="text-sm mt-2 font-semibold text-gray-800">
                {book.author}
              </h3>
              <p className="text-lg text-gray-600 mt-2 mb-5">R${book.price}</p>

              <p className="flex mb-6">
                {book.description.length > 100
                  ? book.description.substring(0, 100) + "..."
                  : book.description}
              </p>
            </div>
            <div className="flex justify-between gap-4 mt-auto">
              <div className="w-full">
                <BookModal book={book} />
              </div>
              <div className="w-full">
                <DeleteBook bookId={book.id} />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-grow">
            <h2 className="text-xl font-semibold text-gray-800">
              {book.title}
            </h2>

            <h3 className="text-sm mt-2 font-semibold text-gray-800">
              {book.author}
            </h3>
            <p className="text-lg text-gray-600 mt-2 ">R${book.price}</p>

            <p>{book.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}
