const express = require("express");
const routes = new express.Router();

const { AuthTokenAcesso } = require('./Middlewares') // Middleware de Auth do JWT

const { authJWT, Cadastro, Login, BuscarMonstros, CriarMonstro, ModificarMonstro, DeletarMonstro } = require('./Controller/')
routes.get('/authJWT', AuthTokenAcesso, authJWT)
routes.post('/Cadastro', Cadastro)
routes.post('/Login', Login)
routes.get('/BuscarMonstros/', BuscarMonstros)
routes.post('/CriarMonstro', CriarMonstro)
routes.put('/ModificarMonstro/:id', AuthTokenAcesso, ModificarMonstro)
routes.delete('/DeletarMonstro/:id', DeletarMonstro)

module.exports = routes;