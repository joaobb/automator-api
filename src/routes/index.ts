import { Router } from "express";
import { rolesRouter } from "./roles";
import { permissionRouter } from "./permission";
import { authRouter } from "./auth";
import { automatasRouter } from "./automata";
import { identifyUser } from "../middleware/identifyUser";
import { exercisesRouter } from "./exercise";

const routes = Router();

routes.use(identifyUser());

routes.use("/", authRouter);
routes.use("/roles", rolesRouter);
routes.use("/permissions", permissionRouter);
routes.use("/automatas", automatasRouter);
routes.use("/exercises", exercisesRouter);

export { routes };
