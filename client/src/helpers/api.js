export const delOperacion = (id) => {
    fetch(`/operaciones/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.text()) // or res.json()
        .then((res) => console.log(res)) 
  
  
}


export const fetchData = async (f) => {
    try {
      const response = await fetch("/operaciones");
      if (!response.ok) {
        // error del server
        throw new Error(response.statusText);
      }

       const data = await response.json();
       f(data) //setData(data)
 
    } catch (err) {
      console.log(err.message);
    }
};


