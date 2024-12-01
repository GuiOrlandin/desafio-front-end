import { readData, updateData } from "../../utils/databaseManager";

export default async function adminRoleUpdateController(req: any, res: any) {
  const { userId } = req.params;
  const { isAdmin } = req.body;

  console.log(isAdmin);

  const users = await readData("users");

  const userIndex = users.findIndex((user: any) => user.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({
      message: "User not found.",
    });
  }

  users[userIndex].isAdmin = isAdmin;

  console.log(users[userIndex]);
  console.log(userIndex);

  await updateData("users", userId, users[userIndex]);

  return res.status(200).json(users[userIndex]);
}
