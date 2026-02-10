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
    document.getElementById("price-product").textContent.replace(".",",")
    document.getElementById("stars").src = item.starspath
    console.log(item.imagepath,item.imagepath2)
}
start()

