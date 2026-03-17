import { updateitems } from "./modules.js"
import { carregardisplays } from "./modules.js"
import { displayupdate } from "./modules.js"

document.getElementById("carregando").style.display = "flex"
document.getElementById("carregando").style.visibility = "visible"
let hamburguer = document.getElementById("hamburguer")
let grid = document.getElementById("gridmulher")
let page = 1
const caroseldireita = document.getElementById("carossel-direita")
const caroselesquerda = document.getElementById("carossel-esquerda")
const carossel = document.getElementById("carrosel")
const imgscar = carossel.children
let ant  = imgscar[1]

caroseldireita.addEventListener("click",async () => {
        page--
        ant.removeAttribute("class","imgact")
        imgscar[page].setAttribute("class","imgact")
        ant = imgscar[page]

        if (page == 4) {
            caroselesquerda.style.display = "none"
        }
        else {
            caroselesquerda.style.display = "flex"
        }
        if (page == 0) {
            caroseldireita.style.display = "none"
        }
        else {
            caroseldireita.style.display = "flex"
        }
        carossel.style.transform = `translateX(-${page}00%)`
})
caroselesquerda.addEventListener("click",async () => {
    page++
    if (ant) {
    ant.removeAttribute("class","imgact")
    }
    imgscar[page].setAttribute("class","imgact")
    ant = imgscar[page]

    if (page == 4) {
        caroselesquerda.style.display = "none"
    }
    else {
        caroselesquerda.style.display = "flex"
    }
    if (page == 0) {
        caroseldireita.style.display = "none"
    }
    else {
        caroseldireita.style.display = "flex"
    }
    carossel.style.transform = `translateX(-${page}00%)`
})
function trocarImagem() {
    const childrens = document.getElementById("carrosel").children
    const mobileurl = ["./imgs/lataffa-mobile.png",'./imgs/banoffi-mobile.png','./imgs/vulcan-mobile.png','./imgs/jubilant-mobile.png',"./imgs/lataffa-mobile.png"]
    const normalurl = ["./imgs/lataffa-banner(satured.png",'./imgs/banoffi.png','./imgs/vulcan-banner.png','./imgs/jubilant-noir.png',"./imgs/lataffa-banner(satured.png"]
    if (window.innerWidth <= 550) {

    for (let i = 0; i<childrens.length;i++) {
       childrens[i].src = mobileurl[i]
    }
    }   
    else {
    for (let i = 0; i<childrens.length;i++) {
       childrens[i].src = normalurl[i]
    }
    }
}


window.addEventListener('load', trocarImagem);
window.addEventListener('resize', trocarImagem);

async function carregarmulher(grid) {
    let itembase = document.getElementsByClassName("displayitem")[0].cloneNode(true)
    let data = await updateitems()
    console.log(data)
    grid.innerHTML = ""
    data.map(element => {
        if (element.genero == "masculino") {
            carregardisplays(element,grid,itembase)
        }
    })
}
carregarmulher(grid)
displayupdate("hamburguer","quit","displayhamburguer")
document.getElementById("carregando").style.display = "none"
document.getElementById("carregando").style.visibility = "hidden"
document.getElementById("itemlogo").addEventListener("click",()=> {
    window.location = "index.html"
})