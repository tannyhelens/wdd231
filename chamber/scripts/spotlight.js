const spotlightContainer = document.querySelector("#spotlight-container");

async function getSpotlights() {
  try {
    const response = await fetch("data/members.json");

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const members = await response.json();

    const qualifiedMembers = members.filter(
      (member) => member.membership === 2 || member.membership === 3
    );

    const shuffledMembers = qualifiedMembers.sort(
      () => Math.random() - 0.5
    );

    const selectedMembers = shuffledMembers.slice(0, 3);

    displaySpotlights(selectedMembers);
  } catch (error) {
    console.error("Error loading spotlights:", error);

    spotlightContainer.innerHTML =
      "<p>Unable to load featured businesses.</p>";
  }
}

function displaySpotlights(members) {
  spotlightContainer.innerHTML = "";

  members.forEach((member) => {
    const card = document.createElement("article");
    card.classList.add("spotlight-card");

    const membershipName =
      member.membership === 3 ? "Gold Member" : "Silver Member";

    card.innerHTML = `
      <h3>${member.name}</h3>

      <img
        src="images/${member.image}"
        alt="${member.name}"
        loading="lazy"
        width="150"
        height="100"
      >

      <p>${member.description}</p>
      <p><strong>Address:</strong> ${member.address}</p>
      <p><strong>Phone:</strong> ${member.phone}</p>

      <a href="${member.website}" target="_blank" rel="noopener">
        Visit Website
      </a>

      <p class="membership-level">${membershipName}</p>
    `;

    spotlightContainer.appendChild(card);
  });
}

getSpotlights();