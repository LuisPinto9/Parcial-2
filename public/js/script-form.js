const obtainData = () => {
  const idDish = document.getElementById("input-id").value;
  const dishName = document.getElementById("input-name").value;
  const dishCalories = parseInt(
    document.getElementById("input-calories").value
  );
  const isVegetarian =
    document.getElementById("select-vegetarian").value == "true";
  const dishValue = parseInt(document.getElementById("input-value").value);
  const dishComments = document.getElementById("input-comments").value;

  if (!idDish || !dishName || isNaN(dishCalories) || isNaN(dishValue)) {
    alert(
      "Todos los campos son obligatorios y las calorías y valor deben ser números."
    );
  } else {
    const data = {
      idDish: idDish,
      name: dishName,
      calories: dishCalories,
      isVegetarian: isVegetarian,
      value: dishValue,
      comments: dishComments,
    };

    return JSON.stringify(data);
  }
};

const add = () => {
  const URI = "https://api-dishes.vercel.app";
  fetch(URI, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: obtainData(),
  })
    .then((result) => result.json())
    .then((result) => {
      if (result.state) {
        alert("Plato agregado correctamente");
      } else if (result.state == 208) {
        alert("El ID del plato ya existe");
      } else {
        alert("Hubo un error al agregar el plato");
      }
    })
    .catch((err) => console.log(err));
};
