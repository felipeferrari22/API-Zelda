const express = require("express");
const routes = new express.Router();

const { AuthTokenAcesso } = require('./Middlewares') // Middleware de Auth do JWT

const { authJWT, Cadastro, Login, BuscarMonstros, CriarMonstro } = require('./Controller/')
routes.get('/authJWT', AuthTokenAcesso, authJWT)
routes.post('/Cadastro', Cadastro)
routes.post('/Login', Login)
routes.get('/BuscarMonstros', AuthTokenAcesso, BuscarMonstros)
routes.post('/CriarMonstro', AuthTokenAcesso, CriarMonstro)

module.exports = routes;