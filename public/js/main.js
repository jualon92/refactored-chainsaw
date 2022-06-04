import Lista from "./helpers/Lista.js"

console.warn("hola mundo")


//seria mejor hacerlo con template engine ie handlebars 
const getTemplate = (ele) => {

    return `
    <tr class="table-active">
        <th scope="row">${ele.concepto}</th>
        <td>${ele.monto}</td>
        <td>${ele.fecha}</td>
        <td>${ele.tipo}</td>
    </tr>
     `
}

const getOperaciones = async () => {
    let response = await fetch("/operaciones")
    let data = await response.json()


    console.log(data)
    return data
}

const calcularAcuMonto = (lista, palabraClave ) => { //get total
    return lista.filter(ele => ele.tipo == palabraClave) // solo match tipo
                .map(ele => ele.monto) // array montos
                .reduce((a, b) => a + b, 0)   // sumatoria                             
}


const getBalanceMonto = async () => {
    //podrian ahorrarse fetch con uno solo onLoad, pero si el usuario pasa mucho tiempo en la pagina?
    const operaciones = await getOperaciones()  
    console.log(operaciones)
    const totalIngreso=  calcularAcuMonto(operaciones, "INGRESO")
     
    const totalEgreso  = calcularAcuMonto(operaciones, "EGRESO")
    console.log(totalIngreso,totalEgreso)

    document.getElementById("balance-monto").innerHTML =  totalIngreso - totalEgreso
    

}

function compare( a, b ) {
    if ( a.fecha > b.fecha ){
      return -1;
    }
    if ( a.fecha < b.fecha ){
      return 1;
    }
    return 0;
  }


const ordenarMasReciente = (lista) => {
    return lista.sort(compare)
}
//pide los 10 mas recientes.
const getUltimos = async (cantidadAMostrar) => {
    const operaciones = await getOperaciones() 
    console.log(operaciones)
    //sort mas reciente
    const listaOrdenadaFecha = ordenarMasReciente(operaciones)
    console.log("lista ordenada",listaOrdenadaFecha)

    // grab last n items
    const ultimasOperaciones = listaOrdenadaFecha.slice(0,cantidadAMostrar)
    console.log(ultimasOperaciones)

   // const listaNormalizada = normalizarLista(ultimasOperaciones)
    const listaNormalizada = Lista.normalizar(ultimasOperaciones) 
    listaNormalizada.forEach(ele => {  

        document.querySelector(".tabla-disp").innerHTML +=
        getTemplate(ele)

         
    });
  //  document.getElementById("listado").innerHTML += JSON.stringify(ultimasOperaciones) 

}



const getTotalesMonto  = async()=> {
    const operaciones = await getOperaciones() 
    document.querySelector(".ingresos-total").innerHTML =  calcularAcuMonto(operaciones, "INGRESO")
    document.querySelector(".egresos-total").innerHTML = calcularAcuMonto(operaciones, "EGRESO")
    
}

getTotalesMonto()
getBalanceMonto()
getUltimos(5)



 