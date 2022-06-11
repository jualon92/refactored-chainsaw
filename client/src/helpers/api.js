export const delOperacion = (id) => {
  fetch(`/operaciones/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.text()) // or res.json()
    .then((res) => console.log(res));
};

export const fetchData = async (f) => { //shouldnt 
  try {
    const response = await fetch("/operaciones");
    if (!response.ok) {
      // error del server
      throw new Error(response.statusText);
    }

    const data = await response.json();
    f(data); //setData(data)
  } catch (err) {
    console.log(err.message);
  }
};

export const updateOperacion = (operacion) => {
  fetch(`/operaciones/${operacion.id}`, {
    //hacerlo con clase aux
    method: "PUT", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(operacion),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error.message());
    });
};

export const putData = async (state) => {
  fetch("/operaciones", {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(state),
  })
    .then((response) => response.json())
     
   
};
