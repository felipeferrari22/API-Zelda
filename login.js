/**
 * Script utilizado para realizar o login do cliente
 */

// Verifica se já há JWT salvo em cookie
// Se sim, pula a etapa de login
// Senão, dá continuidade ao login
try{
    const JWT = document.cookie
                .split("; ")
                .find(tag => tag.startsWith("JWT="))
                .split("=")[1]
    fetch("http://localhost:3000/authJWT", {
        method: "GET",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "auth": `${JWT}`
        },
        cache: "no-store"
    })
    .then(async(res) => {
        const json = await res.json()
        if(res.status.toString()[0] === "4")
            console.error(json.message)
        else
            window.location.href = "./monsters.html"
    })
}catch{}

// Busca os elementos <input> e <button> do login
const inputUsuario = document.getElementById("input-usuario")
const inputSenha = document.getElementById("input-senha")
const botaoLogin = document.getElementById("botao-login")

const validarInputs = () => {
    let validacao = 0
    inputUsuario.value !== "" ? validacao++ : null
    inputSenha.value !== "" ? validacao++ : null
    validacao === 2 ? botaoLogin.disabled = false : botaoLogin.disabled = true
}

// Define os listeners para o evento de "input" dos elementos <input>
inputUsuario.oninput = validarInputs
inputSenha.oninput = validarInputs

// EventListner no botão de envio
document.getElementById("botao-login").addEventListener("click", () => {
    // Dados de Login
    const email = inputUsuario.value
    const senha = inputSenha.value

    fetch(`http://localhost:3000/Login`, {
        method: "POST",
        body: JSON.stringify({
            email: email,
            senha: senha
        }),
        headers: {"Content-type": "application/json; charset=UTF-8"},
        cache: "no-store"
    })
    .then(async (res) => {
        const json = await res.json()
        if(res.status.toString()[0] === "4") {  // -> Erro Prevísto
            console.error(json.message)
            alert(json.message)
        } else {                                // -> Sucesso
            console.log(json.message)
            document.cookie = `JWT=${json.accessToken}` // -> Salva JWT nos Cookies
            document.cookie = `EMAIL=${(email)}`   // -> Salva o Email do Cliente nos Cookies
            window.location.href = "./monsters.html"
        }
    })
    .catch((err) => {                           // -> Erro não previsto
        console.error(err)
        alert("Ocorreu um erro")
    })
})

document.getElementById("ir-para-cadastro").addEventListener("click", () => {
    window.location.href = "./cadastro.html"
})