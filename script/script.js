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
    const mobileurl = ["./imgs/lataffa-mobile.webp",'./imgs/banoffi-mobile.webp','./imgs/vulcan-mobile.webp','./imgs/jubilant-mobile.webp',"./imgs/lataffa-mobile.webp"]
    const normalurl = ["./imgs/lataffa-banner(satured.webp",'./imgs/banoffi.webp','./imgs/vulcan-banner.webp','./imgs/jubilant-noir.webp',"./imgs/lataffa-banner(satured.webp"]
    if (window.innerWidth <= 550) {

    for (let i = 0; i<childrens.length;i++) {
       childrens[i].src = mobileurl[i]
       console.log(i)
    }
    }   
    else {
    for (let i = 0; i<childrens.length;i++) {
       childrens[i].src = normalurl[i]
       console.log(i)
    }
    }
}
// Chama ao carregar e ao redimensionar a janela

window.addEventListener('load', trocarImagem);
window.addEventListener('resize', trocarImagem);

async function carregarmulher(grid) {
    let itembase = document.getElementsByClassName("displayitem")[0]
    let data = await updateitems()
    console.log(data)
    data.map(element => {
        if (element.genero == "feminino") {
            carregardisplays(element,grid,itembase)
        }
    })
}
carregarmulher(grid)
displayupdate("hamburguer","quit","displayhamburguer")
document.getElementById("carregando").style.display = "none"
document.getElementById("carregando").style.visibility = "hidden"