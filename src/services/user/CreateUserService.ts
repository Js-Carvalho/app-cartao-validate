import { Prisma } from "@prisma/client";
import prismaClient from "../../prisma";
import { hash } from "bcryptjs";

interface UserRequest {
    nome: string;
    email: string;
    login: string;
    senha: string;
}

class CreateUserService {
    async execute({ nome, email, login, senha }: UserRequest) {
        if (!login) {
            throw new Error("login não encontrado!");
        }
        const UserAlreadyExists = await prismaClient.usuario.findFirst({
            where: {
                login: login
            }
        });
        if (UserAlreadyExists) {
            throw new Error("E-mail já cadastrado!");
        }

        const senhaHash = await hash(senha, 8);

        const user = await prismaClient.usuario.create({
            data: {
                nome: nome,
                email: email,
                login: login,
                senha: senhaHash,
            },
            select: {
                id: true,
                nome: true,
                email: true,
                login: true,
            },
        });

        return (user);
    }
}

export { CreateUserService };

// vizualização de dados no postgress select * from "Usuario" - usar as aspas no nome da tabela