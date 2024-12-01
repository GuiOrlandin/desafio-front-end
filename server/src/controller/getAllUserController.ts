import { readData } from "../../utils/databaseManager";

export default async function getAllUsersController(req: any, res: any) {
  const users = await readData("users");

  if (!users) {
    return res.status(400).json({
      message: "users dont found.",
    });
  }

  return res.status(200).json(users);
}
