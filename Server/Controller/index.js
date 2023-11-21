const { PrismaClient, Prisma } = require('@prisma/client')
const prisma = new PrismaClient()
const jwt = require('jsonwebtoken')

const Cadastro = (req, res) => {    
    const main = async () => {
        
        const {email, senha} = req.body
        const {HashPwd} = require('./../Services')
        
        try{
            await prisma.user.create({
                data: {
                    email: email,
                    senha: await HashPwd(senha)
                }
            })
        }catch(err){
            //Erro previsto pelo Prisma -> Linha já existente
            if(err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") { 
                return res.status(400).send({message: "Usuário já estava cadastrado", error: err})
            } else {
                throw err;
            }
        }
        
        return res.status(201).send({message: "Usuário Cadastrado"})
    }

    main()
        .catch((err)=>{res.status(400).send({message: "Erro no cadastro do usuário", error: err})})
        .finally(async ()=>{await prisma.$disconnect()})
};

const Login = async (req, res) => {
    const {email, senha} = req.body
    const { AuthPwd } = require('./../Services')
    
    const user = await prisma.user.findUnique({
        where: {
            email: email,
        }
    })

    if(user){
        if(await AuthPwd(user.senha, senha)) {
            const dados = {
                email: user.email,                    
                id: user.id,
                belongsTo: "USER"
            }
            const accessToken= jwt.sign(
                dados,
                process.env.JWT_ACCESS_TOKEN_SECRET,
                {expiresIn: "1d"}
            )
            return res.status(202).send({accessToken, message: "Login bem-sucedido!"})
        } else {
            return res.status(401).send({message: "Senha incorreta"})
        }
    } else{
        return res.status(404).send({message: "Usuário não cadastrado"})
    }

main()
    .catch((err)=>{res.status(400).send(err); throw err})
    .finally(async ()=>{await prisma.$disconnect()})
}

const BuscarMonstros = (req, res) => {
    const main = async () => {
        // if(req.dados.belongsTo !== "USER") return res.status(403).send({message: "Permissão negada"})

        const monster = await prisma.monster.findMany()

        const dados = monster.map((monstroAtual) => {
            return {
                id: monstroAtual.id,
                name: monstroAtual.name,
                description: monstroAtual.description,
                image: monstroAtual.image
            }
        })

        return res.status(200).send({message: "Busca feita com sucesso", monsters: dados})
    }
    main()
        .catch((err)=>{res.status(400).send({message: "Erro na busca de monstros", error: err})})
        .finally(async ()=>{await prisma.$disconnect()})
}

const CriarMonstro = (req, res) => {    
    const main = async () => {
        // if(req.dados.belongsTo !== "USER") return res.status(403).send({message: "Permissão negada"})

        const {name, description, image} = req.body
        try{
            await prisma.monster.create({
                data: {
                    name: name,
                    description: description,
                    image: image
                }
            })
        }catch(err){
            //Erro previsto pelo Prisma -> Linha já existente
            if(err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") { 
                return res.status(400).send({message: "Monstro já estava cadastrado", error: err})
            } else {
                throw err;
            }
        }
        return res.status(201).send({message: "Monstro Cadastrado"})
    }

    main()
        .catch((err)=>{res.status(400).send({message: "Erro no cadastro do monstro", error: err})})
        .finally(async ()=>{await prisma.$disconnect()})
}

const ModificarMonstro = async (req, res) => {
    const main = async () => {
        if (req.dados.belongsTo !== "USER") {
            return res.status(403).send({ message: "Permissão negada" });
        }

        const id = req.params.id
        const { name, description, image } = req.body;

        const monstro = await prisma.monster.update({
            where: {
                id: parseInt(id),
            },
            data: {
              name: name,
              description: description,
              image: image
            },
          })
        if (monstro === null) return res.status(404).send({ message: "Monstro não encontrado" });
        return res.status(200).send({ message: "Monstro modificado com sucesso" });
    }
     
    main()
        .catch((err)=>{res.status(400).send({message: "Erro na modificação do monstro", error: err})})
        .finally(async ()=>{await prisma.$disconnect()})
}

const DeletarMonstro = (req, res) => {
    const main = async () => {
        if(req.dados.belongsTo !== "USER") return res.status(403).send({message: "Permissão negada"})

        const id = req.params.id

        // Busca o monstro via ID
        const monstro = await prisma.monster.findUnique({
            where: {
                id: parseInt(id),
            },
        })
        if(monstro === null) return res.status(404).send({message: "Monstro não encontrado"})

        await prisma.monster.delete({
            where: {id: parseInt(id)}
        })
        return res.status(200).send({message: "Monstro removido com sucesso"})
    }

    main()
        .catch((err)=>{res.status(400).send({message: "Erro na remoção do monstro", error: err})})
        .finally(async ()=>{await prisma.$disconnect()})
}

module.exports = {
    Cadastro,
    Login,
    BuscarMonstros,
    CriarMonstro,
    ModificarMonstro,
    DeletarMonstro,
    authJWT(req, res){
        return res.status(200).send({message: "Token de acesso autêntificado"})
    }
}