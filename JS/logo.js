document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded and parsed."); // Log when the DOM content is fully loaded

  var logoImage = document.getElementById("logoImage");
  var footerImage = document.getElementById("footerImage");

  if (logoImage) {
    console.log("Logo image found."); // Log if the logo image is successfully targeted
    logoImage.addEventListener("click", function () {
      console.log("Logo image clicked. Redirecting to index.html"); // Log on logo image click
      window.location.href = "index.html";
    });
  } else {
    console.log("Logo image not found."); // Log if the logo image is not found
  }

  if (footerImage) {
    console.log("Footer image found."); // Log if the footer image is successfully targeted
    footerImage.addEventListener("click", function () {
      console.log("Footer image clicked. Redirecting to index.html"); // Log on footer image click
      window.location.href = "index.html";
    });
  } else {
    console.log("Footer image not found."); // Log if the footer image is not found
  }
});
