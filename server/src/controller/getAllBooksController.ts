import { readData } from "../../utils/databaseManager";

export default async function createBookController(req: any, res: any) {
  const books = await readData("books");

  if (!books) {
    return res.status(400).json({
      message: "book dont found.",
    });
  }

  return res.status(200).json(books);
}
