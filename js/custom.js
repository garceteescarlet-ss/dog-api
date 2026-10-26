// shows form 🥸
const form = document.querySelector("#form");
//  API key for dog API 🐉
const apiKey =
    "live_3YAtylFWnDHWMZEMWtwbvlYIqu7YzxGLSoUYXkmdLN0sMksn4izlGdqnOqXEmYs2"; 

// placeholder
const placeholderImage = "https://placehold.co/300x200?text=No+Image";

//card for each dog on the page
const displayDogs = (dogs) => {
  const container = document.querySelector("#breeds");
  container.innerHTML = "";

  // this will show a msn if there's no breed that matches the search 
  if (dogs.length === 0) {
    container.innerHTML = "<p class='message'>No breeds found.</p>";
    return;
  }

  // Use placeholder if API data is not available
  dogs.forEach((dog) => {
    // 🐉 
      let imageUrl = placeholderImage;
      dog.image && dog.image.url ? dog.image.url : placeholderImage;
    const lifeSpan = dog.life_span || "Life span unknown";
    const temperament = dog.temperament || "Temperament unknown";

    // find data with dot notation
    container.innerHTML += `
      <div class="dog-card">
        <img src="${imageUrl}" alt="${dog.name}" />
        <h2>${dog.name}</h2>
        <p><strong>Life Span:</strong> ${lifeSpan}</p>
        <p><strong>Temperament:</strong> ${temperament}</p>
      </div>
    `;
  });
};

//  this gets all breeds from the API and filters
function getDogs(dataObject) {
  const url = "https://api.thedogapi.com/v1/breeds";
  const breedName = dataObject.breed.trim().toLowerCase();
  const temperament = dataObject.temperament.toLowerCase();

  fetch(url, {
    headers: { "x-api-key": apiKey },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      // this keeps only dogs that match the name,the temperament,toLowerCase. 
      const matchingDogs = data.filter((dog) => {
        const nameMatches =
          breedName === "" || dog.name.toLowerCase().includes(breedName);
        const temperamentMatches =
          temperament === "" ||
          (dog.temperament &&
            dog.temperament.toLowerCase().includes(temperament));
        return nameMatches && temperamentMatches;
      });

      // call displayDogs function
      displayDogs(matchingDogs);
    })
    .catch((error) => console.error("Error:", error));
}

function onFormSubmit(event) {
  event.preventDefault();
  const data = new FormData(event.target);
  const dataObject = Object.fromEntries(data.entries());
  console.log(dataObject);
  // form.reset();
  getDogs(dataObject);
}
form.addEventListener("submit", onFormSubmit);