import { displayupdate } from "./modules.js"
import { carregardisplays } from "./modules.js"

const grid = document.querySelector("div#displayitems")
let label = document.getElementById("label")

async function carregarsearch(grid) {
    let i = 0
    const params = new URLSearchParams(window.location.search)
    let termo = params.get("q")
    let genero = params.get("genero")
    let categoria = params.get("categoria")
    let maxprice = params.get("maxprice")
    document.querySelector("#maxprice").value = maxprice
    document.querySelector("#maxoprice").textContent = `Preço até: ${document.querySelector("#maxprice").value}R$`
    let termoname = termo
    
    if (termo != "") {
        termoname = termo
    }
    else if (categoria != undefined) {
        termoname = categoria
    }
    else if (genero != undefined) {
        termoname = genero
    }
    document.querySelector("input#invisible").value = termo 
    document.querySelector("h1#result").textContent += termoname
    termo = termo.toLowerCase();
    let itembase = document.getElementsByClassName("displayitem")[0]
    let catalog = JSON.parse(sessionStorage.getItem("catalog"))
    console.log(categoria)
    console.log(termo)
    console.log(catalog)
    if (catalog) {
        console.log("Catalogo OK!")
        
    }
    else {
        await fetch("produtos.php").then(catalogo => catalogo.json()).then(catalogo => {
        console.log("CARALHOOOOO")
        catalog = catalogo
        console.log("Catalogo recarregado por api!")
    })
    }
    catalog.map(item => {
        let cat = false
        let gen = false
        let price = false
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
            console.log(genero,categoria,maxprice)
            if (cat&&gen&&price) {
                carregardisplays(item,grid,itembase)
                i++  
            }
         }
        if (i == 0) {
        document.querySelector("h1#result").textContent = "Nenhum item foi encontrado!"
        label.style.display = "block"
        }
        else {
        document.querySelector("h1#result").textContent = `Resultados da busca por: ${termoname}`
        label.style.display = "none"
        }
    })
}
document.querySelector("#maxprice").addEventListener("input",() => {
    document.querySelector("#maxoprice").textContent = `Preço até: ${document.querySelector("#maxprice").value}R$`
})
carregarsearch(grid)
displayupdate("hamburguer","quit","displayhamburguer")
