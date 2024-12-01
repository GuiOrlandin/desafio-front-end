import { FaEdit } from "react-icons/fa";
import { userStore } from "../../store/userStore";
import DeleteBook from "../deleteBookModal";
import BookModal from "../EditOrCreatebookModal";

interface BookCardProps {
  book: {
    title: string;
    price: number;
    id: string;
    description: string;
  };
}

export default function BookCard({ book }: BookCardProps) {
  const user = userStore((state) => state.user);

  return (
    <div className="bg-gray-100 rounded-lg shadow-lg overflow-hidden">
      <div className="flex flex-col p-4 w-full h-full">
        {user.isAdmin ? (
          <div>
            <div className="flex-grow">
              <h2 className="text-xl font-semibold text-gray-800">
                {book.title}
              </h2>
              <p className="text-lg text-gray-600 mt-2 mb-10">R${book.price}</p>
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
            <p className="text-lg text-gray-600 mt-2 ">R${book.price}</p>
          </div>
        )}
      </div>
    </div>
  );
}
