window.onload = () => {
  fetchData();
};

let method = "POST";
let endpoint = "https://striveschool-api.herokuapp.com/api/movies";

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
    data.forEach((movie, index) => {
      createMoviesList(movie, newRow, index);
    });
  }
};

const createMoviesList = (movie, newRow, index) => {
  newRow.innerHTML += `
<ul>
<li class="movies-li">${index + 1}. ${movie.name}
<div>
<a href=#top><button class="btn btn-secondary edit-button" onclick=handleEdit('${String(
    movie._id
  )}')>Edit</button></a>
<button class="btn btn-danger delete-button" onclick="handleDelete('${String(
    movie._id
  )}')">Delete</button>
</div>

</li>

</ul>
`;
};

// const endpoint =
//   value === ""
//     ? "https://striveschool-api.herokuapp.com/api/movies"
//     : "https://striveschool-api.herokuapp.com/api/movies" + value;
// const method = value === "" ? "POST" : "PUT";

const handleSubmit = async () => {
  const newProductObject = {
    name: document.getElementById("movie-name").value,
    description: document.getElementById("movie-description").value,
    category: document.getElementById("movie-category").value,
    imageUrl: document.getElementById("movie-image").value,
  };
  console.log(newProductObject);
  const response = await fetch(endpoint, {
    method: method,
    body: JSON.stringify(newProductObject),
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzZjZjE3NGQ0YmUzZDAwMTU4NDVmZDgiLCJpYXQiOjE2NjgwODQwODUsImV4cCI6MTY2OTI5MzY4NX0.MapzsHsuOI4oDxyaxmbyKlcQABzHZEmYIe6EqNu6KJ8",
    },
  });
  if (!response.ok)
    throw new Error("generic error, something wrong with the fetch");

  const movie = await response.json();

  alert("Product created successfully, id is:  " + movie._id); //change this
  window.location.assign("/backoffice.html");

  //   const inputs = document.getElementsByTagName("input");
  //   document.getElementById("movie-description").value = "";
  //   for (let input of inputs) {
  //     input.value = "";
  //   }
};

const addButton = document.querySelector(".add-button");
addButton.addEventListener("click", handleSubmit);

const handleDelete = async (movie) => {
  console.log("The delete button has been clicked");
  const hasAccepted = confirm("do you really want to delete this?");
  if (hasAccepted) {
    const response = await fetch(
      "https://striveschool-api.herokuapp.com/api/movies/" + movie,

      {
        method: "DELETE",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzZjZjE3NGQ0YmUzZDAwMTU4NDVmZDgiLCJpYXQiOjE2NjgwODQwODUsImV4cCI6MTY2OTI5MzY4NX0.MapzsHsuOI4oDxyaxmbyKlcQABzHZEmYIe6EqNu6KJ8",
        },
      }
    );

    const deletedObj = await response.json();
    alert("Movie DELETED, id was: " + deletedObj._id);
    window.location.assign("/backoffice.html");
  }
};

const handleEdit = async (movie) => {
  console.log("The edit button is clicked");
  const response = await fetch(
    "https://striveschool-api.herokuapp.com/api/movies/" + movie,

    {
      method: "PUT",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzZjZjE3NGQ0YmUzZDAwMTU4NDVmZDgiLCJpYXQiOjE2NjgwODQwODUsImV4cCI6MTY2OTI5MzY4NX0.MapzsHsuOI4oDxyaxmbyKlcQABzHZEmYIe6EqNu6KJ8",
      },
    }
  );
  const eventObj = await response.json();

  const { name, description, category, imageUrl, _id } = eventObj;

  document.getElementById("movie-name").value = name;
  document.getElementById("movie-description").value = description;
  document.getElementById("movie-category").value = category;
  document.getElementById("movie-image").value = imageUrl;
  document.getElementById("movie-id").value = _id;

  const actionButton = document.querySelector(".add-button");
  actionButton.style.backgroundColor = "green";
  actionButton.innerText = "Edit Movie";
  const inputId = document.getElementById("movie-id");
  const value = inputId.value;
  console.log(value);
  if (value !== "") {
    method = "PUT";
    endpoint = "https://striveschool-api.herokuapp.com/api/movies/" + value;
  }
};
