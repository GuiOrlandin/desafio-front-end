import registerController from "./controller/registerController";
import loginController from "./controller/loginController";
import jsonServer from "json-server";
import createBookController from "./controller/createBookController";
import deleteBookController from "./controller/deleteBookController";
import getAllBooksController from "./controller/getAllBooksController";
import getBooksByIdController from "./controller/geetBookByIdController";
import getAllUsersController from "./controller/getAllUserController";
import deleteUserController from "./controller/deleteUserController";
import adminRoleUpdateController from "./controller/adminRoleUpdateController";

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
server.delete("/books/:bookId", deleteBookController);
server.get("/books", getAllBooksController);
server.get("/book/:bookId", getBooksByIdController);
server.get("/users", getAllUsersController);
server.delete("/user/:userId", deleteUserController);
server.put("/user/:userId", adminRoleUpdateController);

server.use(router);

server.listen(3000, () => {
  console.log("Server running!");
});
