import express from 'express';
import { findAll, findById, save, remove, update } from '../services/usuariosService.js';

const usersRoute = express.Router();

usersRoute.get('/usuarios', async (req, res) => {
    try {
        const users = await findAll();
        return res.status(200).json(users); 
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao buscar usuários.' });
    }
});

usersRoute.get('/usuarios/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await findById(id);

        if(user) {
            return res.status(200).json(user);
        } else {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao buscar o usuário.' });
    }  
});

usersRoute.post('/usuarios', async (req, res) => {
    try {
        const newUserData = req.body;

        await save(newUserData);
        return res.status(201).json({ message: 'Usuário cadastrado com sucesso.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao cadastrar o usuário.' });
    }
});

usersRoute.put('/usuarios/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUserData = req.body;

        const flag = await update(id, updatedUserData);

        if(flag) {
            return res.status(200).json({ message: 'Usuário atualizado com sucesso.' });
        } else {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao atualizar o usuário.' });
    }
});

usersRoute.delete('/usuarios/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const flag = await remove(id);

        if (flag) {
            return res.status(200).json({ message: 'Usuário deletado com sucesso.' });
        } else {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao deletar o usuário.' });
    }
});

export default usersRoute;