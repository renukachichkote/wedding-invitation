const menuToggle = document.getElementById("menuToggle");
const menuClose = document.getElementById("menuClose");
const menu = document.getElementById("menu");

menuToggle.addEventListener("click", () => {
  menu.classList.add("active");
});

menuClose.addEventListener("click", () => {
  menu.classList.remove("active");
});

// Close menu when clicking on menu items
document.querySelectorAll(".menu-items a").forEach((item) => {
  item.addEventListener("click", () => {
    menu.classList.remove("active");
  });
});

// Map initialization
document.addEventListener("DOMContentLoaded", function () {
  // Create map centered at your venue (latitude, longitude)
  const map = L.map("map").setView([17.31325, 76.8163], 15);

  // Add OpenStreetMap tiles
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  // Add marker for venue
  const marker = L.marker([17.31325, 76.8163]).addTo(map);

  // Add popup with venue info
  marker
    .bindPopup(
      `
    <b>Khamitkar Bhavan, Mangal karyalaya</b><br>
    Shree Krishneshwar Temple Compound,<br>
    New Jewargi Rd,<br>
    Kalaburagi,Karnataka 585102
  `
    )
    .openPopup();
});

// Form submission handling for wishes
document.addEventListener("DOMContentLoaded", function () {
  // Find the form in the wishes section if it exists
  const wishesForm = document.querySelector("#wishes");
  if (wishesForm) {
    wishesForm.addEventListener("submit", function (event) {
      event.preventDefault();

      // Get form values
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;

      // Simple validation
      if (name.trim() === "" || message.trim() === "" || email.trim() === "") {
        alert("Please enter your name, email, and wishes");
        return;
      }

      // Show loading state briefly
      const submitButton = wishesForm.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.textContent;
      submitButton.textContent = "Sending...";
      submitButton.disabled = true;

      // Simulate sending (wait 1 second)
      setTimeout(function () {
        // Create and show the thank you popup
        showThankYouPopup(name);

        // Reset form
        wishesForm.reset();

        // Reset button
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
      }, 1000);
      submitButton.textContent = originalButtonText;
    });
  }
});

// Function to show thank you popup
function showThankYouPopup(name) {
  // Create popup elements
  const popup = document.createElement("div");
  popup.className = "thank-you-popup";

  const popupContent = document.createElement("div");
  popupContent.className = "popup-content";

  const closeBtn = document.createElement("span");
  closeBtn.className = "close-popup";
  closeBtn.innerHTML = "&times;";

  const message = document.createElement("div");
  message.className = "popup-message";
  message.innerHTML = `
    <h3>Thank You, ${name}!</h3>
    <p>Your wishes have been received. We appreciate your kind words and blessings for our special day.</p>
    <div class="heart-icon">❤️</div>
    <p>- Vijaylaxmi & Viresh</p>
  `;

  // Assemble popup
  popupContent.appendChild(closeBtn);
  popupContent.appendChild(message);
  popup.appendChild(popupContent);

  // Add to body
  document.body.appendChild(popup);

  // Add event listener to close button
  closeBtn.addEventListener("click", function () {
    document.body.removeChild(popup);
  });

  // Close popup when clicking outside
  popup.addEventListener("click", function (event) {
    if (event.target === popup) {
      document.body.removeChild(popup);
    }
  });

  // Auto-close after 8 seconds
  setTimeout(function () {
    if (document.body.contains(popup)) {
      document.body.removeChild(popup);
    }
  }, 8000);
}
