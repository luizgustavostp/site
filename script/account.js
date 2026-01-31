import { displayupdate } from "./modules.js"
let validpassword
function carregartudo() {
    const params = new URLSearchParams(window.location.search)
    let type = params.get("m")
            document.getElementById("loginaccount").style.display = "none !important"
            document.getElementById("createaccount").style.display = "none !important"
    if (type == "login") {
        document.getElementById("loginaccount").style.display = "flex !important"
        document.querySelector("#createaccount").remove()
        console.log("fodase1")
    }
    else {
        document.getElementById("createaccount").style.display = "flex !important"
        document.querySelector("section#loginaccount").remove()
    }
}
document.addEventListener('DOMContentLoaded', () => {
    carregartudo()
    displayupdate("hamburguer","quit","displayhamburguer")
});
let inputzao = document.getElementById("password")

inputzao.addEventListener("input",() => {
    let pass = inputzao.value
    let nivel = 0
    let letter = /[A-Z]/.test(pass)
    const temNumero = /[0-9]/.test(pass);
    const text = document.getElementById("security")
    document.querySelector("li#maxdigits").removeAttribute("class")
    document.querySelector("li#letramaiscula").removeAttribute("class")
    document.querySelector("li#possuinumero").removeAttribute("class")
    if (pass.length > 8) {
        nivel++

        document.querySelector("li#maxdigits").setAttribute("class","did")
    }
    if (letter) {
        nivel++

        document.querySelector("li#letramaiscula").setAttribute("class","did")
    }
    if (temNumero) {
        nivel++

        document.querySelector("li#possuinumero").setAttribute("class","did")
    }
    switch (nivel){
        case 0:
            text.innerHTML = "Segurança:"
            text.style.color = "black"
            validpassword = false
            break;
        case 1:
            text.innerHTML = "Segurança: Facil"
            text.style.color = "orange"
            validpassword = false
            break;
        case 2:
            text.innerHTML = "Segurança: médio"
            text.style.color = "rgb(238, 223, 0)"
            validpassword = false
            break;
        case 3:
            validpassword = true
            text.innerHTML = "Segurança: Dificil"
            text.style.color = "green"
            break;
    }
})

document.getElementById("voltar").addEventListener("click",() => {
    document.getElementById("displayerrorr").style.display = "none"
})
document.getElementById("create").addEventListener("submit", async (event) => {
    event.preventDefault()
    const password = document.getElementById("password").value
    const email = document.getElementById("email").value
    const numero = document.getElementById("numero").value
    const cpf = document.getElementById("cpf").value
    let validcpf
    let validmail
    if (numero.length > 11 || /[a-zA-Z]/.test(numero)) {
        document.querySelector("#errormsg").textContent = "Erro ao criar conta,  insira um numero de celular valido."
        document.getElementById("displayerrorr").style.display = "flex"
    }
    else if (password == "" || email == "" || numero == "" || cpf == "") {
        document.querySelector("#errormsg").textContent = "Erro ao criar conta,  conclua todos os campos."
        document.getElementById("displayerrorr").style.display = "flex"
    }
    else {
        document.getElementById("carregando").style.display = "flex"
        await fetch(`https://api.invertexto.com/v1/validator?token=24397%7Cjuzss1fREpTQksB4bTdvl6jbJy7hjAA0&value=${cpf}&type=cpf`).then(res => res.json()).then(res =>{
        validcpf = res.valid
            })
        await fetch(`https://api.invertexto.com/v1/email-validator/${email}?token=24397%7Cjuzss1fREpTQksB4bTdvl6jbJy7hjAA0`).then(res => res.json()).then(res => {
        validmail = res.valid_format

            })
        if (!validcpf) {
            document.querySelector("#errormsg").textContent = "Erro ao criar conta,  cpf invalido."
            document.getElementById("displayerrorr").style.display = "flex"
            document.getElementById("carregando").style.display = "none"
        }
        if (!validmail) {
            document.querySelector("#errormsg").textContent = "Erro ao criar conta,  email invalido."
            document.getElementById("displayerrorr").style.display = "flex"
            document.getElementById("carregando").style.display = "none"
        }
        if (validcpf && validmail && validpassword) {
            console.log("enviando fetch")
            document.getElementById("carregando").style.display = "flex"
            console.log("antesdafetch ")
            await fetch("createaccount.php", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    numero,
                    cpf,
                    password
                })
            }).then(res => res.json()).then(res => {
                console.log("respondeu")

                document.getElementById("carregando").style.display = "none"
                console.log(res)
                console.log(res.message)
                console.log(res.body)
                console.log(res.success)
                if (!res.success) {
                    document.querySelector("#errormsg").textContent = res.message
                    document.getElementById("displayerrorr").style.display = "flex"
                }
                else {
                    document.querySelector("#errormsg").textContent = "Conta criada com sucesso"
                    document.getElementById("displayerrorr").style.display = "flex"
                    document.querySelector("#erro").textContent = "Sucesso"
                    document.querySelector("#voltar").addEventListener("click", function () {
                    window.location = "index.html"
            })
                }
            })
            console.log("fetch enviado")
    }
    }
})
document.getElementById("login").addEventListener ("submit",async (event) => {
    event.preventDefault()
    let emailinput = document.getElementById("email").value
    let senhainput = document.getElementById("senha").value
    console.log(emailinput,senhainput)
    document.getElementById("carregando").style.display = "flex"
    await fetch("login.php", {
        method: "POST",
        headers: {"Content-Type": "Application/json"},
        body: JSON.stringify({
            emailinput,senhainput
        })
    }).then(res => res.json()).then(res => {
        document.getElementById("carregando").style.display = "none"
        console.log(res)
        document.getElementById("email").value = ""
        document.getElementById("senha").value = ""
        if (!res.success) {
            document.querySelector("#errormsg").textContent = res.message
            document.getElementById("displayerrorr").style.display = "flex"
        }
        else {
            document.querySelector("#erro").textContent = "Sucesso"
            document.querySelector("#errormsg").textContent = "Login efetuado com sucesso."
            document.getElementById("displayerrorr").style.display = "flex"
            document.querySelector("#voltar").addEventListener("click", function () {
            window.location = "index.html"
            })
        }
    })
})