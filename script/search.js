import { displayupdate } from "./modules.js"
import { carregardisplays } from "./modules.js"
import { ativarmenuconfig} from "./modules.js"

const grid = document.querySelector("div#displayitems")
let label = document.getElementById("label")
const errordisplay = document.getElementById("error")
const errormsg = document.getElementById("errormsg")



async function carregarsearch(grid) {
    const params = new URLSearchParams(window.location.search)
    let termo = params.get("q")
    const genero = params.get("genero")
    const categoria = params.get("categoria")
    const maxprice = params.get("maxprice")
    const minprice = params.get("minprice")
    document.querySelector("#maxprice").value = maxprice
    document.querySelector("#minprice").value = minprice
    document.querySelector("#maxoprice").textContent = `Preço máximo: ${document.querySelector("#maxprice").value}R$`
    document.querySelector("#minoprice").textContent = `Preço minimo: ${document.querySelector("#minprice").value}R$`
    document.querySelector("input#invisible").value = termo 
    termo = termo.toLowerCase();
    let itembase = document.getElementsByClassName("displayitem")[0]
    let catalog = JSON.parse(localStorage.getItem("catalog"))
    if (catalog) {
        console.log("Catalogo OK!")
    }
    else {
        await fetch("produtos.php").then(catalogo => catalogo.json()).then(catalogo => {
        catalog = catalogo
    })
    }
    catalog.map(item => {
        let cat = false
        let gen = false
        let price = false
        let mprice = false
        if (item.name.toLowerCase().includes(termo)) {
            if (item.category == categoria || item.category2 == categoria || item.category3 == categoria || categoria == "notselected" || categoria == null) {
                cat = true
            }
            if (item.genero == genero || genero == "notselected" || genero == null) {
                gen = true
            }
            if (item.price <= parseInt(maxprice) || parseInt(maxprice) == 0  || maxprice == null) {
                price = true
            }
            if (item.price >= parseInt(minprice) || parseInt(minprice) == 0 || maxprice == null) {
                mprice = true
            }
            console.log(genero,categoria,maxprice)
            if (cat&&gen&&price&&mprice) {
                carregardisplays(item,grid,itembase)
            }
         }
        })
    }
document.querySelector("#maxprice").addEventListener("input",() => {
    document.querySelector("#maxoprice").textContent = `Preço máximo: ${document.querySelector("#maxprice").value}R$`
})
document.querySelector("#minprice").addEventListener("input",() => {
    document.querySelector("#minoprice").textContent = `Preço minimo: ${document.querySelector("#minprice").value}R$`
})
carregarsearch(grid)
displayupdate("hamburguer","quit","displayhamburguer")


ativarmenuconfig("filterdisplay","filter-btn","quit-filter-btn")


const ordenate = document.getElementById("ordenar-btn")
let ord = 0
ordenate.addEventListener("click",() => {
    if (ord == 0) {
    let grid = document.getElementById("displayitems")
    let gridc = document.getElementById("displayitems").children
    const ordenado = Array.from(gridc).sort((a, b) =>
    a.textContent.localeCompare(b.textContent, 'pt-BR')
    );
    grid.innerHTML = ""
    ordenado.forEach(element => {
        grid.appendChild(element)
    });
    ord++
    }
    else if (ord == 1) {
        let grid = document.getElementById("displayitems")
        let gridc = document.getElementById("displayitems").children
        const ordenado = Array.from(gridc).sort((a, b) =>
        a.textContent.localeCompare(b.textContent, 'pt-BR'))
    }
})
document.getElementById("submibtn").addEventListener("click",() => {
    window.location = `search.html?q=${document.getElementById("pesq").value}`
})