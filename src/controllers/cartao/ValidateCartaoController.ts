import { Request, Response } from "express";
import { ValidateCartaoService } from "../../services/cartao/ValidateCartaoService";

class ValidateCartaoController {
    async handle(req: Request, res: Response) {
        try {
            const { numero } = req.body;
            const userId = req.user_id;

            const validateCartaoService = new ValidateCartaoService();
            await validateCartaoService.execute({ numero, userId });

            return res.json({ success: "Cartão validado" });
        } catch (error) {
            return res.status(400).json({ error: "Cartão inválido" });
        }
    }
}

export { ValidateCartaoController };