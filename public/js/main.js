
console.warn("hola mundo")

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
    const operaciones = await getOperaciones()
    console.log(operaciones)
    const totalIngreso=  calcularAcuMonto(operaciones, "INGRESO")
     
    const totalEgreso  = calcularAcuMonto(operaciones, "EGRESO")
    console.log(totalIngreso,totalEgreso)

    document.getElementById("balance-monto").innerHTML =  totalIngreso - totalEgreso
 

}

function compare( a, b ) {
    if ( a.fecha < b.fecha ){
      return -1;
    }
    if ( a.fecha > b.fecha ){
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
    document.getElementById("listado").innerHTML = JSON.stringify(ultimasOperaciones) 
}


getBalanceMonto()
getUltimos(3)



