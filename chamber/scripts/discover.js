import places from "../data/places.mjs";

const cardsContainer = document.querySelector("#discover-cards");
const visitMessage = document.querySelector("#visit-message");

function displayPlaces() {
  places.forEach((place, index) => {
    const card = document.createElement("article");
    card.classList.add("discover-card", `card-${index + 1}`);

    const title = document.createElement("h2");
    title.textContent = place.name;

    const figure = document.createElement("figure");

    const image = document.createElement("img");
    image.src = `images/${place.image}`;
    image.alt = place.name;
    image.width = 300;
    image.height = 200;
    image.loading = "lazy";
    image.decoding = "async";
    
    const address = document.createElement("address");
    address.textContent = place.address;

    const description = document.createElement("p");
    description.textContent = place.description;

    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "Learn More";

    figure.appendChild(image);

    card.appendChild(title);
    card.appendChild(figure);
    card.appendChild(address);
    card.appendChild(description);
    card.appendChild(button);

    cardsContainer.appendChild(card);
  });
}

function displayVisitMessage() {
  const currentVisit = Date.now();
  const previousVisit = Number(localStorage.getItem("lastVisit"));

  if (!previousVisit) {
    visitMessage.textContent =
      "Welcome! Let us know if you have any questions.";
  } else {
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const daysBetweenVisits = Math.floor(
      (currentVisit - previousVisit) / millisecondsPerDay
    );

    if (daysBetweenVisits < 1) {
      visitMessage.textContent = "Back so soon! Awesome!";
    } else if (daysBetweenVisits === 1) {
      visitMessage.textContent = "You last visited 1 day ago.";
    } else {
      visitMessage.textContent =
        `You last visited ${daysBetweenVisits} days ago.`;
    }
  }

  localStorage.setItem("lastVisit", currentVisit);
}

displayPlaces();
displayVisitMessage();