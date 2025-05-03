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

  // Form submission handling for wishes
  const wishesForm = document.getElementById("wishesForm");
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

  // Add staggered animation delay to section titles
  const sectionTitles = document.querySelectorAll(".section-title");
  sectionTitles.forEach((title, index) => {
    title.style.animationDelay = `${0.3 + index * 0.1}s`;
    // Make section titles visible immediately
    title.classList.add("visible");
  });

  // FIX: Make profile images visible immediately
  const profileImages = document.querySelectorAll(".profile-image");
  profileImages.forEach((image) => {
    image.classList.add("visible");
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

  // Smooth scroll for the scroll down indicator and all navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70, // Adjust for header height
          behavior: "smooth",
        });

        // Close mobile menu if open
        if (menu.classList.contains("active")) {
          menu.classList.remove("active");
        }
      }
    });
  });

  // Add additional notification styles
  const style = document.createElement("style");
  style.textContent = `
    .music-notification {
      position: fixed;
      bottom: 20px;
      left: 20px;
      background-color: rgba(230, 197, 112, 0.95);
      padding: 15px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
      z-index: 1000;
      cursor: pointer;
      animation: slideUp 0.5s ease;
    }
    
    .notification-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #5d4b4b;
    }
    
    .notification-content p {
      margin: 0;
      margin-right: 15px;
      font-weight: bold;
    }
    
    .notification-close {
      background: none;
      border: none;
      color: #5d4b4b;
      cursor: pointer;
      font-size: 16px;
      padding: 0 5px;
    }
    
    @keyframes slideUp {
      from {
        transform: translateY(100px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
  `;

  document.head.appendChild(style);
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
