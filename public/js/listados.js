

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
        <td> <button type="button" class="btn-editar btn btn-success" onclick='mostrarFormularioEdit(${JSON.stringify(ele)})'>Editar</button> </td>
        <td scope="col"> <button type="button" class="btn btn-danger btn-eliminarOp" onclick='borrar(${ele.id})'>
        <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    fill="currentColor"
                                    class="bi bi-trash3"
                                    viewBox="0 0 16 16"
                                >
                                    <path
                                        d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"
                                    />
                                </svg>
                                 </button> </td>
    </tr>
     `
}


const getFormularioEdit = (ele) => { //podria remarquarse el elemento a editar en tabla
    return `<h2>Editar operacion ${ele.concepto}</h2>
    <form action="" class="formulario-alta">
        
        <label for="concepto">Concepto</label>
        <input type="text" id="concepto" name="concepto" class="input-concepto">


        <label for="monto">Monto</label>
        <input type="number" id="monto" name="monto" class="input-monto">

        <label for="fecha">fecha</label>
        <input type="date" for="fecha" id="fecha" name="fecha" class="input-fecha">

         
        <button type="button" class="btn-agregarOperacion btn btn-primary" onclick="editarOperacion(${JSON.stringify(ele)})">Editar</button>
    </form>
`
}

const editarOperacion = async (ele) => {
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
    console.log(ele.id)
   

    fetch(`/operaciones/${ele.id}`, { //hacerlo con clase aux
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

const mostrarFormularioEdit = (ele) =>   //pasamanos de id desde lista a formulario edit, reever
    document.querySelector(".contenedor-editar").innerHTML = getFormularioEdit(ele)
    


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

//al cambiar de categoria de lista, seccion editar deberia desaparecer para no confundir
document.querySelector(".input-mostrar").addEventListener("change", e => {
    try{
        document.querySelector(".contenedor-editar").innerHTML = ""
    }catch(error){
        console.log("form aun no existe", error.message())
    }

})

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