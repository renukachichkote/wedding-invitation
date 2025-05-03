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
  if (document.getElementById("map")) {
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
  }

  // Form submission handling for wishes - FIXED VERSION
  const wishesForm = document.querySelector("#wishes form"); // More specific selector
  if (wishesForm) {
    wishesForm.addEventListener("submit", function (event) {
      event.preventDefault();

      // Get form values
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const relation = document.getElementById("relation").value;
      const message = document.getElementById("message").value;

      // Simple validation
      if (
        name.trim() === "" ||
        message.trim() === "" ||
        email.trim() === "" ||
        relation === ""
      ) {
        alert("Please fill in all required fields");
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
    <div class="heart-icon">❤️</div>
    <h3>Thank You, ${name}!</h3>
    <p>Your wishes have been received. We appreciate your kind words and blessings for our special day.</p>
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

// Animation observer for section titles
document.addEventListener("DOMContentLoaded", function () {
  // Get all section titles
  const sectionTitles = document.querySelectorAll(".section-title");

  // Get profile images for scroll-based animation
  const profileImages = document.querySelectorAll(".profile-image");

  // Create intersection observer for section titles
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // Add visible class when element is in view
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          // Stop observing once animation is triggered
          observer.unobserve(entry.target);
        }
      });
    },
    {
      // Start animation when element is 20% visible
      threshold: 0.2,
    }
  );

  // Create intersection observer for profile images
  const profileObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          // Stop observing once animation is triggered
          profileObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.3,
    }
  );

  // Observe each section title
  sectionTitles.forEach((title) => {
    observer.observe(title);
  });

  // Observe each profile image
  profileImages.forEach((image) => {
    profileObserver.observe(image);
  });

  // Add staggered animation delay to section titles
  sectionTitles.forEach((title, index) => {
    title.style.animationDelay = `${0.3 + index * 0.1}s`;
  });

  // Add subtle entrance animation for event cards
  const eventCards = document.querySelectorAll(".event-card");
  eventCards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    card.style.transitionDelay = `${0.4 + index * 0.15}s`;
  });

  const cardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          cardObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  eventCards.forEach((card) => {
    cardObserver.observe(card);
  });

  // Add hover effect for gallery items
  const galleryItems = document.querySelectorAll(".gallery-item");
  galleryItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.querySelector("img").style.transform = "scale(1.05)";
    });

    item.addEventListener("mouseleave", function () {
      this.querySelector("img").style.transform = "scale(1)";
    });
  });

  // Add subtle animation to hero text elements
  const heroTitle = document.querySelector(".hero-title");
  const heroSubtitle = document.querySelector(".hero-content p");

  if (heroTitle && heroSubtitle) {
    heroSubtitle.style.opacity = "0";
    heroSubtitle.style.transform = "translateY(20px)";
    heroSubtitle.style.transition = "opacity 0.8s ease, transform 0.8s ease";
    heroSubtitle.style.transitionDelay = "0.8s";

    // Trigger animation after a short delay
    setTimeout(() => {
      heroSubtitle.style.opacity = "1";
      heroSubtitle.style.transform = "translateY(0)";
    }, 100);
  }
});
