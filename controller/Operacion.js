const { json } = require("express/lib/response")
const { OperacionModel } = require("../model/OperacionModel.js")
 
var moment = require('moment');

 
const GetAllOperaciones = async (req, res) => {

    const listaOperaciones = await OperacionModel.readOperaciones()


    //Modificarla o solo retornarla
    return res.json(listaOperaciones)

}

const GetOperacion = async (req, res) => {
    let id = parseInt(req.params.id)
     
    try {
        let operacion = await OperacionModel.readOperacion(id)
        return res.json(operacion)
    }
    catch (error) {
        console.log(`Error en readLibro: ${error.message}`)
        return []
    }

}

const CreateOperacion = async (req,res) => {
    let concepto  = req.body.concepto // unpacking, deconstructuring podria hacerse mejor
    let monto = req.body.monto
    let fecha = req.body.fecha
    let tipo = req.body.tipo

    try{
        let operacion = await OperacionModel.createOperacion(concepto,monto,fecha,tipo)
        return res.json(operacion)
    }catch(error){
        console.log(`Error en update Operacion: ${error.message}`)
        console.log(concepto,monto,fecha,tipo)
        return {}
    }
     
    
}

const CreateOperacionesRandom = async(req,res) => { 
    //generar item
    let cantidadOperaciones = req.params 
    let tipo = req.body.tipo
    let operaciones = []

    console.log(tipo,operaciones)
    /*
    for (let i = 0; i < cantidadOperaciones ; i++) {
        let monto =  0
        let concepto = "d"
        let fecha = moment(new Date(+(new Date()) - Math.floor(Math.random()*10000000000)))
        .format('YYYY/MM/DD');
        let nuevaOperacion = {concepto,monto,fecha,tipo}
        console.warn("nuevaOperacion")
        operaciones.push(nuevaOperacion)
    }

    operaciones.forEach(operacion => {
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
    }); */
}
const UpdateOperacion = async (req, res) => {
    let id = req.params.id
    let concepto  = req.body.concepto // unpacking, deconstructuring podria hacerse mejor
    let monto = req.body.monto
    let fecha = req.body.fecha
    let tipo = req.body.tipo
    try {
        const updateOperacion = await OperacionModel.updateOne(id, concepto,monto,fecha,tipo  )
        return res.json(updateOperacion)
    } catch (error) {
        console.log(`Error en update Operacion: ${error.message}`)
       
        return {}
    }
}

const DeleteOperacion  = async(req,res) => {
    let id = req.params.id
    try{
        const operacion = await OperacionModel.deleteOperacion(id)
        return res.sendStatus(200);
    } catch (error) {
        console.log(`Error en delete libro: ${error.message}`)
      
        return {}
    }
  
}

 

module.exports = {
    GetAllOperaciones,
    GetOperacion,
    CreateOperacion,
    UpdateOperacion,
    DeleteOperacion,
    CreateOperacionesRandom
};