console.warn("alta prueba")

const btnAgregarOperacion = document.querySelector(".btn-agregarOperacion")



btnAgregarOperacion.addEventListener("click", e => {
    //crear elemento
    console.log("fui clickeado")
     
    let concepto = document.querySelector(".input-concepto").value  //reever
    let monto = document.querySelector(".input-monto").value
    let fecha = document.querySelector(".input-fecha").value
    let tipo = document.querySelector(".input-tipo").value

    document.querySelector(".input-concepto").value = ""
    document.querySelector(".input-monto").value = ""
    document.querySelector(".input-fecha").value = ""
    document.querySelector(".input-tipo").value = ""

   // let operacion = { "concepto": concepto, "monto": parseInt(monto), "fecha":fecha, "tipo":tipo  }
    
   let operacion = {concepto,monto,fecha,tipo}
   console.log("stringify", JSON.stringify(operacion))

    fetch('/operaciones', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(operacion),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
})


async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}