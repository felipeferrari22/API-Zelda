const botaoCriarMonstro = document.getElementById("botao-criar-monstro")
const nomeCriarMonstro = document.getElementById("nome-criar-monstro")
const descricaoCriarMonstro = document.getElementById("descricao-criar-monstro")
const imagemCriarMonstro = document.getElementById("imagem-criar-monstro")

// Função de validação dos inputs para tirar/colocar o disabled no botão de criar
const validarInputs = () => {
    let validacao = 0
    nomeCriarMonstro.value !== "" ? validacao++ : null   
    descricaoCriarMonstro.value !== "" ? validacao++ : null                       //Senha !== ""
    imagemCriarMonstro.value !== "" ? validacao++ : null                   //Confirmação !== ""

    // Caso todos os testes sejam verdadeiros, retira o disable do botão
    validacao === 3 ? botaoCriarMonstro.disabled = false : botaoCriarMonstro.disabled = true
}

// Atribui a função de validar no evento "input" dos <input>s
descricaoCriarMonstro.addEventListener("input", validarInputs)
imagemCriarMonstro.addEventListener("input", validarInputs)

// EventListener para atribuir a função de criação de conta
botaoCriarMonstro.addEventListener("click", () => criarMonstro([nomeCriarMonstro, descricaoCriarMonstro, imagemCriarMonstro], nomeCriarMonstro.value, descricaoCriarMonstro.value, imagemCriarMonstro.value))

const criarMonstro = (inputs, nome, descricao, imagem) => {

    fetch(`http://localhost:3000/CriarMonstro`, {
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