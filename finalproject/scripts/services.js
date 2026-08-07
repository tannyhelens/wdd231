const servicesContainer = document.querySelector("#services-container");
const serviceCount = document.querySelector("#service-count");
const searchInput = document.querySelector("#service-search");
const categoryFilter = document.querySelector("#category-filter");
const favoritesButton = document.querySelector("#show-favorites");

const dialog = document.querySelector("#service-dialog");
const dialogContent = document.querySelector("#dialog-content");
const closeDialogButton = document.querySelector("#close-dialog");

let services = [];
let showingFavorites = false;

async function getServices() {
  try {
    const response = await fetch("data/services.json");

    if (!response.ok) {
      throw new Error("Unable to load the services.");
    }

    services = await response.json();
    displayServices(services);
  } catch (error) {
    servicesContainer.innerHTML = `
      <p class="error-message">
        Sorry, the services could not be loaded. Please try again later.
      </p>
    `;

    console.error(error);
  }
}

function displayServices(serviceList) {
  servicesContainer.innerHTML = "";

  serviceCount.textContent =
    `${serviceList.length} service${serviceList.length === 1 ? "" : "s"} found`;

  if (serviceList.length === 0) {
    servicesContainer.innerHTML = `
      <p class="no-results">
        No services match your search.
      </p>
    `;
    return;
  }

  serviceList.forEach((service) => {
    const card = document.createElement("article");
    card.classList.add("service-card");

    card.innerHTML = `
      <img
        src="${service.image}"
        alt="${service.name}"
        width="400"
        height="260"
        loading="lazy"
      >

      <div class="service-card-content">
        <p class="service-category">${service.category}</p>
        <h3>${service.name}</h3>
        <p>${service.description}</p>

        <div class="service-summary">
          <span>${service.price}</span>
          <span>${service.duration}</span>
        </div>

        <button
          class="button primary-button details-button"
          type="button"
          data-id="${service.id}"
        >
          View Details
        </button>
      </div>
    `;

    servicesContainer.appendChild(card);
  });

  document.querySelectorAll(".details-button").forEach((button) => {
    button.addEventListener("click", () => {
      const serviceId = Number(button.dataset.id);
      const selectedService = services.find(
        (service) => service.id === serviceId
      );

      if (selectedService) {
        openServiceDialog(selectedService);
      }
    });
  });
}

function applyFilters() {
  const searchTerm = searchInput.value.toLowerCase().trim();
  const selectedCategory = categoryFilter.value;
  const favorites = getFavorites();

  let filteredServices = services.filter((service) => {
    const matchesSearch = service.name
      .toLowerCase()
      .includes(searchTerm);

    const matchesCategory =
      selectedCategory === "All" ||
      service.category === selectedCategory;

    const matchesFavorites =
      !showingFavorites || favorites.includes(service.id);

    return matchesSearch && matchesCategory && matchesFavorites;
  });

  displayServices(filteredServices);
}

function openServiceDialog(service) {
  const favorites = getFavorites();
  const isFavorite = favorites.includes(service.id);

  dialogContent.innerHTML = `
    <img
      src="${service.image}"
      alt="${service.name}"
      width="500"
      height="325"
    >

    <p class="service-category">${service.category}</p>
    <h2>${service.name}</h2>
    <p>${service.description}</p>

    <div class="dialog-details">
      <p><strong>Price:</strong> ${service.price}</p>
      <p><strong>Duration:</strong> ${service.duration}</p>
    </div>

    <button
      id="favorite-service"
      class="button primary-button"
      type="button"
    >
      ${isFavorite ? "Remove from Favorites" : "Add to Favorites"}
    </button>
  `;

  dialog.showModal();

  const favoriteButton = document.querySelector("#favorite-service");

  favoriteButton.addEventListener("click", () => {
    toggleFavorite(service.id);
    openServiceDialog(service);
    applyFilters();
  });
}

function getFavorites() {
  const storedFavorites = localStorage.getItem("favoriteServices");

  return storedFavorites ? JSON.parse(storedFavorites) : [];
}

function toggleFavorite(serviceId) {
  let favorites = getFavorites();

  if (favorites.includes(serviceId)) {
    favorites = favorites.filter((id) => id !== serviceId);
  } else {
    favorites.push(serviceId);
  }

  localStorage.setItem(
    "favoriteServices",
    JSON.stringify(favorites)
  );
}

searchInput.addEventListener("input", applyFilters);
categoryFilter.addEventListener("change", applyFilters);

favoritesButton.addEventListener("click", () => {
  showingFavorites = !showingFavorites;

  favoritesButton.textContent = showingFavorites
    ? "Show All Services"
    : "Show Favorites";

  applyFilters();
});

closeDialogButton.addEventListener("click", () => {
  dialog.close();
});

dialog.addEventListener("click", (event) => {
  if (event.target === dialog) {
    dialog.close();
  }
});

getServices();