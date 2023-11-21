// Função de excluir o monstro
const excluirMonstro = (objectId) => {

    fetch(`http://localhost:3000/DeletarMonstro/${objectId}`, {
        method: "DELETE",
        cache: "no-store"
    })
    .then(async (res) => {
        console.log({res})
        const json = await res.json()
        if(res.status.toString()[0] === "4") {  // -> Erro Prevísto
            console.error(json.message)
            alert(json.message)
        } else {                                // -> Sucesso
            console.log("Monstro excluido")
            alert("Monstro excluído com sucesso!")
            location.reload()
        }
    })
    .catch((err) => {                           // -> Erro não previsto
        console.error(err)
        alert("Houve algo de errado x-x")
    })
}

const botaoExcluirMonstro = document.getElementById("botao-deletar-monstro")
const idExcluirMonstro = document.getElementById("id-deletar-monstro")
idExcluirMonstro.addEventListener("input", () => {
    if(idExcluirMonstro.value > 0)     // -> Se o número for > 0: Botão Enabled
        botaoExcluirMonstro.disabled = false   // ~
    else                                // -> Se o número for <= 0: Botão Disabled
        botaoExcluirMonstro.disabled = true    // ~
})

// EventListener para atribuir a função de exclusão de monstro
botaoExcluirMonstro.addEventListener("click", () => excluirMonstro(idExcluirMonstro.value))