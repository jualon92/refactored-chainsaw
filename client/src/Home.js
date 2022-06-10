import useFetch from "./useFetch";
import TablaHome from "./TablaHome";
 
import * as R from 'ramda' //composicion de funciones  


//ingresos useState
function Home() {
  const { error, estaPendiente, data: operaciones } = useFetch("/operaciones"); // custom hook de fetch con try/catch
 

  const obtenerTotalTipo = (stringTipo) => {
    //console.log(operaciones)
    return operaciones
      .filter((ele) => ele.tipo == stringTipo)
      .map((ele) => ele.monto)
      .reduce((a, b) => a + b, 0);
  };

  const obtenerTotal = () =>
    obtenerTotalTipo("INGRESO") - obtenerTotalTipo("EGRESO");

    
function compare( a, b ) {
  if ( a.fecha > b.fecha ){
    return -1;
  }
  if ( a.fecha < b.fecha ){
    return 1;
  }
  return 0;
}
  const ordenarMasReciente = (lista) => lista.sort(compare)
  const obtenerRanking10 = (lista) => lista.slice(0,10)
  const getListaNormalizada =  R.pipe(ordenarMasReciente, obtenerRanking10)  //compose izq a der
  
  return (
    <div className="contenedor-home">
      <div className="contenedor-resumen d-flex flex-column align-items-center">
       
        {/*candidato a componente*/}
        {error && <div>{error}</div>}
        {estaPendiente && <div>Cargando...</div>}
        {operaciones && <div>Total ingreso: {obtenerTotalTipo("INGRESO")}</div>}
        {operaciones && <div>Total egreso: {obtenerTotalTipo("EGRESO")}</div>}
        {operaciones && <div>Balance: {obtenerTotal()}</div>}
      </div>
         {operaciones && <TablaHome operaciones={getListaNormalizada(operaciones)}/> }
      
      {/*cuando data llegue*/}
    </div>
  );
}

export default Home;
