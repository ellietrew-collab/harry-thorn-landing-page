document.addEventListener("DOMContentLoaded", function () {
  // FAQ Accordion functionality
  const faqQuestions = document.querySelectorAll(".faq-question");

  faqQuestions.forEach((question) => {
    question.addEventListener("click", function () {
      const faqItem = this.parentElement;
      const isActive = faqItem.classList.contains("active");

      // Close all FAQs
      document.querySelectorAll(".faq-item").forEach((item) => {
        item.classList.remove("active");
      });

      // Open clicked FAQ if it wasn't active
      if (!isActive) {
        faqItem.classList.add("active");
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
