import { readData, updateData } from "../../utils/databaseManager";

export default async function updateBookController(req: any, res: any) {
  const { bookId } = req.params;
  const { title, description, price } = req.body;

  const books = await readData("books");

  const bookIndex = books.findIndex((book: any) => book.id === bookId);

  if (bookIndex === -1) {
    return res.status(404).json({
      message: "Book not found.",
    });
  }

  const updatedBook = {
    id: bookId,
    title,
    description,
    price,
  };

  books[bookIndex] = updatedBook;
  await updateData("books", bookId, updatedBook);

  return res.status(200).json(updatedBook);
}
