import { FaEdit } from "react-icons/fa";
import { userStore } from "../../store/userStore";
import DeleteBook from "../deleteBookModal";

interface BookCardProps {
  book: {
    title: string;
    price: string;
    id: string;
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
              <p className="text-lg text-gray-600 mt-2 mb-10">{book.price}</p>
            </div>
            <div className="flex justify-between gap-4 mt-auto">
              <button className="flex items-center gap-4 h-10 justify-center w-full bg-blue-400 text-white rounded-lg hover:bg-blue-600">
                <FaEdit />
              </button>

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
            <p className="text-lg text-gray-600 mt-2 ">{book.price}</p>
          </div>
        )}
      </div>
    </div>
  );
}
