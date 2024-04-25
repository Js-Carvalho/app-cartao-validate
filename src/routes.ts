import { Router } from "express";

/* Área de importação dos controllers */
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { CreateCartaoController } from "./controllers/cartao/CreateCartaoController";
import { ValidateCartaoController } from "./controllers/cartao/ValidateCartaoController";

const router = Router();

router.post('/user', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);
router.post('/cartao', isAuthenticated, new CreateCartaoController().handle);
router.post('/cartaoValidate', isAuthenticated, new ValidateCartaoController().handle);

export { router };