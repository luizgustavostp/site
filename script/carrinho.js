const cart = JSON.parse(localStorage.getItem("cart"))

async function loadcarrinho() {
    let tot = 0
    let productinfo = JSON.parse(localStorage.getItem("catalog"))
    if (!productinfo) {
        const response = await fetch("produtos.php");
        const data = await response.json();
        productinfo = data
    }
    cart.forEach(element => {
        let item = productinfo.find(item => item.id == element.id) 
        let newproductcart = document.getElementsByClassName("product-carrinho")[0].cloneNode(true)
        let productC = newproductcart.children
        let texts = productC[1].children
        let nameinput = texts[0]
        let priceinput = texts[1]
        let qntd = element.quantidade
        let quantidadediv = productC[2].children
        productC[0].src = item.imagepath
        nameinput.innerText = item.name
        priceinput.innerText = "R$"
        priceinput.innerText += item.price
        quantidadediv[1].innerText = element.quantidade
        let priceN = Number(item.price)
        function qnt(bool) {
            if (bool && qntd < 10 && qntd >= 0) {
                qntd++
                tot += priceN
            }
            else if (qntd == 1 && !bool) {
                apagar(element,cart)
            }
            else if (!bool && qntd > 0) {
                qntd--
                tot -= priceN
            }
            quantidadediv[1].innerText = qntd
            document.getElementById("pricetotal").textContent = `R$${tot}`
            element.quantidade = qntd
            localStorage.setItem("cart",JSON.stringify(cart))
        }
        quantidadediv[0].addEventListener("click",() => {
            qnt(false)
        })
        quantidadediv[2].addEventListener("click",() => {
            qnt(true)
        })
        productC[3].addEventListener("click",() => {
            apagar(element,cart)
        })

        newproductcart.style.display = "flex"
        document.getElementById("carrinho").appendChild(newproductcart)

        tot += (priceN * qntd)
        document.getElementById("pricetotal").textContent = `R$${tot}`
    });
}
loadcarrinho()
function apagar(element,cart) {
    const index = cart.findIndex(item => item.id == element.id);
    if (index !== -1) {
        cart.splice(index, 1);
    }
    localStorage.setItem("cart",JSON.stringify(cart))
    window.location.reload()
}