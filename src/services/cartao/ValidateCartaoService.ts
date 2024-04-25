import prismaClient from "../../prisma";

interface AuthRequest {
    numero: string;
    userId: string;
}

class ValidateCartaoService {
    async execute({ numero, userId }: AuthRequest) {
        // Verificar se o cartão existe e pertence ao usuário logado
        const cartao = await prismaClient.cartao.findFirst({
            where: {
                numero: numero,
                usuarioId: userId
            }
        });

        if (!cartao) {
            throw new Error("Dados do cartão inválidos!");
        }

        return {
            success: true
        };
    }
}

export { ValidateCartaoService };