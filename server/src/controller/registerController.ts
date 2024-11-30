import * as bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { readData, writeData } from "../../utils/databaseManager";

export default async function registerController(req: any, res: any) {
  const { email, password } = req.body;

  const users = await readData("users");

  const emailExists = users.find((user: any) => user.email === email);

  if (emailExists) {
    return res.status(400).json({
      message: "email already exists.",
    });
  }

  const hashPassword = await bcrypt.hash(password, 8);

  const newUser = {
    id: uuidv4(),
    email,
    password: hashPassword,
    isAdmin: false,
  };

  await writeData("users", newUser);

  return res.status(201).json(newUser);
}
