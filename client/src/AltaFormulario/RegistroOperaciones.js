import "./RegistroOperaciones.css"
import {useState} from "react"
import "./Alta.css"
const RegistroOperaciones = () => {
    const estadoInicial = {concepto:"", monto:"",fecha:"",tipo:"EGRESO"}
    const [state, setState] = useState(estadoInicial)
    const [estaDesactivado, setEstaDesactivado] = useState(true)
    
    const putData = async (e) => {
      //   e.stopPropagation();
     //   e.preventDefault()
        console.log(state.concepto)
        console.log(state.fecha)
        if (!hayInputVacio(state)){
            fetch('/operaciones', {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(state),
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
                setState(estadoInicial);
                setEstaDesactivado(true)
                console.log("estado reiniciado", state)
        }else{
            console.warn("falta input completar")
        }
      
      
         
  }

  //check if any element is empty
  const hayInputVacio  = (s) =>  Object.values(s).some( ele => ele == '')
 
  const handleChange = (e) => {
    const target = e.target
    console.log("target", target)
    const name = target.name
    console.log("nombre ele", name)
    setState(prevState => ({
        ...prevState,
        [name]: e.target.value
    }));
    
    console.log("value actual", e.target.value)
    console.log(state)
    console.log("input vacio presente?: ",hayInputVacio(state))
    setEstaDesactivado(hayInputVacio(state))   // si hay input vacio esta desactivado
    
}


  return (
    <div className="Registro-contenedor">
      <h1>Registro de operacion </h1>

      <form  className="Alta-formulario mb-5">
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
        <input type="number" id="monto" name="monto" class="Alta-input"
         onChange={(e)=>  handleChange(e)}
         value={state.monto}
        required/>

        <label for="fecha">fecha</label>
        <input
         value={state.fecha}
        onChange={(e)=>  handleChange(e)}
          type="date"
          for="fecha"
          id="fecha"
          name="fecha"
          required
          class="Alta-input"
        />

        <label for="tipo">tipo</label>
        <select id="tipo" name="tipo" class="Alta-input" required   value={state.tipo}
        onChange={(e)=>  handleChange(e)}>
          <option value="EGRESO" >EGRESO</option>
          <option value="INGRESO">INGRESO</option>
        </select>
        <button type="button" disabled={estaDesactivado} class="Alta-btnAgregar btn btn-success" onClick={ (e) => putData(e)}>
          Agregar Operacion
        </button>
      </form>
    </div>
  );
};

export default RegistroOperaciones;
