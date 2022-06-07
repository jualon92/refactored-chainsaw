import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [estaPendiente, setEstaPendiente] = useState(true);
  const [error, setError] = useState(null);

  async function fetchData() {
    const abortController = new AbortController();
    try {
      const response = await fetch(url, { signal: abortController.signal });
      if (!response.ok) {
        // error del server
        throw new Error(response.statusText);
      }
      const datosExtraidos = await response.json(); //succeed
      setEstaPendiente(false);
      setData(datosExtraidos);
      setError(null);
    } catch (err) {
      // error red, conexion
      if (err.name == "Abort.error"){
          console.log("fetch aborted")
      }else{
        console.log(err);
        setEstaPendiente(false); //aun carga
        setError(err.message);
      }
       
    } 
    return () => abortController.abort() //pausa fetch 
  }

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, estaPendiente, error };
};

export default useFetch;
