import { Router } from "express";
import UserController from "./app/controllers/UserController";
import LoginController from "./app/controllers/LoginController";
import ProductsController from "./app/controllers/ProductsController";
import multer from "multer";
import multerConfig from "./config/multer";
import authMiddleware from "./app/middlewares/auth";
import CategoryController from "./app/controllers/CategoryController";
import OrderController from "./app/controllers/OrderController";

const upload = multer(multerConfig);

const routes = new Router();

routes.post("/users", UserController.store);

routes.post("/login", LoginController.store);

routes.use(authMiddleware);

routes.post("/products", upload.single("file"), ProductsController.store);
routes.get("/products", ProductsController.index);
routes.put("/products/:id", upload.single("file"), ProductsController.update);

routes.post("/categories", upload.single("file"), CategoryController.store);
routes.get("/categories", CategoryController.index);
routes.put("/categories", CategoryController.update);

routes.post("/orders", OrderController.store);
routes.put("/orders/:id", OrderController.update);
routes.get("/orders", OrderController.index);

export default routes;
