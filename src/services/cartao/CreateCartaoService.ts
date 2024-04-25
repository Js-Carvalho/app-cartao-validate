import { Prisma } from "@prisma/client";
import prismaClient from "../../prisma";

interface UserRequest {
    numero: string;
    nomeProprietario: string;
    validade: string;
    digitoSeguranca: string;
    usuarioId: string;
}

class CreateCartaoService {

    async execute({ numero, nomeProprietario, validade, digitoSeguranca, usuarioId }: UserRequest) {
        if (!numero) {
            throw new Error("Cartão não encontrado!");
        }
        const CartaoAlreadyExists = await prismaClient.cartao.findFirst({
            where: {
                numero: numero
            }
        });
        if (CartaoAlreadyExists) {
            throw new Error("Cartão já cadastrado!");
        }

        const cartao = await prismaClient.cartao.create({
            data: {
                numero: numero,
                nomeProprietario: nomeProprietario,
                validade: validade,
                digitoSeguranca: digitoSeguranca,
                Usuario: {
                    connect: {
                        id: usuarioId
                    }
                }
            },
            select: {
                numero: true,
                nomeProprietario: true,
                validade: true,
                digitoSeguranca: true
            },
        });

        return cartao;
    }
}

export { CreateCartaoService };