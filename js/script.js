window.onload = () => {
  fetchData();
};

const options = {
  method: "GET",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzZjZjE3NGQ0YmUzZDAwMTU4NDVmZDgiLCJpYXQiOjE2NjgwODQwODUsImV4cCI6MTY2OTI5MzY4NX0.MapzsHsuOI4oDxyaxmbyKlcQABzHZEmYIe6EqNu6KJ8",
  },
};

const dataArray = [];

const fetchData = async () => {
  const response = await fetch(
    "https://striveschool-api.herokuapp.com/api/movies",
    options
  );
  const dataCategories = await response.json();
  for (let dataCategory of dataCategories) {
    const container = document.querySelector(".movies-container");
    const newRow = document.createElement("div");
    newRow.classList.add("row");
    newRow.classList.add("m-2");
    newRow.innerHTML += `
      <h5 class="text-light mt-2 mb-2">${dataCategory}</h5>
  
      `;
    container.appendChild(newRow);
    const response = await fetch(
      "https://striveschool-api.herokuapp.com/api/movies/" + dataCategory,
      options
    );
    const data = await response.json();
    console.log(data);
    // data.forEach(createCards(data, newRow));
    data.forEach((movie) => {
      createCards(movie, newRow);
    });
  }
};

const createCards = (movie, newRow) => {
  newRow.innerHTML += `
  <div class="col-sm-6 col-md-4 col-xl-3 mt-2">
  <div class="card bg-dark text-white">
  <a href="details.html"><img src=${movie.imageUrl} class="card-img" alt="..."></a>
</div>
</div>
 `;
};
