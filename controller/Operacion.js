const { json } = require("express/lib/response")
const { OperacionModel } = require("../model/OperacionModel.js")


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
};