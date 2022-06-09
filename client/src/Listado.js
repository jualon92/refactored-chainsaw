const Listado = () => {
  return (
    <div class="contenedor-listado">
      <h1>Listado</h1>

      <form action=" ">
        <label class="mb-3" for="tipo">
          {" "}
          elegir tipo de listado a mostrar:{" "}
        </label>
        <select id="tipo" name="tipo" class="input-mostrar">
          <option type="submit" value="EGRESO">
            EGRESO
          </option>
          <option type="submit" value="INGRESO">
            INGRESO
          </option>
        </select>
      </form>

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
        <tbody class="tabla-disp"></tbody>
      </table>

      <div class="contenedor-editar"></div>
    </div>
  );
};

export default Listado;
