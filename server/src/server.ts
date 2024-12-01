import registerController from "./controller/registerController";
import loginController from "./controller/loginController";
import { authMiddleware } from "./middleware/authMiddleware";
import jsonServer from "json-server";
import createBookController from "./controller/createBookController";

const databasePath = "db.json";

const server = jsonServer.create();
const router = jsonServer.router(databasePath);

server.use(
  jsonServer.defaults({
    bodyParser: true,
  })
);

server.post("/register", registerController);
server.post("/login", loginController);
server.post("/books", createBookController);

server.use(authMiddleware);

server.use(router);

server.listen(3000, () => {
  console.log("Server running!");
});
