
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

    const listaNormalizada = normalizarLista(ultimasOperaciones)
 
    listaNormalizada.forEach(ele => {  
        document.getElementById("listado").innerHTML += `<div class="elemento-operacion">  ${JSON.stringify(ele)} </div>`
    });
  //  document.getElementById("listado").innerHTML += JSON.stringify(ultimasOperaciones) 

}

//display lista
const normalizarLista = (lista) => { //seria mucho mas comodo con un template engine utilizar ${concepto.operacion}, etc.
    let nuevaLista = []
    lista.forEach(operacion => {
        const nuevaOperacion = {concepto:operacion.concepto, monto:operacion.monto, 
        fecha:operacion.fecha, tipo:operacion.tipo}
        nuevaLista.push(nuevaOperacion)
    });
    return nuevaLista
}

const getTotalesMonto  = async()=> {
    const operaciones = await getOperaciones() 
    document.querySelector(".ingresos-total").innerHTML =  calcularAcuMonto(operaciones, "INGRESO")
    document.querySelector(".egresos-total").innerHTML = calcularAcuMonto(operaciones, "EGRESO")
    
}

getTotalesMonto()
getBalanceMonto()
getUltimos(5)



