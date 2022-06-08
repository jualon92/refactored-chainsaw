import "./RegistroOperaciones.css"
import {useState} from "react"
const RegistroOperaciones = () => {
    const [state, setState] = useState({concepto:"", monto:0,fecha:"",tipo:""})
    
    
    const putData = async () => {
        console.log(state)
     /*
        const response = "" 
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
        */
  }

  const handleChange = (e) => {
    const target = e.target
    console.log(target)
    const name = target.name
    console.log(name)
    setState({[name]:e.target.value})
    console.log(e.target.value)

     
}


  return (
    <div className="Registro-contenedor">
      <h1>Registro de operacion </h1>

      <form action="" className="Alta-formulario mb-5">
        <label for="concepto">Concepto</label>
        <input
          value={state.concepto}
          name="concepto"
          onChange={(e)=>  handleChange(e)}
          type="text"
          id="concepto"
          required
          class="Alta-input"
        />

        <label for="monto">Monto</label>
        <input type="number" id="monto" name="monto" class="Alta-input" required/>

        <label for="fecha">fecha</label>
        <input
          type="date"
          for="fecha"
          id="fecha"
          name="fecha"
          required
          class="Alta-input"
        />

        <label for="tipo">tipo</label>
        <select id="tipo" name="tipo" class="Alta-input" required>
          <option value="EGRESO">EGRESO</option>
          <option value="INGRESO">INGRESO</option>
        </select>
        <button type="submit" class="Alta-btnAgregar btn btn-success" onClick={putData}>
          Agregar Operacion
        </button>
      </form>
    </div>
  );
};

export default RegistroOperaciones;
