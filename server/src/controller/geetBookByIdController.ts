import { readData } from "../../utils/databaseManager";

export default async function getBooksByIdController(req: any, res: any) {
  const { bookId } = req.params;

  const books = await readData("books");

  const filteredBook = books.find((book: any) => book.id === bookId);

  if (!filteredBook) {
    return res.status(400).json({
      message: "book dont found.",
    });
  }

  return res.status(200).json(filteredBook);
}
