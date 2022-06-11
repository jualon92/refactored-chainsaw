import "./TablaDataSegun.css";
import { useState } from "React";
import {delOperacion} from "../helpers/api"
const TablaDataSegunTipo = (props) => {
  console.log("arr tabla", props.operaciones);
  const getDataSinEle = (arrData, ele) => {
    const concepto = ele.concepto 
    const id = ele.id 

     
    console.log("concepto buscado", concepto) 
    console.log("id es", id)
    const listaFiltrada = arrData.filter((op) => op.concepto !== concepto);
    console.log(listaFiltrada) 

    //backend, refactor con clase auxiliar
    /*fetch(`/operaciones/${ele.id}`, {
      method: "DELETE",
    })
      .then((res) => res.text()) // or res.json()
      .then((res) => console.log(res)) */

    delOperacion(id)

    return listaFiltrada;
  };
  return (
    <tbody class="tabla-disp">
      {props.operaciones.filter(op => op.tipo == props.tipo).map((ele) => {
        return (
          <tr class="table-active">
            <th scope="row">{ele.concepto}</th>
            <td>{ele.monto}</td>
            <td>{ele.fecha}</td>
            <td>{ele.tipo}</td>
            <td>
              {" "}
              <button
                type="button"
                class="btn-editar btn btn-success "
                onClick={() => props.handleEdit(ele)}
              >
                Editar
              </button>
              <button
                type="button"
                name={ele.concepto}
                className="btn btn-danger TablaDataSegun-btnEliminarOp"
                onClick={() =>
                  props.setData(getDataSinEle(props.operaciones, ele))
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="bi bi-trash3"
                  viewBox="0 0 16 16"
                >
                  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                </svg>
              </button>{" "}
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};

export default TablaDataSegunTipo;
