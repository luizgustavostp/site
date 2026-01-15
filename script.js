let hamburguer = document.getElementById("hamburguer")
let display = document.querySelector("div#displayhamburguer")
let displaystyle = window.getComputedStyle(display).display

function fodase() {
    console.log("consolo logo10")
    displaystyle = window.getComputedStyle(display).display
    console.log("consolo logo2")
    if (displaystyle == "none") {
        console.log("consolo logo")
        display.style.display = "block"
    }
    else {
        display.style.display = "none"
    }
}
try {
fetch("produtos.php")
    .then(response => response.json())
    .then(data => {
        console.log(data);
        data.forEach(produto => {
            console.log(produto.nome, produto.preco);
        });
})
}catch {
    //console.log(err)
}

