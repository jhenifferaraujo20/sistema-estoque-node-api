import express from "express";
import { findAll, findById, save, update, remove } from "../services/produtosService.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const produtosRouter = express.Router();

produtosRouter.get("/produtos", authMiddleware, async (req, res) => {
    try {
        const products = await findAll();
        res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao buscar produtos." });
    }
});

produtosRouter.get("/produtos/:id", authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const product = await findById(id);

        if (product.exists) {
            return res.status(200).json(product);
        } else {
            return res.status(404).json({ error: "Produto não encontrado." });
        }
    } catch (error) {
        return res.status(500).json({ error: "Erro ao buscar o produto." });
    }
});

produtosRouter.post("/produtos", authMiddleware, async (req, res) => {
    try {
        const newProductData = req.body;
        await save(newProductData);
        return res.status(201).json({ message: "Produto cadastrado com sucesso." });
    } catch (error) {
        return res.status(500).json({ msg: "Erro ao cadastrar o produto." });
    }
});

produtosRouter.put("/produtos/:id", authMiddleware, async (req, res) => {
    try {
        const id = req.params.id;
        const updatedProductData = req.body;
        const flag = await update(id, updatedProductData);

        if (flag) {
            return res.status(200).json({ message: "Produto atualizado com sucesso." });
        } else {
            return res.status(404).json({ error: "Produto não encontrado." });
        }
    } catch (error) {
        return res.status(500).json({ error: "Erro ao atualizar o produto." });
    }   
});

produtosRouter.delete("/produtos/:id", authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const flag = await remove(id);

        if(flag) {
            return res.status(200).json({ message: "Produto deletado com sucesso." });
        } else {
            return res.status(404).json({ error: "Produto não encontrado." });
        }
    } catch (error) {
        return res.status(500).json({ error: "Erro ao deletar o produto." });
    }  
});

export default produtosRouter;