import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

interface BookCardProps {
  book: {
    title: string;
    price: string;
    id: string;
  };
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="flex flex-col p-4 w-[100%]">
        <div className="flex justify-between mb-5 gap-4 items-center">
          <button className="flex items-center gap-4 h-10 justify-center mt-4 w-full bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Editar
            <FaEdit />
          </button>
          <button className="flex items-center gap-4  h-10 justify-center mt-4 w-full bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Deletar
            <MdDelete />
          </button>
        </div>

        <h2 className="text-xl font-semibold text-gray-800">{book.title}</h2>
        <p className="text-lg text-gray-600 mt-2">{book.price}</p>
      </div>
    </div>
  );
}
