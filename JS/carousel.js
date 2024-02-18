document.addEventListener("DOMContentLoaded", function () {
  let slideIndex = 0;
  let touchStartX = 0;
  let touchEndX = 0;
  const minSwipeDistance = 50; // Minimum distance required for a swipe

  fetchLatestPosts();

  function moveSlide(n) {
    showSlide((slideIndex += n));
  }

  function showSlide(n) {
    const slides = document.getElementsByClassName("slide");
    if (n >= slides.length) {
      slideIndex = 0;
    } else if (n < 0) {
      slideIndex = slides.length - 1;
    }

    Array.from(slides).forEach((slide) => {
      slide.style.display = "none";
    });

    slides[slideIndex].style.display = "block";
  }

  // Fetch the 4 latest blog posts
  function fetchLatestPosts() {
    const apiUrl =
      "https://www.haakansson.no/wp-json/wp/v2/posts?per_page=4&_embed";
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Network response was not ok, status: ${response.status}`
          );
        }
        return response.json();
      })
      .then((posts) => {
        const carouselSlides = document.querySelector(".carousel-slides");
        carouselSlides.innerHTML = ""; // Clear existing slides

        posts.forEach((post) => {
          const slideDiv = document.createElement("div");
          slideDiv.className = "slide";
          const postImage =
            post._embedded &&
            post._embedded["wp:featuredmedia"] &&
            post._embedded["wp:featuredmedia"][0].source_url
              ? post._embedded["wp:featuredmedia"][0].source_url
              : "default-image.jpg";

          const originalPostTitle = post.title.rendered;
          const adjustedPostTitle =
            originalPostTitle.split(" ").slice(0, 5).join(" ") +
            (originalPostTitle.split(" ").length > 5 ? "..." : "");

          slideDiv.innerHTML = `
            <a href="blog-specific.html?postId=${post.id}" class="slide-link">
              <img src="${postImage}" alt="${adjustedPostTitle}">
              <div class="title-overlay">${adjustedPostTitle}</div>
            </a>`;
          carouselSlides.appendChild(slideDiv);
        });

        showSlide(slideIndex); // Show the first slide
      })
      .catch((error) => console.error("Error fetching posts:", error));
  }

  // Attach event listeners to next/prev buttons
  document
    .querySelector(".prev")
    .addEventListener("click", () => moveSlide(-1));
  document.querySelector(".next").addEventListener("click", () => moveSlide(1));

  // Swipe functionality
  const carousel = document.querySelector(".carousel");
  carousel.addEventListener("touchstart", handleTouchStart, false);
  carousel.addEventListener("touchmove", handleTouchMove, false);
  carousel.addEventListener("touchend", handleTouchEnd, false);

  function handleTouchStart(event) {
    touchStartX = event.touches[0].clientX;
  }

  function handleTouchMove(event) {
    touchEndX = event.touches[0].clientX;
  }

  function handleTouchEnd() {
    const deltaX = touchStartX - touchEndX;
    if (Math.abs(deltaX) > minSwipeDistance) {
      if (deltaX > 0) {
        moveSlide(1); // swipe left
      } else {
        moveSlide(-1); // swipe right
      }
    }
    // Reset touch positions
    touchStartX = 0;
    touchEndX = 0;
  }
});
