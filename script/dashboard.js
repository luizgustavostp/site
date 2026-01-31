import { displayupdate } from "./modules.js";

async function play() {
    const me = await displayupdate("hamburguer","quit","displayhamburguer")
    let address = JSON.parse(localStorage.getItem("address"))
    const params = new URLSearchParams(window.location.search)
    let type = params.get("m")

    console.log(type)
        if (!me.logged) {
            console.log("ta logado nao chefia")
            document.getElementById("notlogged").setAttribute("class","active")
        }
        else {
            document.getElementById("userinterface").setAttribute("class","active")
            document.getElementById("emailname").textContent = me.user.email
        }
        if (!address) {
            document.getElementById("no_address").setAttribute("class","active")
        }
        else {
            document.getElementById("on_address").setAttribute("class","active")
            document.getElementById("Estado_label").textContent += address.estado
            document.getElementById("Cidade_label").textContent += address.cidade
            document.getElementById("Bairro_label").textContent += address.bairro
            document.getElementById("Casa_label").textContent += address.casa
            document.getElementById("Complemento_label").textContent += address.complemento
            document.getElementById("Cep_label").textContent += address.cep
        }
        if (type == "addaddress") {
        document.getElementById("add_address").setAttribute("class","active2")
        document.getElementById("no_address").removeAttribute("class","active")
    }

        
}

play()
document.getElementById("carregando").style.display = "none"

function adddaddress() {
    document.getElementById("on_address").style.display = "block"
}

async function carregarestados() {
    await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados").then(res => res.json()).then(res => {
        res.forEach(element => {
           let option = document.createElement("option")
           option.innerText = element.nome
           option.value = element.id
           document.getElementById("estado").appendChild(option)
        });        
        })

    document.getElementById("estado").addEventListener("change", async () => {
        document.getElementById("cidade").innerHTML = `<option value="notselected">Não selecionado</option>`
        await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${document.getElementById("estado").value}/municipios`).then(res => res.json()).then(res => {
            res.forEach(element => {
            let option = document.createElement("option")
            option.innerText = element.nome
            option.value = element.id
            document.getElementById("cidade").appendChild(option)
        })
    })
})
}
carregarestados()

document.getElementById("enviar").addEventListener("click", () => {
    const estadoSelect = document.getElementById("estado");
    const cepValue = document.getElementById("cep").value;
    const child = document.getElementById("add_address").children
    let cancontinue = true
    Array.from(child).forEach(el => {
        console.log(el)
        if (el.nodeName == "INPUT") {
            if (el.value.length === 0) {
            document.querySelector("#errormsg").textContent = "Erro ao cadastrar endereço, todos os campos são obrigatorios"
            document.getElementById("displayerrorr").style.display = "flex"
            cancontinue = false
            }
        }
        else if (el.nodeName == "SELECT") {
            if (el.value == "notselect") {
            document.querySelector("#errormsg").textContent = "Erro ao cadastrar endereço, todos os campos são obrigatorios"
            document.getElementById("displayerrorr").style.display = "flex"
            cancontinue = false
        }
    }
    });
    if (cancontinue) {
        console.log("fodase")
    const address = {
        estado: estadoSelect.options[estadoSelect.selectedIndex].text,
        cidade: document.getElementById("cidade").value,
        bairro: document.getElementById("bairro").value,
        rua: document.getElementById("rua").value,
        casa: document.getElementById("casa").value,
        complemento: document.getElementById("complemento").value,
        cep: cepValue
    };

    // validações
    const tem8char = cepValue.length === 8;
    const temNumero = /^[0-9]+$/.test(cepValue);

    if (!tem8char || !temNumero) {
        document.querySelector("#errormsg").textContent = "Erro ao cadastrar endereço, cep invalido."
        document.getElementById("displayerrorr").style.display = "flex"
        return;
    }

    // salvar corretamente
    localStorage.setItem("address", JSON.stringify(address));
    document.querySelector("#errormsg").textContent = "Endereço adicionado com sucesso"
    document.getElementById("displayerrorr").style.display = "flex"
    document.querySelector("#erro").textContent = "Sucesso"
    window.location = "dashboard.html"
}
});
document.getElementById("voltar").addEventListener("click",() => {
    document.getElementById("displayerrorr").style.display = "none"
})