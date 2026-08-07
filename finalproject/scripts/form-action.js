const submittedInformation = document.querySelector(
  "#submitted-information"
);

const formData = new URLSearchParams(window.location.search);

const firstName = formData.get("firstName") || "Not provided";
const lastName = formData.get("lastName") || "Not provided";
const email = formData.get("email") || "Not provided";
const phone = formData.get("phone") || "Not provided";
const service = formData.get("service") || "Not provided";
const cleaningDate = formData.get("cleaningDate") || "Not provided";
const homeSize = formData.get("homeSize") || "Not provided";
const contactMethod =
  formData.get("contactMethod") || "Not provided";
const notes = formData.get("notes") || "No additional notes";
const submittedAt = formData.get("submittedAt");

let formattedSubmittedDate = "Not provided";

if (submittedAt) {
  formattedSubmittedDate = new Date(submittedAt).toLocaleString();
}

submittedInformation.innerHTML = `
  <dl class="submission-details">
    <div>
      <dt>Name</dt>
      <dd>${firstName} ${lastName}</dd>
    </div>

    <div>
      <dt>Email</dt>
      <dd>${email}</dd>
    </div>

    <div>
      <dt>Phone</dt>
      <dd>${phone}</dd>
    </div>

    <div>
      <dt>Selected Service</dt>
      <dd>${service}</dd>
    </div>

    <div>
      <dt>Preferred Cleaning Date</dt>
      <dd>${cleaningDate}</dd>
    </div>

    <div>
      <dt>Home Size</dt>
      <dd>${homeSize}</dd>
    </div>

    <div>
      <dt>Preferred Contact Method</dt>
      <dd>${contactMethod}</dd>
    </div>

    <div>
      <dt>Additional Notes</dt>
      <dd>${notes}</dd>
    </div>

    <div>
      <dt>Submitted</dt>
      <dd>${formattedSubmittedDate}</dd>
    </div>
  </dl>
`;