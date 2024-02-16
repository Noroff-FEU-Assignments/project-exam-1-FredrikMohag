document.addEventListener("DOMContentLoaded", function () {
  if (!localStorage.getItem("newsletterShown")) {
    document.getElementById("overlay").style.display = "block";
    document.getElementById("newsletter").style.display = "block";
  }

  document.getElementById("overlay").addEventListener("click", function () {
    document.getElementById("newsletter").style.display = "none";
    this.style.display = "none";
  });

  document
    .querySelector(".newsletter-container form")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      var email = document.getElementById("email").value;
      if (validateEmail(email)) {
        localStorage.setItem("newsletterShown", "true");
        document.getElementById("newsletter").style.display = "none";
        document.getElementById("overlay").style.display = "none";
        alert("Thank you for subscribing!");
      } else {
        var errorMessage =
          document.getElementById("emailError") || createErrorMessage();
        errorMessage.textContent = "Must be a valid email address.";
        errorMessage.style.display = "block";
      }
    });

  // Add event listener to the closing tag
  document.querySelector(".closing-tag").addEventListener("click", function () {
    document.getElementById("newsletter").style.display = "none";
    document.getElementById("overlay").style.display = "none";
  });
});

function validateEmail(email) {
  var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

function createErrorMessage() {
  var errorMessage = document.createElement("div");
  errorMessage.setAttribute("id", "emailError");
  errorMessage.style.color = "red";

  var form = document.querySelector(".newsletter-container form");
  form.insertBefore(errorMessage, form.querySelector("button"));
  return errorMessage;
}
