import "./Listado.css";
import { useEffect, useState } from "react";
import useFetch from "../useFetch";
import TablaDataSegunTipo from "./TablaDataSegunTipo";
import FormEdit from "./FormEdit";
import { fetchData } from "../helpers/api";
const Listado = () => {
  const [eleccionTipo, setEleccionTipo] = useState("");
  const [mostrarEdicion, setMostrarEdicion] = useState(null);
  const [data, setData] = useState(null);


  useEffect(() => {
     fetchData(setData); //rever, callback
    
  }, []);

  const handleReplace = (eleNuevo) => {
    //encontrar indiceElemento
    let indiceUbicacion = data.findIndex((ele) => eleNuevo.id == ele.id);
    //devolver lista sin elemento
    let arrLista = data.filter((ele) => eleNuevo.id !== ele.id);
    //ubicar ele nuevo en la posicion del ele inicial
    arrLista.splice(indiceUbicacion, 0, eleNuevo);
    setData(arrLista);
    console.log("nueva data", data);
  };

  const procesarCambio = (e) => {
    //toma valor, la elecc
    const value = e.target.value; //rever
    setEleccionTipo(value);
    ocultar(); //quitar de la vista para no confundir
  };
  const handleEdit = (ele) =>  setMostrarEdicion(ele);
 

  const ocultar = () => setMostrarEdicion(false);

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
          <option value="" disabled selected hidden>
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

        {eleccionTipo && (
          <TablaDataSegunTipo
            operaciones={data}
            tipo={eleccionTipo}
            setData={setData}
            handleEdit={handleEdit}
          /> //rever
        )}
      </table>

      {/*podria ser child de tablaDataSegunTipo*/}
      {mostrarEdicion && (
        <FormEdit
          ele={mostrarEdicion}
          ocultar={ocultar}
          handleReplace={handleReplace}
        />
      )}
    </div>
  );
};

export default Listado;
