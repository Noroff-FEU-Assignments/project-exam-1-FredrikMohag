document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form from submitting
    console.log("Form submission prevented."); // Log when form submission is prevented

    // Cache form field and error elements
    const nameField = document.getElementById("name");
    const emailField = document.getElementById("email");
    const subjectField = document.getElementById("subject");
    const messageField = document.getElementById("message");

    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const subjectError = document.getElementById("subjectError");
    const messageError = document.getElementById("messageError");

    // Clear previous errors
    nameError.textContent = "";
    emailError.textContent = "";
    subjectError.textContent = "";
    messageError.textContent = "";

    let hasError = false;

    // Validate Name
    const name = nameField.value;
    if (name.length <= 5) {
      nameError.textContent = "Name must be more than 5 characters long.";
      hasError = true;
      console.log("Name validation failed."); // Log name validation failure
    }

    // Validate Email
    const email = emailField.value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      emailError.textContent = "Must be a valid email address.";
      hasError = true;
      console.log("Email validation failed."); // Log email validation failure
    }

    // Validate Subject
    const subject = subjectField.value;
    if (subject.length <= 15) {
      subjectError.textContent =
        "Subject must be more than 15 characters long.";
      hasError = true;
      console.log("Subject validation failed."); // Log subject validation failure
    }

    // Validate Message Content
    const message = messageField.value;
    if (message.length <= 25) {
      messageError.textContent =
        "Message content must be more than 25 characters long.";
      hasError = true;
      console.log("Message validation failed."); // Log message validation failure
    }

    if (!hasError) {
      // Log form validation success and indicate readiness for form submission
      console.log("Form is valid. Ready for form submission.");
      alert("Form is valid. Implement form submission here.");
    } else {
      // Log that there were validation errors found
      console.log("Form validation failed. Errors have been displayed.");
    }
  });
