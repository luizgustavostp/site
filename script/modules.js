export async function updateitems() {
    try {
        const response = await fetch("http://localhost/site/produtos.php");
        const data = await response.json();
        console.log("fodase")
        sessionStorage.setItem("catalog", JSON.stringify(data));
        console.log("fodase2")

        return data; // ← AGORA SIM
    } catch (erro) {
        console.error(erro);
        return []; // evita quebrar o app
    }
}
export function displayupdate(btn1,btn2,displayurl) {
    const hamburguerbtn = document.getElementById(btn1)
    const quitbtn = document.getElementById(btn2)
    
    hamburguerbtn.addEventListener("click",() => {
        let display = document.getElementById(displayurl)
        console.log("fodase")
        let displaystyle = window.getComputedStyle(display).display
        if (displaystyle == "none") {
            display.style.display = "block"
        }
        else {
            display.style.display = "none"
        }
    })
    quitbtn.addEventListener("click",() => {
        console.log("fodase")
        let display = document.getElementById(displayurl)
        let displaystyle = window.getComputedStyle(display).display
        if (displaystyle == "none") {
            display.style.display = "block"
        }
        else {
            display.style.display = "none"
        }
    })
}

export function carregardisplays(element,grido,itembase) {
    let newitem = itembase.cloneNode(true)
    let itembasechild = newitem.childNodes
    itembasechild[7].textContent += element.price.toString().replace('.', ',');
    itembasechild[9].textContent += element.price / 10
    itembasechild[9].textContent += "0"
    itembasechild[1].src = element.imagepath;
    itembasechild[3].textContent = element.name;
    itembasechild[11].src = element.starspath;
    grido.appendChild(newitem)
}