import { useState } from "react";
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
    console.log("target", target);
    const name = target.name;
    console.log("nombre ele", name);
    //no se podria setear el state del parent directamente?
    setInputState((prevState) => ({
      //formar nueva operacion segun input ingresado
      ...prevState,
      [name]: e.target.value,
    }));
    console.log(inputState);
  };

  const enviarOperacion = () => {
    /*
     const eleNuevo = inputState
    const eleInicial = props.ele 
    
   console.log("ele nuevo", inputState);
     console.log("ele original", eleInicial)
    // setInputState(estadoInicial)

    // props.editarElemento(inputState)
        */
    //backend
    fetch(`/operaciones/${inputState.id}`, {
      //hacerlo con clase aux
      method: "PUT", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputState),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error.message());
      });

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
