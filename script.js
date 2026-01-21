let hamburguer = document.getElementById("hamburguer")
let display = document.querySelector("div#displayhamburguer")
let displaystyle = window.getComputedStyle(display).display
let grid = document.getElementById("gridmulher")
let itembase = document.getElementsByClassName("displayitem")[0]
function displayupdate() {
    displaystyle = window.getComputedStyle(display).display
    if (displaystyle == "none") {
        display.style.display = "block"
    }
    else {
        display.style.display = "none"
    }
}
async function updateitems() {
try {
fetch("produtos.php")
    .then(response => response.json())
    .then(data => {
    data.map(element => {
        let newitem = itembase.cloneNode(true)
        let itembasechild = newitem.childNodes
        console.log(itembasechild)
        console.log(element)
        itembasechild[7].textContent += element.preço
        itembasechild[9].textContent += element.preço / 10
        itembasechild[1].src = element.imageid;
        itembasechild[3].textContent = element.name;
        grid.appendChild(newitem)
    });
});
}
catch(erro) {
    console.log(erro)
}
}


function trocarImagem() {
    const vulcan = document.getElementById('vulcan');
    const jubilant = document.getElementById('jubilant');
    const banoffi = document.getElementById('banoffi');
    const lataffa = document.getElementById("lataffa")
    const lataffa2 = document.getElementById("lataffa2")
  if (window.innerWidth <= 550) {
    vulcan.src = 'imgs/vulcan-mobile.png';
    jubilant.src = 'imgs/jubilant-mobile.png';
    banoffi.src = 'imgs/banoffi-mobile.png';
    lataffa.src = "imgs/lataffa-mobile.png";
    lataffa2.src = "imgs/lataffa-mobile.png";
  } else {
    vulcan.src = 'imgs/vulcan-banner.png';
    jubilant.src = 'imgs/jubilant-noir.png';
    banoffi.src = 'imgs/banoffi.png';
    lataffa.src = "imgs/lataffa-banner(satured.png";
    lataffa2.src = "imgs/lataffa-banner(satured.png";
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

(() => {
    updateitems()
    updateitems()
    updateitems()
    updateitems()
    updateitems()   
})()
