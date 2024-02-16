document.addEventListener("DOMContentLoaded", (event) => {
  console.log("Document loaded.");
  const apiUrl =
    "https://www.haakansson.no/wp-json/wp/v2/posts?per_page=12&_embed";

  console.log(`Fetching data from API: ${apiUrl}`);
  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Network response was not ok, status: ${response.status}`
        );
      }
      return response.json();
    })
    .then((data) => {
      console.log("Data fetched successfully.", data);
      const postsContainer = document.getElementById("posts-container");

      if (!postsContainer) {
        console.error(
          'Container element with ID "posts-container" was not found.'
        );
        return;
      }

      data.slice(4).forEach((post) => {
        const postElement = document.createElement("div");
        postElement.classList.add("post");
        console.log(`Processing post: ${post.title.rendered}`);

        if (
          post._embedded &&
          post._embedded["wp:featuredmedia"] &&
          post._embedded["wp:featuredmedia"][0].source_url
        ) {
          const imgElement = document.createElement("img");
          imgElement.src = post._embedded["wp:featuredmedia"][0].source_url;
          imgElement.alt = `Image for ${post.title.rendered.substring(0, 30)}`; // Shortened alt-text
          imgElement.style.height = "350px";
          imgElement.loading = "lazy";
          imgElement.style.cursor = "pointer";
          imgElement.addEventListener("click", () => {
            window.location.href = `blog-specific.html?postId=${post.id}`;
          });
          postElement.appendChild(imgElement);
        }

        const titleElement = document.createElement("h2");
        titleElement.textContent = post.title.rendered;
        postElement.appendChild(titleElement);

        const readMoreLink = document.createElement("a");
        readMoreLink.href = `blog-specific.html?postId=${post.id}`;
        const firstTwoWords = post.title.rendered
          .split(" ")
          .slice(0, 2)
          .join(" ");
        readMoreLink.textContent = `Read More: ${firstTwoWords}`; // Include the first two words from the post title
        readMoreLink.classList.add("read-more-link");
        postElement.appendChild(readMoreLink);

        postsContainer.appendChild(postElement);
      });
    })
    .catch((error) => {
      console.error("There was a problem with your fetch operation:", error);
    });

  // Carousel image load check
  const carouselImages = document.querySelectorAll("#carousel img");
  const totalImages = carouselImages.length;
  let loadedImages = 0;
  console.log(`Total carousel images: ${totalImages}`);

  const checkImagesLoaded = () => {
    loadedImages++;
    console.log(`Images loaded: ${loadedImages}/${totalImages}`);
    if (loadedImages === totalImages) {
      console.log("All carousel images have loaded.");
      document.querySelector(".carousel-placeholder").style.display = "none";
      document.querySelector(".carousel-slides").style.display = "block";
    }
  };

  carouselImages.forEach((img) => {
    if (img.complete) {
      checkImagesLoaded();
    } else {
      img.addEventListener("load", checkImagesLoaded);
      img.addEventListener("error", () => {
        console.error("Error loading carousel image.");
        checkImagesLoaded();
      });
    }
  });
});
