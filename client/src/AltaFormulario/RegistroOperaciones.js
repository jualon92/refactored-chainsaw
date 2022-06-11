import "./RegistroOperaciones.css";
import { useState } from "react";
import "./Alta.css";
import { putData } from "../helpers/api";
const RegistroOperaciones = () => {
  const estadoInicial = { concepto: "", monto: "", fecha: "", tipo: "EGRESO" };
  const [state, setState] = useState(estadoInicial);
  const [estaDesactivado, setEstaDesactivado] = useState(true);

  //check if any element is empty
  const hayInputVacio = (s) => Object.values(s).some((ele) => ele == "");

  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;

    setState((prevState) => ({
      ...prevState,
      [name]: e.target.value,
    }));

    setEstaDesactivado(hayInputVacio(state)); // si hay input vacio esta desactivado
  };

  const procesarAlta = () => {
    putData(state)  //si es success, reiniciar estado. reinicio provocaria disable submit
      .then((data) => {
        console.log("success", data);
        setState(estadoInicial);
        setEstaDesactivado(true) //desactivado luego de submit
      })
      .catch((error) => { 
        console.error("Error:", error);
      });
  };

  return (
    <div className="Registro-contenedor">
      <h1>Registro de operacion </h1>

      <form className="Alta-formulario mb-5">
        <label for="concepto">Concepto</label>
        <input
          value={state.concepto}
          name="concepto"
          onChange={(e) => handleChange(e)}
          type="text"
          id="concepto"
          required
          class="Alta-input"
        />

        <label for="monto">Monto</label>
        <input
          type="number"
          id="monto"
          name="monto"
          class="Alta-input"
          onChange={(e) => handleChange(e)}
          value={state.monto}
          required
        />

        <label for="fecha">fecha</label>
        <input
          value={state.fecha}
          onChange={(e) => handleChange(e)}
          type="date"
          for="fecha"
          id="fecha"
          name="fecha"
          required
          class="Alta-input"
        />

        <label for="tipo">tipo</label>
        <select
          id="tipo"
          name="tipo"
          class="Alta-input"
          required
          value={state.tipo}
          onChange={(e) => handleChange(e)}
        >
          <option value="EGRESO">EGRESO</option>
          <option value="INGRESO">INGRESO</option>
        </select>
        <button
          type="button"
          disabled={estaDesactivado}
          class="Alta-btnAgregar btn btn-success"
          onClick={() => procesarAlta()}
        >
          Agregar Operacion
        </button>
      </form>
    </div>
  );
};

export default RegistroOperaciones;
