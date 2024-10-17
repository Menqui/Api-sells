import { Router } from "express";
import productsRouter from "@modules/products/routes/Products.routes";
import usersRouter from "@modules/users/routes/users.routes"
import sessionRouter from "@modules/users/routes/session.routes";
import forgotPasswordRouter from "@modules/users/routes/password.routes";

const routes = Router();

routes.use('/products',productsRouter);
routes.use('/users',usersRouter);
routes.use('/sessions',sessionRouter);
routes.use('/password',forgotPasswordRouter);



export default routes;
