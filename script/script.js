import { updateitems } from "./modules.js"
import { carregardisplays } from "./modules.js"
import { displayupdate } from "./modules.js"

let hamburguer = document.getElementById("hamburguer")
let grid = document.getElementById("gridmulher")


function trocarImagem() {
    const childrens = document.getElementById("carrosel").children
    const mobileurl = ["imgs/lataffa-mobile.webp",'imgs/banoffi-mobile.webp','imgs/vulcan-mobile.webp','imgs/jubilant-mobile.webp',"imgs/lataffa-mobile.webp"]
    const normalurl = ["imgs/lataffa-banner(satured.webp",'imgs/banoffi.webp','imgs/vulcan-banner.webp','imgs/jubilant-noir.webp',"imgs/lataffa-banner(satured.webp"]
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
    document.body.style.zoom = "90%"
    if (window.innerWidth <= 1700) {
    document.body.style.zoom = "100%"
    }
    else {
        document.body.style.zoom = "90%"
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