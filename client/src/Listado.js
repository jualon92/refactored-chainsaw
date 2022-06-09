import "./Listado.css"
import { useState } from "react";
import useFetch from "./useFetch";
import TablaDataSegunTipo from "./TablaDataSegunTipo";
const Listado = () => {
  //deberia recibir la data o fetchearla por si mismo? -- indepndiente, fetch
  const [eleccionTipo, setEleccionTipo] = useState("");
  const { error, estaPendiente, data: operaciones } = useFetch("/operaciones"); // custom hook de fetch con try/catch
  const [mostrarEleccion, setmostrarEleccion] = useState(false);
  //me gusta mas que escuche cambios en eleccion de tipo
  //  const [eleccionSubmit, setEleccionSubmit] = useState("")

  const filtrarDataSegun = (lista, tipo) =>
    lista.filter((op) => op.tipo == tipo);

  const procesarCambio = (e) => {
    const value = e.target.value;
    setEleccionTipo(value);

    console.log("eleccion es ", eleccionTipo);
    setmostrarEleccion(true);
  };

  /*
  const readData = (e) => {
    //  console.log("eleccion es ", eleccionTipo);
    //   setmostrarEleccion(true)
    //  setEleccionSubmit(eleccionTipo)
    //  console.log("seleccion enviada", eleccionSubmit)
  };
  */


  return (
    <div class="contenedor-listado">
      <h1>Listado</h1>

      <form action=" ">
        <label class="mb-3" for="tipo">
          {" "}
          elegir tipo de listado a mostrar:{" "}
        </label>
        <select
          id="tipo"
          name="tipo"
          class="input-mostrar"
          onChange={(e) => procesarCambio(e)}
        >
          <option value="" disabled selected hidden >
            <span>tipo...</span> 
          </option>
          <option type="submit" value="EGRESO">
            EGRESO
          </option>
          <option type="submit" value="INGRESO">
            INGRESO
          </option>
        </select>
      </form>
      {/*}
      <button
        type="button btn"
        onClick={(e) => readData(e)}
        className="btn btn-primary"
      >
        Consultar
      </button>
  */}
      <table class="table table-hover table table-hover  table-striped mb-5 table-responsive-sm">
        <thead>
          <tr>
            <th scope="col">concepto</th>
            <th scope="col">monto</th>
            <th scope="col">fecha</th>
            <th scope="col">tipo</th>
            <th scope="col">Accion</th>
          </tr>
        </thead>

        {mostrarEleccion && (
          <TablaDataSegunTipo
            operaciones={filtrarDataSegun(operaciones, eleccionTipo)}
          />
        )}
      </table>

      <div class="contenedor-editar"></div>
    </div>
  );
};

export default Listado;
