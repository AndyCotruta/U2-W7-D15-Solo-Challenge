const eventId = new URLSearchParams(window.location.search).get("eventId");
console.log("RESOURCE ID IS: " + eventId);

window.onload = async () => {
  await fetchData();
};

const options = {
  method: "GET",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzZjZjE3NGQ0YmUzZDAwMTU4NDVmZDgiLCJpYXQiOjE2NjgwODQwODUsImV4cCI6MTY2OTI5MzY4NX0.MapzsHsuOI4oDxyaxmbyKlcQABzHZEmYIe6EqNu6KJ8",
  },
};

const fetchData = async () => {
  const response = await fetch(
    "https://striveschool-api.herokuapp.com/api/movies",
    options
  );
  const dataCategories = await response.json();
  for (let dataCategory of dataCategories) {
    const response = await fetch(
      "https://striveschool-api.herokuapp.com/api/movies/" + dataCategory,
      options
    );
    const data = await response.json();
    console.log(data);
  }
};

const createProductCard = (movieObject) => {
  const rowContainer = document.querySelector(".row");
  rowContainer.innerHTML = `
         <div class="col-6">
                
           
    <div class="card mb-3">
  <div class="row no-gutters">
    <div class="col-md-4">
      <img src=${movieObject.imageUrl} alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">Name: ${movieObject.name}</h5>
          <p class="card-text">Brand: ${movieObject.brand}</p>
          <p class="card-text">Price: ${movieObject.price}</p>
        <p class="card-text">Description: ${movieObject.description}</p>
        <p class="card-text"><small class="text-muted">Id: ${movieObject._id}</small></p>
      </div>
    </div>
  </div>
   </div>
</div>`;
};
