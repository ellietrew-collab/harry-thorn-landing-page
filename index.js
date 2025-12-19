document.addEventListener("DOMContentLoaded", function () {
  console.log("JavaScript loaded"); // Debug log

  // FAQ Accordion functionality
  const faqItems = document.querySelectorAll(".faq-item");
  console.log("Found FAQ items:", faqItems.length); // Debug log

  faqItems.forEach((item, index) => {
    const question = item.querySelector(".faq-question");

    // Remove any existing event listeners by cloning
    const newQuestion = question.cloneNode(true);
    question.parentNode.replaceChild(newQuestion, question);

    // Add click event
    newQuestion.addEventListener("click", function (e) {
      console.log("FAQ clicked:", index); // Debug log

      const isActive = item.classList.contains("active");

      // Close all FAQs
      faqItems.forEach((faq) => faq.classList.remove("active"));

      // Open clicked FAQ if it wasn't active
      if (!isActive) {
        item.classList.add("active");
        console.log("FAQ opened:", index); // Debug log
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
