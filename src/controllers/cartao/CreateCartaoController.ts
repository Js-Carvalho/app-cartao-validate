import { Request, Response } from "express";
import { CreateCartaoService } from "../../services/cartao/CreateCartaoService";

class CreateCartaoController {
    async handle(req: Request, res: Response) {
        try {
            const { numero, nomeProprietario, validade, digitoSeguranca } = req.body;
            const usuarioId = req.user_id;

            const createCartaoService = new CreateCartaoService();
            const cartao = await createCartaoService.execute({
                numero,
                nomeProprietario,
                validade,
                digitoSeguranca,
                usuarioId
            });

            return res.json(cartao);
        } catch (error) {
            return res.status(400).json({ error: "Cartão já cadastrado!" });
        }
    }
}

export { CreateCartaoController };