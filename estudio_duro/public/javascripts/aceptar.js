let boton = document.getElementById("aceptando");
boton.addEventListener("click", (event)=>{
    fetch('/aceptaGalletas', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({consent: true})
    })
    .then((result) => result.json()) // lo que devuelve un .then caen en el otro como parámetro
    .then((data) =>{
        console.log("fuera la pestañuca");
        let footer = document.getElementById("footer");
        footer.className = 'escondidin';
    })
});