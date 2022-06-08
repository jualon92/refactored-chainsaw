const TablaHome = (props) => {
  console.log("arr tabla", props.operaciones);

  return (
    <div class="contenedor-tabla">
      <div class="listado-operaciones">
        Ultimos 10 cargados:{" "}
        <div id="listado">
          <table class="tabla-listaHome table table-hover  table-striped table-responsive-sm table-active">
            <thead>
              <tr>
                <th scope="col">concepto</th>
                <th scope="col">monto</th>
                <th scope="col">fecha</th>
                <th scope="col">tipo</th>
              </tr>
            </thead>
            <tbody class="tabla-disp">
              {props.operaciones.map((ele) => {
                return (
                  <tr class="table-active">
                    <th scope="row">{ele.concepto}</th>
                    <td>{ele.monto}</td>
                    <td>{ele.fecha}</td>
                    <td>{ele.tipo}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TablaHome;
