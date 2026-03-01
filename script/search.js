import { displayupdate, updateitems, carregardisplays, ativarmenuconfig} from "./modules.js"

const grid         = document.querySelector("div#displayitems")
const errordisplay = document.getElementById("error")
const errormsg     = document.getElementById("errormsg")
const params   = new URLSearchParams(window.location.search)


let url        = window.location.search
let itembase   = document.getElementsByClassName("displayitem")[0].cloneNode(true)
let foundItems = []
let page       = [0]
let len = [8]
async function carregarsearch() {
    const catalog = await updateitems() 
    catalog.forEach(item => {
        let can = true
        params.forEach((value,key) => {
            if (key == "name" || key == "genero") {
                if (item[key] != value && value.length != 0) {
                    can = false
                    console.log("name invalid")
                }
            }
            if (key == "categoria") {
                if (item["category1"] != value && item["category2"] != value && item["category3"] != value && value.length != 0) {
                    can = false
                    console.log("categoria invalid")
                }
            }
            if (key == "maxprice") {
                if (item["price"] >= parseInt(value)) {
                    can = false
                    console.log("maxprice invalid")
                }
            }
            if (key == "minprice") {
                if (item["price"] <= parseInt(value)) {
                    can = false
                    console.log("minprice invalid")
                }
            }
        })
        if (can) { 
            foundItems.push(item)
        }
        })
    return foundItems
}

async function RenderItemsForPages(array) {
    let arr = array;
    let length  = (page[0] * 8) + 8
    len[0] = arr.length
    console.log(page[0])
    grid.innerHTML = ""
    let itemI
    if (page[0] > 0 || (page[0] * 8) + 8 > arr.length ) {
        length = arr.length
    }
    console.log(length)
    console.log(page[0] * 8)
    for (let i = (page[0] * 8); i < length; i++) {
        itemI = arr[i]
        carregardisplays(itemI,grid,itembase)
    }
}

document.querySelector("#maxprice").value = params.get("maxprice") != null ? parseInt(params.get("maxprice")) : 500
document.querySelector("#minprice").value = params.get("minprice") != null ? parseInt(params.get("minprice")) : 0  

document.querySelector("#maxoprice").textContent = `Preço máximo: ${document.querySelector("#maxprice").value}R$`
document.querySelector("#minoprice").textContent = `Preço minimo: ${document.querySelector("#minprice").value}R$`


document.querySelector("#maxprice").addEventListener("input",() => {
    document.querySelector("#maxoprice").textContent = `Preço máximo: ${document.querySelector("#maxprice").value}R$`
})
document.querySelector("#minprice").addEventListener("input",() => {
    document.querySelector("#minoprice").textContent = `Preço minimo: ${document.querySelector("#minprice").value}R$`
})

let arr = await carregarsearch()
RenderItemsForPages(arr)
displayupdate("hamburguer","quit","displayhamburguer")
ativarmenuconfig("filterdisplay","filter-btn","quit-filter-btn")


const ordenate = document.getElementById("ordenar-btn")

ordenate.addEventListener("click",async () => {
    const ordenado = arr.sort((a, b) =>
        a.name.localeCompare(b.name, 'pt-BR'))
    RenderItemsForPages(ordenado)
})

document.getElementById("nextpagebtn").addEventListener("click",() => {
    adicionarpage(false)
})
document.getElementById("antpagebtn").addEventListener("click",() => {
    adicionarpage(true)
})

document.getElementById("filter-form").addEventListener("click",event => {
    event.preventDefault()
})

document.getElementById("filter").addEventListener("click",()=> {
    document.getElementById("filter-form").submit()
})

function adicionarpage(bool) {
    if (bool && (len[0] - ((page[0] * 8) + 8)) > 0) {
        page[0] = page[0] + 1
    }
    else if (!bool && page[0] > 0) {
        page[0] = page[0] - 1
        console.log("dimiu")
    }
    console.log(page)
    RenderItemsForPages(arr)
}