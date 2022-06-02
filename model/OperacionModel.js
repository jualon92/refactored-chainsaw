const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    // The `host` parameter is required for other databases
    // host: 'localhost'
    dialect: 'sqlite',
    storage: './database.sqlite'
});

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });


/* Esquema del documento  */
 


const INGRESO = 'INGRESO';
const EGRESO = 'EGRESO';
const Operacion = sequelize.define('operacion',
    {
        concepto: Sequelize.TEXT,
        monto: Sequelize.DOUBLE,
        fecha: Sequelize.DATEONLY,
        tipo: Sequelize.ENUM(INGRESO, EGRESO) //ingreso o egreso
    });

 


 
 

const Op = Sequelize.Op;


//CRUD
class OperacionModel {
    static async readOperaciones() { // no necesito instanciar con new
        return await Operacion.findAll()
    }

    static async readOperacion(pid) {
        return await Operacion.findAll({ where: { id: pid } }) //await solo no funciona por try catch  
    }

    static async createOperacion(concepto, monto, fecha, tipo) { 
        return await Operacion.create({ concepto, monto, fecha, tipo })
    }


    static async updateOne(id, concepto,monto,fecha,tipo ) {
        let ele = await Operacion.findByPk(id)
        return ele.update({
            concepto, // mismo que concepto:concepto
            monto, 
            fecha,
            tipo
          
        })

    }

    static async deleteOperacion(id) {
        let libro = await Operacion.findByPk(id)
        libro.destroy()

    }
}


module.exports = {
    OperacionModel
}
