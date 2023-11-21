const botaoModificarMonstro = document.getElementById("botao-criar-monstro")
const nomeModificarMonstro = document.getElementById("nome-criar-monstro")
const descricaoModificarMonstro = document.getElementById("descricao-criar-monstro")
const imagemModificarMonstro = document.getElementById("imagem-criar-monstro")

// Função de validação dos inputs para tirar/colocar o disabled no botão de modificar
const validarInputs = () => {
    let validacao = 0
    nomeModificacrMonstro.value !== "" ? validacao++ : null   
    descricaoModificarMonstro.value !== "" ? validacao++ : null                       //Senha !== ""
    imagemModificarMonstro.value !== "" ? validacao++ : null                   //Confirmação !== ""

    // Caso todos os testes sejam verdadeiros, retira o disable do botão
    validacao === 3 ? botaoModificarMonstro.disabled = false : botaoModificarMonstro.disabled = true
}

// Atribui a função de validar no evento "input" dos <input>s
descricaoModificarMonstro.addEventListener("input", validarInputs)
imagemModificarMonstro.addEventListener("input", validarInputs)

// EventListener para atribuir a função de criação de conta
botaoModificarMonstro.addEventListener("click", () => modificarMonstroMonstro([nomeModificarMonstro, descricaoModificarMonstro, imagemModificarMonstro], nomeModificarMonstro.value, descricaoModificarMonstro.value, imagemModificarMonstro.value))

const modificarMonstro = (inputs, nome, descricao, imagem) => {

    fetch(`http://localhost:3000/ModificarMonstro/:id`, {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({
            name: nome,
            description: descricao,
            image: imagem
        }),
        cache: "no-store"
    })
    .then(async (res) => {
        const json = await res.json()
        if(res.status.toString()[0] === "4") {  // -> Erro Prevísto
            console.error(json.message)
            alert(json.message)
        } else {                                // -> Sucesso
            inputs.forEach(input => input.value = "")
            console.log("Monstro cadastrado")
            alert("Monstro cadastrado com sucesso!")
        }
    })
    .catch((err) => {                           // -> Erro não previsto
        console.error(err)
        alert("Ocorreu um erro")
    })
}