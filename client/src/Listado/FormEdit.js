import { useState } from "react";
import { updateOperacion } from "../helpers/api";
 
const FormEdit = (props) => {
  const [inputState, setInputState] = useState({
    id: props.ele.id, //valor inicial a la operacion seleccionada
    concepto: props.ele.concepto,
    monto: props.ele.monto,
    fecha: props.ele.fecha,
    tipo: props.ele.tipo,
  });

  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    setInputState((prevState) => ({
      //formar nueva operacion segun input ingresado
      ...prevState,
      [name]: e.target.value,
    }));
    console.log(inputState);
  };

  const enviarOperacion = () => {
    updateOperacion(inputState)
    props.ocultar(); // quitarlo de vista una vez operacion realizada
    props.handleReplace(inputState); //setData array con operacion modificada
  };

  return (
    <form class="formulario-alta">
      <label for="concepto">Concepto</label>
      <input
        onChange={(e) => handleChange(e)}
        Value={props.ele.concepto}
        type="text"
        id="concepto"
        name="concepto"
        class="input-concepto"
      />
      <label for="monto">Monto</label>
      <input
        Value={props.ele.monto}
        type="number"
        id="monto"
        name="monto"
        class="input-monto"
        onChange={(e) => handleChange(e)}
      />
      <label for="fecha">fecha</label>
      <input
        onChange={(e) => handleChange(e)}
        Value={props.ele.fecha}
        type="date"
        for="fecha"
        id="fecha"
        name="fecha"
        class="input-fecha"
      />

      <button
        type="button"
        class="btn-agregarOperacion btn btn-primary"
        onClick={() => enviarOperacion()}
      >
        Editar
      </button>
    </form>
  );
};

export default FormEdit;
