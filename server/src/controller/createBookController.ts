import { v4 as uuidv4 } from "uuid";
import { readData, writeData } from "../../utils/databaseManager";

export default async function createBookController(req: any, res: any) {
  const { title, description, price } = req.body;

  const books = await readData("books");

  const bookExists = books.find((book: any) => book.title === title);

  if (bookExists) {
    return res.status(400).json({
      message: "book already exists.",
    });
  }

  const newBook = {
    id: uuidv4(),
    title,
    description,
    price,
  };

  await writeData("books", newBook);

  return res.status(201).json(newBook);
}
