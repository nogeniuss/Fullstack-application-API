import { request } from 'express'
import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'


//recomendação da bibblioteca, de tranformar a biblioteca em uma função
const app = express()
//por padrão o express, não utiliza json, então precisamos informa-lo
app.use(express.json())
app.use(cors())//http://localhost:5173/?'

//recomedaçao biblioteca para trabalhar com mongo db
const prisma = new PrismaClient()


// rota para criar dados no banco de dados atraves da body params
app.post('/user', async (req, res) => {
    await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    });
    res.status(201).json(req.body);

});

//rota para listar dados do banco de dados com body params
//para listar um unico dado utilizar - find(sem o many)
app.get('/user', async (req, res) => {
    const users = await prisma.user.findMany();
    res.status(200).json(users);

});

//rota para editar um dado do banco de dados, 
//caso alterar mais, utilizar updateMany
app.put('/user/:id', async (req, res) => {
    await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    });
    res.status(201).json(req.body);

});

//rota para excluir um dado, caso exclusão em massa utilizar outra rota
app.delete('/user/:id', async (req, res) => {
    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    });
    res.status(200).json({ message: "Usuario deletado" });

});

//roda o nosso servidor e suas rotas
app.listen(3000, () => {
    console.log('servidor rodando em http://localhost:3000/user');
});


