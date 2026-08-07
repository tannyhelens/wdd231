const menuButton = document.querySelector("#menu");
const navigation = document.querySelector("#navigation");

const currentYear = document.querySelector("#current-year");
const lastModified = document.querySelector("#last-modified");

const featuredServices = document.querySelector("#featured-services");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    navigation.classList.toggle("open");

    const isOpen = navigation.classList.contains("open");

    menuButton.setAttribute("aria-expanded", isOpen);
    menuButton.textContent = isOpen ? "✕" : "☰";
  });
}

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

if (lastModified) {
  lastModified.textContent = `Last Modified: ${document.lastModified}`;
}

async function loadFeaturedServices() {
  if (!featuredServices) {
    return;
  }

  try {
    const response = await fetch("data/services.json");

    if (!response.ok) {
      throw new Error("Unable to load featured services.");
    }

    const services = await response.json();
    const featured = services.slice(0, 3);

    featuredServices.innerHTML = "";

    featured.forEach((service) => {
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

          <a
            class="button primary-button"
            href="services.html"
          >
            View Service
          </a>
        </div>
      `;

      featuredServices.appendChild(card);
    });
  } catch (error) {
    featuredServices.innerHTML = `
      <p class="error-message">
        Featured services could not be loaded.
      </p>
    `;

    console.error(error);
  }
}

loadFeaturedServices();