import { erro } from "./modules.js"
let validpassword
const loginaccount = document.getElementById("loginaccount")
const createaccount = document.getElementById("createaccount")
const displayerrorr = document.getElementById("errod")
const carregando = document.getElementById("carregando")
const sucess = document.getElementById("sucesss")

loginaccount.style.visibility = "hidden"
createaccount.style.visibility = "hidden"
displayerrorr.style.visibility = "hidden"
function carregartudo() {
    const params = new URLSearchParams(window.location.search)
    let type = params.get("m")
    if (type == "login") {
        loginaccount.style.visibility = "visible"
        createaccount.style.visibility = "hidden"
        createaccount.remove()
        console.log("fodase1")
    }
    else {
        createaccount.style.visibility = "visible"
        loginaccount.style.visibility = "hidden"
        loginaccount.remove()
    }
}
document.addEventListener('DOMContentLoaded', () => {
    carregando.style.visibility = "visible"
    carregartudo()
    carregando.style.visibility = "hidden"
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
            text.innerHTML = "Segurança: Ruim"
            text.style.color = "orange"
            validpassword = false
            break;
        case 2:
            text.innerHTML = "Segurança: Médio"
            text.style.color = "rgb(238, 223, 0)"
            validpassword = false
            break;
        case 3:
            validpassword = true
            text.innerHTML = "Segurança: Boa"
            text.style.color = "green"
            break;
    }
})

document.getElementById("voltar").addEventListener("click",() => {
    displayerrorr.style.display = "none"
    blurr.style.visibility = "hidden"
    displayerrorr.style.animationName = ""
})
document.getElementById("voltarbtnn").addEventListener("click",() => {
    sucess.style.display = "none"
    blurr.style.visibility = "hidden"
    sucess.style.animationName = ""
})
document.getElementById("create").addEventListener("submit", async (event) => {
    event.preventDefault()
    const password = document.getElementById("password").value
    const email = document.getElementById("email").value
    const numero = document.getElementById("numero").value
    const cpf = document.getElementById("cpf").value
    const name = document.getElementById("nome").value
    let validcpf
    let validmail
    if (numero.length > 11 || /[a-zA-Z]/.test(numero)) {
        erro("Erro ao criar conta,  insira um numero de celular valido.","visible",displayerrorr)
    }
    else if (password == "" || email == "" || numero == "" || cpf == "") {
        erro("Erro ao criar conta,  conclua todos os campos.","visible",displayerrorr)
    }
    if (name.length < 8) {
        erro("Erro ao criar conta,  nome precisa ter 8 caracteres ou mais","visible",displayerrorr)
    }
    else {
        carregando.style.display = "flex"
        await fetch(`https://api.invertexto.com/v1/validator?token=24397%7Cjuzss1fREpTQksB4bTdvl6jbJy7hjAA0&value=${cpf}&type=cpf`).then(res => res.json()).then(res =>{
        validcpf = res.valid
            })
        await fetch(`https://api.invertexto.com/v1/email-validator/${email}?token=24397%7Cjuzss1fREpTQksB4bTdvl6jbJy7hjAA0`).then(res => res.json()).then(res => {
        validmail = res.valid_format

            })
        if (!validcpf) {
            erro("Erro ao criar conta,  cpf invalido.","visible",displayerrorr)
            carregando.style.display = "none"
        }
        if (!validmail) {
            erro("Erro ao criar conta,  email invalido","visible",displayerrorr)
            carregando.style.display = "none"
        }
        if (validcpf && validmail && validpassword) {
            console.log("enviando fetch")
            carregando.style.display = "flex"
            console.log("antesdafetch ")
            await fetch("createaccount.php", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    numero,
                    cpf,
                    password
                })
            }).then(res => res.json()).then(res => {
                carregando.style.display = "none"
                console.log(res)
                console.log(res.message)
                console.log(res.body)
                console.log(res.success)
                if (!res.success) {
                    erro(res.message,"visible",displayerrorr)
                }
                else {
                    erro("Conta criada com sucesso","visible",sucess)
                    document.querySelector("#voltarbtn").addEventListener("click", function () {
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
    carregando.style.display = "flex"
    await fetch("login.php", {
        method: "POST",
        headers: {"Content-Type": "Application/json"},
        body: JSON.stringify({
            emailinput,senhainput
        })
    }).then(res => res.json()).then(res => {
        carregando.style.display = "none"
        console.log(res)
        document.getElementById("email").value = ""
        document.getElementById("senha").value = ""
        if (!res.success) {
            erro(res.message,"visible",displayerrorr)
        }
        else {
            erro("Login efetuado com sucesso.","visible",sucess)
            document.getElementById("voltar").addEventListener("click", function () {
            window.location = "index.html"
            console.log("fodastico")
            })
        }
    })
})
document.getElementById("voltarbtn").addEventListener("click", () => {
    window.location = "index.html"
})
