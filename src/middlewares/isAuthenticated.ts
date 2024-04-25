import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface Payload {
    sub: string;
}

export function isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
) {
    /* console.log("Executou o Middleware isAuthenticated"); */

    // Armazena o token recebido na requisição
    const authToken = req.headers.authorization;

    // Verifica se o usuário envio um token na requisição
    if (!authToken) {
        return res.status(401).end();
    }

    const [, token] = authToken.split(" ");
    try {
        const { sub } = verify(
            token,
            process.env.JWT_SECRET
        ) as Payload;

        req.user_id = sub;

        console.log(sub);
        /* console.log(authToken); */

        next();
    }
    catch (err) {
        return res.status(401).end();
    }
}