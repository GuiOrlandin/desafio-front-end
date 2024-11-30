import BookCard from "../../components/bookCard";

const books = [
  {
    id: "1",
    title: "O Senhor dos Anéis",
    price: "R$ 59,90",
  },
  {
    id: "2",
    title: "Harry Potter e a Pedra Filosofal",
    price: "R$ 49,90",
  },
  {
    id: "3",
    title: "O Hobbit",
    price: "R$ 39,90",
  },
  {
    id: "'4'",
    title: "1984",
    price: "R$ 29,90",
  },
  {
    id: "5",
    title: "Dom Quixote",
    price: "R$ 69,90",
  },
];

export default function Books() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-6">
        Livros Disponíveis
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {books.map((book) => (
          <BookCard book={book} />
        ))}
      </div>
    </div>
  );
}
