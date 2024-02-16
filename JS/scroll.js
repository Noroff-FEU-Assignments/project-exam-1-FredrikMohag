function setupScrollToTop() {
  const scrollToTopContainer = document.getElementById("scrollToTopContainer");
  const footerHeight = 300; // Adjust based on your footer's actual height

  window.addEventListener("scroll", () => {
    const scrollPosition =
      document.documentElement.scrollTop || document.body.scrollTop;
    const windowHeight = window.innerHeight;
    const totalHeight = document.documentElement.scrollHeight;
    const distanceFromBottom = totalHeight - (scrollPosition + windowHeight);

    if (scrollPosition > 100 && distanceFromBottom > footerHeight) {
      scrollToTopContainer.style.display = "block";
      console.log("Scroll to Top button shown"); // Log when the button is shown
    } else {
      scrollToTopContainer.style.display = "none";
      console.log("Scroll to Top button hidden"); // Log when the button is hidden
    }
  });

  scrollToTopContainer.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    console.log("Initiated scroll to top"); // Log when scroll to top is initiated
  });
}

document.addEventListener("DOMContentLoaded", function () {
  console.log("Document is ready.");
  setupScrollToTop();
});
