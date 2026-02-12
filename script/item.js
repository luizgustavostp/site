let price
let id
const sucessAdded = document.getElementById("Adicionado-sucesso")
function start() {
    const params = new URLSearchParams(window.location.search)
    const termo = params.get("id")
    const catalog = JSON.parse(localStorage.getItem("catalog"))
    console.log("catalog: ",catalog)
    console.log(typeof termo)
    const item = catalog.find(item => item.id == Number(termo))
    console.log(termo,item.id)
    console.log(item)
    document.getElementById("img1").src = item.imagepath
    document.getElementById("img2").src = item.imagepath2
    document.getElementById("tittle-product").textContent = item.name
    document.getElementById("price-product").textContent = "R$ "
    document.getElementById("price-product").textContent += item.price
    price = item.price
    id = termo
    document.getElementById("price-product").textContent.replace(".",",")

    console.log(item.imagepath,item.imagepath2)
}
start()
const imgs = document.getElementById("imgs")
let qt = 5
document.getElementById("left").addEventListener("click",() => {
    imgs.style.transform = `translateX(-0%)`
})
document.getElementById("right").addEventListener("click",() => {
    imgs.style.transform = `translateX(-${qt}0%)`
})


const formasdisplayC = document.getElementById("formas-display").children
const arrry = [...formasdisplayC]
console.log(arrry)
arrry.forEach(element => {
    element.addEventListener("click",() => {
        arrry.forEach(elements => {
            elements.removeAttribute("class","method")
        })
        element.setAttribute("class","method")
    })
})

const menos = document.getElementById("quantidade-menos")
const mais = document.getElementById("quantidade-mais")
const text = document.getElementById("quantidade-text")
let quantidade = 1

console.log(price)
menos.addEventListener("click",() => {
    quantidade--
    text.textContent = quantidade
    document.getElementById("price-product").textContent = "R$ "
    document.getElementById("price-product").textContent += price * quantidade
})

mais.addEventListener("click",() => {
    quantidade++
    text.textContent = quantidade
    document.getElementById("price-product").textContent = "R$ "
    document.getElementById("price-product").textContent += price * quantidade
})


function ld() {
    if (window.innerWidth < 482) {
        qt = 10
            console.log(qt)
    }
    else {
        qt = 5
    }

}
window.addEventListener("load",() => {
    ld()
})
window.addEventListener("resize",() => {
    ld()    
})

const carrinhobtn = document.getElementById("adicionar-carrinho")
carrinhobtn.addEventListener("click",() => {
    let carrinho = JSON.parse(localStorage.getItem("cart"))
    console.log(carrinho)
    if (carrinho) {
        carrinho.push({
            quantidade,id
        })
        console.log("tem carrinho patrao")
    }
    else {
        carrinho = [{
            quantidade,id
        }]
        console.log("nao tem nao cria")
    }
    localStorage.removeItem("cart")
    localStorage.setItem("cart",JSON.stringify(carrinho))
    document.getElementById("blur").style.display = "block"
    document.getElementById("blur").style.visibility = "visible"
    sucessAdded.style.display = "block"
    console.log("fudido")
})
const okbtn = document.getElementById("ok")
okbtn.addEventListener("click",() => {
    document.getElementById("blur").style.display = "none"
    document.getElementById("blur").style.visibility = "hidden"
    sucessAdded.style.display = "none"
})