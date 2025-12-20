document.addEventListener("DOMContentLoaded", function () {
  // FAQ Accordion functionality
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", function () {
      const isActive = item.classList.contains("active");

      // Close all FAQs
      faqItems.forEach((faq) => faq.classList.remove("active"));

      // Open clicked FAQ if it wasn't active
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
          alert("Thanks! Harry will be in touch 😊");
          emailForm.reset();
        })
        .catch((error) => {
          alert("Oops! Something went wrong. Please try again.");
          console.error("Error:", error);
        });
    });
  }
});
