import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [estaPendiente, setEstaPendiente] = useState(true);
  const [error, setError] = useState(null);

  async function fetchData() {
    try {
      const response = await fetch(url);
      if (!response.ok) { // error del server
        throw new Error(response.statusText);
      }
      const datosExtraidos = await response.json();   //succeed
      setEstaPendiente(false);
      setData(datosExtraidos);
      setError(null);
    } catch (err) {  // error red, conexion
      console.log(err);
      setEstaPendiente(false); //aun carga
      setError(err.message);
    }
  }

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, estaPendiente, error };
};

export default useFetch;
