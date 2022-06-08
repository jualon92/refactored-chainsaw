import "./RegistroOperaciones.css"

const RegistroOperaciones = () => {
  return (
    <div className="Registro-contenedor">
      <h1>Registro de operacion </h1>

      <form action="" className="Alta-formulario mb-5">
        <label for="concepto">Concepto</label>
        <input
          type="text"
          id="concepto"
          name="concepto"
          class="inpAlta-input"
        />

        <label for="monto">Monto</label>
        <input type="number" id="monto" name="monto" class="Alta-input" />

        <label for="fecha">fecha</label>
        <input
          type="date"
          for="fecha"
          id="fecha"
          name="fecha"
          class="Alta-input"
        />

        <label for="tipo">tipo</label>
        <select id="tipo" name="tipo" class="Alta-input">
          <option value="EGRESO">EGRESO</option>
          <option value="INGRESO">INGRESO</option>
        </select>
        <button type="button" class="Alta-btnAgregar btn btn-success">
          Agregar Operacion
        </button>
      </form>
    </div>
  );
};

export default RegistroOperaciones;
