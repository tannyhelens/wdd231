const serviceSelect = document.querySelector("#service-select");
const quoteForm = document.querySelector("#quote-form");
const submittedAt = document.querySelector("#submitted-at");

const firstNameInput = document.querySelector("#first-name");
const lastNameInput = document.querySelector("#last-name");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");

async function loadServices() {
  try {
    const response = await fetch("data/services.json");

    if (!response.ok) {
      throw new Error("Unable to load the services.");
    }

    const services = await response.json();

    services.forEach((service) => {
      const option = document.createElement("option");

      option.value = service.name;
      option.textContent = `${service.name} — ${service.price}`;

      serviceSelect.appendChild(option);
    });
  } catch (error) {
    console.error(error);

    const option = document.createElement("option");
    option.value = "";
    option.textContent = "Services are temporarily unavailable";
    serviceSelect.appendChild(option);
  }
}

function saveCustomerInformation() {
  const customerInformation = {
    firstName: firstNameInput.value,
    lastName: lastNameInput.value,
    email: emailInput.value,
    phone: phoneInput.value
  };

  localStorage.setItem(
    "brightHomeCustomer",
    JSON.stringify(customerInformation)
  );
}

function loadCustomerInformation() {
  const savedCustomer = localStorage.getItem("brightHomeCustomer");

  if (!savedCustomer) {
    return;
  }

  const customerInformation = JSON.parse(savedCustomer);

  firstNameInput.value = customerInformation.firstName || "";
  lastNameInput.value = customerInformation.lastName || "";
  emailInput.value = customerInformation.email || "";
  phoneInput.value = customerInformation.phone || "";
}

quoteForm.addEventListener("submit", () => {
  submittedAt.value = new Date().toISOString();
  saveCustomerInformation();
});

loadCustomerInformation();
loadServices();