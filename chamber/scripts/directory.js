const membersContainer = document.querySelector("#members");
const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");

async function getMembers() {
  try {
    const response = await fetch("data/members.json");

    if (!response.ok) {
      throw new Error("Could not load member data.");
    }

    const members = await response.json();
    displayMembers(members);
  } catch (error) {
    console.error("Error loading members:", error);

    membersContainer.innerHTML = `
      <p class="error-message">
        Sorry, the member directory could not be loaded.
      </p>
    `;
  }
}

function getMembershipName(level) {
  if (level === 3) {
    return "Gold Member";
  }

  if (level === 2) {
    return "Silver Member";
  }

  return "Member";
}

function displayMembers(members) {
  membersContainer.innerHTML = "";

  members.forEach((member) => {
    const card = document.createElement("article");
    card.classList.add("member-card");

    const image = document.createElement("img");
    image.src = `images/${member.image}`;
    image.alt = member.name;
    image.loading = "lazy";
    image.width = 400;
    image.height = 250;

    const name = document.createElement("h2");
    name.textContent = member.name;

    const address = document.createElement("p");
    address.textContent = member.address;

    const phone = document.createElement("p");
    phone.textContent = member.phone;

    const description = document.createElement("p");
    description.textContent = member.description;

    const membership = document.createElement("p");
    membership.classList.add("membership-level");
    membership.textContent = `Membership: ${getMembershipName(
      member.membership
    )}`;

    const website = document.createElement("a");
    website.href = member.website;
    website.textContent = "Visit Website";
    website.target = "_blank";
    website.rel = "noopener noreferrer";

    card.append(
      image,
      name,
      address,
      phone,
      description,
      membership,
      website
    );

    membersContainer.appendChild(card);
  });
}

gridButton.addEventListener("click", () => {
  membersContainer.classList.add("grid");
  membersContainer.classList.remove("list");

  gridButton.classList.add("active");
  listButton.classList.remove("active");
});

listButton.addEventListener("click", () => {
  membersContainer.classList.add("list");
  membersContainer.classList.remove("grid");

  listButton.classList.add("active");
  gridButton.classList.remove("active");
});

getMembers();