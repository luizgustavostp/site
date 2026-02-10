import { displayupdate } from "./modules.js";
import { ativarmenuconfig } from "./modules.js";
import { erro } from "./modules.js";
document.getElementById("carregando").style.display = "none"
const sucess = document.getElementById("sucesss")
const error = document.getElementById("errod")

async function play() {
    const me = await displayupdate("hamburguer","quit","displayhamburguer")
    let address = JSON.parse(localStorage.getItem("address"))
    const params = new URLSearchParams(window.location.search)
    let type = params.get("m")
    console.log(me)
        if (!me.logged) {
            document.getElementById("not-logged").setAttribute("class","active")
        }
        else {
            document.getElementById("user-logged").setAttribute("class","active")
            document.getElementById("name").textContent = me.user.nome
        }
        if (address) {
            document.getElementById("Estado_label").textContent += address.estado
            document.getElementById("Cidade_label").textContent += address.cidade
            document.getElementById("Bairro_label").textContent += address.bairro
            document.getElementById("Casa_label").textContent += address.casa
            document.getElementById("Complemento_label").textContent += address.complemento
            document.getElementById("Cep_label").textContent += address.cep
        }
        if (type == "addaddress") {
        document.getElementById("adicionar-endereco").setAttribute("class","active2")
    }

        
}
const voltar = document.getElementById("voltar-not-logged")
voltar.addEventListener("click",() => {
    window.location = "account.html"
})
play()

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
    const child = document.getElementById("adicionar-endereco").children
    let cancontinue = true
    Array.from(child).forEach(el => {
        console.log(el)
        if (el.nodeName == "INPUT") {
            if (el.value.length === 0) {
            erro("Erro ao cadastrar endereço, todos os campos são obrigatorios","visible",error)
            cancontinue = false
            }
        }
        else if (el.nodeName == "SELECT") {
            if (el.value == "notselect") {
            erro("Erro ao cadastrar endereço, todos os campos são obrigatorios","visible",error)
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

    const tem8char = cepValue.length === 8;
    const temNumero = /^[0-9]+$/.test(cepValue);

    if (!tem8char || !temNumero) {
        erro("Erro ao cadastrar endereço, cep invalido.","visible",error)
        return;
    }

    localStorage.setItem("address", JSON.stringify(address));
    erro("Endereço adicionado com sucesso.","visible",sucess)
    window.location = "dashboard.html"
}
});

ativarmenuconfig("alterar-senha","alterar-senha-btn","alterar-senha-quit")
ativarmenuconfig("gerenciar-endereco","gerenciar-endereco-quit","gerenciar-endereco-btn")

document.getElementById("alterar-btn").addEventListener("click",() => {
    const newname = document.getElementById("new-pass").value
    const newnamerepeat = document.getElementById("new-passa-repeat").value
    if (newname == newnamerepeat && newname.length > 8) {
        fetch("mudarsenha.php",{
            method: "POST",
            headers: {"Content-Type": "Application/json"},
            body: JSON.stringify({
                newname
            })
        })
        window.location = "perfil.html"
    }
    else {
        erro("Erro ao alterar a senha, as senhas precisam ter 8 caracteres ou mais, e serem identicas","visible",errod)
    }
})
function sairmenu(display) {
    display.style.display = "none"
    display.style.visibility = "hidden"
}

document.getElementById("voltar").addEventListener("click",() => {
    sairmenu(error)
})

document.getElementById("gerenciar-endereco-apagar").addEventListener("click",() => { 
    document.getElementById("adicionar-endereco").style.display = "flex"
})