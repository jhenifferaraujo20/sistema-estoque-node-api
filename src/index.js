import "dotenv/config";
import express from "express";
import cors from "cors";
import produtosRouter from "./routers/produtosRouter.js";
import usersRoute from "./routers/usuariosRouter.js";
import authMiddleware from "./middlewares/authMiddleware.js";

const server = express();
server.use(cors({ origin: "*" }));
server.use(express.json());

const port = process.env.PORT || 3000;

server.use(produtosRouter);
server.use(usersRoute);

server.listen(port, () => {
    console.log(`Servidor executando na porta ${port}.`);
    console.log(`Acesse em: http://localhost:${port}.`);
});

// HTTP status
// - 200 Sucesso
// - 201 Salvo com sucesso
// - 400 Requisição Inválido
// - 401 Não autorizado 
// - 404 Não encontrado
// - 500 Erro no servidor