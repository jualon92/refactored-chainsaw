export default class Lista {
    static normalizar = (lista) => { //seria mucho mas comodo con un template engine utilizar ${concepto.operacion}, etc.
        let nuevaLista = []
        lista.forEach(operacion => {
            const nuevaOperacion = {concepto:operacion.concepto, monto:operacion.monto, 
            fecha:operacion.fecha, tipo:operacion.tipo}
            nuevaLista.push(nuevaOperacion)
        });
        return nuevaLista
    }
}

