const loadTable = () => {
  document.getElementById("table-body").innerHTML = "";
  return new Promise((resolve, reject) => {
    fetch("https://api-dishes.vercel.app")
      .then((datos) => datos.json())
      .then((datos) => {
        const select = document.getElementById("select-id");
        datos.data.forEach((dish) => {
          const row = document.createElement("tr");
          row.innerHTML = `
          <td>${dish.idDish}</td>
                <td>${dish.name}</td>
                <td>${dish.calories}</td>
                <td>${dish.isVegetarian ? "Si es" : "No es"}</td>
                <td>${dish.value}</td>
                <td>${
                  dish.comments == "" ? "Sin comentarios" : dish.comments
                }</td>
                <td><button class='btn btn-danger' value='${
                  dish._id
                }' onclick='drop(this.value)'>Eliminar</button></td>
                `;

          const option = document.createElement("option");
          option.value = dish._id;
          option.innerText = dish.idDish;
          select.appendChild(option);

          document.getElementById("table-body").appendChild(row);
        });
      })
      .catch((error) => console.log(error));
  });
};

loadTable();

const findById = () => {
  const option = document.getElementById("select-id");
  if (option.value != "Seleccione un ID") {
    return new Promise((resolve, reject) => {
      fetch(`https://api-dishes.vercel.app/${option.value}`)
        .then((datos) => datos.json())
        .then((datos) => {
          document.getElementById("table-body").innerHTML = "";
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${datos.data.idDish}</td>
                  <td>${datos.data.name}</td>
                  <td>${datos.data.calories}</td>
                  <td>${datos.data.isVegetarian ? "Si es" : "No es"}</td>
                  <td>${datos.data.value}</td>
                  <td>${
                    datos.data.comments == ""
                      ? "Sin comentarios"
                      : datos.data.comments
                  }</td>
                  <td><button class='btn btn-danger' value='${
                    datos.data._id
                  }' onclick='drop(this.value)'>Eliminar</button></td>
                  `;

          document.getElementById("table-body").appendChild(row);
        })
        .catch((error) => reject(error));
    });
  }
};

const drop = (id) => {
  const URI = `https://api-dishes.vercel.app/${id}`;
  fetch(URI, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.state) {
        loadTable()
        alert("Plato eliminado");
      } else {
        alert("Error al eliminar el plato");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Ocurrió un error al eliminar el plato");
    });
};
