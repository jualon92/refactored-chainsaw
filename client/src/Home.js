 
import useFetch from "./useFetch";

//ingresos useState
function Home() {
  const { error, estaPendiente, data: operaciones } = useFetch("/operaciones");  // custom hook de fetch con try/catch
   
  const obtenerTotalTipo = (stringTipo) => {
    return operaciones
      .filter((ele) => ele.tipo == stringTipo)
      .map((ele) => ele.monto)
      .reduce((a, b) => a + b, 0);
  };

  const obtenerTotal = () => obtenerTotalTipo("INGRESO") - obtenerTotalTipo("EGRESO");
  

  return (
    <div className="contenedor-home">
      <div>
        {error && <div>{error}</div>}
        {estaPendiente && <div>Cargando...</div>}

        {operaciones && <div>Total ingreso: {obtenerTotalTipo("INGRESO")}</div>}
        {operaciones && <div>Total egreso: {obtenerTotalTipo("EGRESO")}</div>}
        {operaciones && <div>Balance: {obtenerTotal()}</div>}
      </div>
    </div>
  );
}

export default Home;
