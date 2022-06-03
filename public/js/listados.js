import Lista from "./helpers/Lista.js"

console.warn("listado")



document.querySelector(".input-mostrar").addEventListener("change", async (e) => {

    let valorSeleccionado = document.querySelector(".input-mostrar").value
    console.log("valor sel", valorSeleccionado)

    //mostrar tabla con ingreso e egresos. tabla!

    let response = await fetch("/operaciones") //fetch 
    let data = await response.json()

    console.log(data)

    //filtrar segun valor seleccionado
    let dataFiltrada = data.filter(operacion => operacion.tipo == valorSeleccionado)
    console.log(dataFiltrada)


    //
    let listaDatos = Lista.normalizar(dataFiltrada)
    // document.querySelector(".lista-show").innerHTML = JSON.stringify(listaDatos) // rever



    //popular tabla, seria mejor utilizar handlebars o template engine para no mezclar html/logica
    document.querySelector(".tabla-disp").innerHTML = ""
    listaDatos.forEach(ele => {

        document.querySelector(".tabla-disp").innerHTML +=
        `
        <tr class="table-active">
            <th scope="row">${ele.concepto}</th>
            <td>${ele.monto}</td>
            <td>${ele.fecha}</td>
            <td>${ele.tipo}</td>
        </tr>
         `
    });
})