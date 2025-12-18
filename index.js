// FAQ Accordion functionality
document.addEventListener("DOMContentLoaded", function () {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(function (item) {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", function () {
      // Close other open items
      faqItems.forEach(function (otherItem) {
        if (otherItem !== item && otherItem.classList.contains("active")) {
          otherItem.classList.remove("active");
        }
      });

      // Toggle current item
      item.classList.toggle("active");
    });
  });
});

// Email handling

// FAQ Accordion functionality
document.addEventListener("DOMContentLoaded", function () {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // Close all FAQ items
      faqItems.forEach((faq) => faq.classList.remove("active"));

      // Open clicked item if it wasn't active
      if (!isActive) {
        item.classList.add("active");
      }
    });
  });

  // Email form submission handler
  const emailForm = document.querySelector('form[name="sales-ladder-email"]');

  if (emailForm) {
    emailForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(emailForm);

      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString(),
      })
        .then(() => {
          // Show success message
          alert("Thanks! Harry will be in touch 😊");
          // Reset the form
          emailForm.reset();
        })
        .catch((error) => {
          alert("Oops! Something went wrong. Please try again.");
          console.error("Error:", error);
        });
    });
  }
});
