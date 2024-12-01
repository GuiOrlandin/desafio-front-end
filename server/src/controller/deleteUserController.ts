import { deleteData, readData } from "../../utils/databaseManager";

export default async function deleteUserController(req: any, res: any) {
  const { userId } = req.params;

  const users = await readData("users");

  const user = users.find((user: any) => user.id === userId);

  if (!user) {
    return res.status(404).json({
      message: "user not found.",
    });
  }

  await deleteData("users", user);

  return res.status(204).send();
}
