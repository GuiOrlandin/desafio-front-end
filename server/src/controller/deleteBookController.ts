import { deleteData, readData } from "../../utils/databaseManager";

export default async function deleteBookController(req: any, res: any) {
  const { bookId } = req.params;

  const books = await readData("books");

  const book = books.find((book: any) => book.id === bookId);

  if (!book) {
    return res.status(404).json({
      message: "book not found.",
    });
  }

  await deleteData("books", bookId);

  return res.status(204).send();
}
