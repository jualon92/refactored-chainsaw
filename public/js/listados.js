

console.warn("listado")
let DATA = [] //no esta bueno var global, rever


//seria mejor hacerlo con template engine ie handlebars 
const getTemplate = (ele) => {

    return `
    <tr class="table-active">
        <th scope="row">${ele.concepto}</th>
        <td>${ele.monto}</td>
        <td>${ele.fecha}</td>
        <td>${ele.tipo}</td>
        <td> <button type="button" class="btn-editar" onclick='mostrarFormularioEdit(${ele.id})'>Editar</button> </td>
        <td scope="col"> <button type="button" class="btn-eliminarOp" onclick='borrar(${ele.id})'>X</button> </td>
    </tr>
     `
}


const getFormularioEdit = (id) => {
    return `<h2>Editar operacion</h2>
    <form action="" class="formulario-alta">

        <label for="concepto">Concepto</label>
        <input type="text" id="concepto" name="concepto" class="input-concepto">


        <label for="monto">Monto</label>
        <input type="number" id="monto" name="monto" class="input-monto">

        <label for="fecha">fecha</label>
        <input type="date" for="fecha" id="fecha" name="fecha" class="input-fecha">

         
        <button type="button" class="btn-agregarOperacion" onclick="editarOperacion(${id})">Editar</button>
    </form>
`
}

const editarOperacion = async (id) => {
    console.warn("editado")
  

    let inputConcepto = document.querySelector(".input-concepto") 
    let inputMonto = document.querySelector(".input-monto")
    let inputFecha = document.querySelector(".input-fecha")
    let listaInputs = [inputConcepto, inputMonto, inputFecha]

 

    
    
   
    var operacion = {}
    
    if (inputConcepto.value !== ""){ //refactor
        operacion.concepto = inputConcepto.value
    }
    if (inputMonto.value !== ""){
        operacion.monto = inputMonto.value
        console.log("passing monto", inputMonto.value)
        console.log("passing obj", operacion.monto)
    }
    if (inputFecha.value !== ""){
        operacion.fecha = inputFecha.value
    }
    
    listaInputs.forEach(input => {
        input.value = "" // blank after pressing edit btn
    });
    
    
    console.log(operacion)
    console.log(id)
   

    fetch(`/operaciones/${id}`, { //hacerlo con clase aux
        method: 'PUT', // or 'PUT'
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
            console.error('Error:', error.message());
        });
    
        
}

const mostrarFormularioEdit = (id) =>   //pasamanos de id desde lista a formulario edit, reever
    document.querySelector(".contenedor-editar").innerHTML = getFormularioEdit(id)



const borrar = (id) => {
    fetch(`/operaciones/${id}`, {
        method: 'DELETE',
    })
        .then(res => res.text()) // or res.json()
        .then(res => console.log(res))

    console.log(DATA)
    let dataNueva = DATA.filter(ele => ele.id !== parseInt(id))


    document.querySelector(".tabla-disp").innerHTML = ""  //rever, podria ser una funcion, logica repetida
    dataNueva.forEach(ele => {


        document.querySelector(".tabla-disp").innerHTML +=
            getTemplate(ele)

    });

}



document.querySelector(".input-mostrar").addEventListener("click", async (e) => {

    try{
        document.querySelector(".contenedor-editar").innerHTML = ""
    }catch(error){
        console.log("form aun no existe", error.message())
    }
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
            getTemplate(ele)

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
            getTemplate(ele)

    });

}


setDataInicial()