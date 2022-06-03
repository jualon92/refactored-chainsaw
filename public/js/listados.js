

console.warn("listado")
let DATA = [] //no esta bueno var global, rever


const borrar = (id) => {
    fetch(`/operaciones/${id}`, {
        method: 'DELETE',
    })
        .then(res => res.text()) // or res.json()
        .then(res => console.log(res))

    console.log(DATA)
    let dataNueva = DATA.filter(ele => ele.id !== parseInt(id))
    

    document.querySelector(".tabla-disp").innerHTML = ""
    dataNueva.forEach(ele => {

        
        document.querySelector(".tabla-disp").innerHTML +=
            `
        <tr class="table-active">
            <th scope="row">${ele.concepto}</th>
            <td>${ele.monto}</td>
            <td>${ele.fecha}</td>
            <td>${ele.tipo}</td>
            <td scope="col"> <button type="button" class="btn-eliminarOp" onclick='borrar(${ele.id})'>X</button> </td>
        </tr>
         `

    });

}
 


document.querySelector(".input-mostrar").addEventListener("click", async (e) => {


    let valorSeleccionado = document.querySelector(".input-mostrar").value
    console.log("valor sel", valorSeleccionado)

    //mostrar tabla con ingreso e egresos. tabla!

    let response = await fetch("/operaciones") //fetch 
    let data = await response.json()

    console.log(data)

    //filtrar segun valor seleccionado
    let dataFiltrada = data.filter(operacion => operacion.tipo == valorSeleccionado)
    console.log(dataFiltrada)

     DATA = dataFiltrada
    //

    // document.querySelector(".lista-show").innerHTML = JSON.stringify(listaDatos) // rever


    /*
   let plantillaHbs = await fetch('../templates/tablaListado.hbs').then(r => r.text()) // obtener plantilla
   var template = Handlebars.compile(plantillaHbs); 
   let html = template({dataFiltrada}) 
   document.querySelector(".tabla-disp").innerHTML = html
   */


    //popular tabla, seria mejor utilizar handlebars o template engine para mantener coloreado
    document.querySelector(".tabla-disp").innerHTML = ""
    dataFiltrada.forEach(ele => {

        
        document.querySelector(".tabla-disp").innerHTML +=
            `
        <tr class="table-active">
            <th scope="row">${ele.concepto}</th>
            <td>${ele.monto}</td>
            <td>${ele.fecha}</td>
            <td>${ele.tipo}</td>
            <td scope="col"> <button type="button" class="btn-eliminarOp" onclick='borrar(${ele.id})'>X</button> </td>
        </tr>
         `

    });


})










const setDataInicial = async () => { 
//data inicial
let response = await fetch("/operaciones") //fetch 
let data = await response.json()

console.log(data)

//filtrar segun valor seleccionado
let dataFiltrada = data.filter(operacion => operacion.tipo == "EGRESO")
dataFiltrada.forEach(ele => {

        
    document.querySelector(".tabla-disp").innerHTML +=
        `
    <tr class="table-active">
        <th scope="row">${ele.concepto}</th>
        <td>${ele.monto}</td>
        <td>${ele.fecha}</td>
        <td>${ele.tipo}</td>
        <td scope="col"> <button type="button" class="btn-eliminarOp" onclick='borrar(${ele.id})'>X</button> </td>
    </tr>
     `

});

}


setDataInicial()