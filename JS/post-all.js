document.addEventListener("DOMContentLoaded", function () {
  console.log("Document is ready."); // Log when DOM is fully loaded
  fetchAllPosts(currentPage);
  setupOlderPostsListener();
  setupBackToTopButton();
});

let currentPage = 1; // Keep track of the current page
console.log(`Current Page: ${currentPage}`); // Log the initial current page

function fetchAllPosts(page) {
  const postsApiUrl = `https://www.haakansson.no/wp-json/wp/v2/posts?_embed&per_page=10&page=${page}`;
  console.log(`Fetching posts from: ${postsApiUrl}`); // Log the API URL being fetched

  fetch(postsApiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Network response was not ok, status: ${response.status}`
        );
      }
      return response.json();
    })
    .then((posts) => {
      console.log(`Received ${posts.length} posts for page ${page}.`); // Log the number of posts fetched
      const mainInfoContainer = document.getElementById("main-info");
      if (page === 1) {
        // Safely clear the container's content
        while (mainInfoContainer.firstChild) {
          mainInfoContainer.removeChild(mainInfoContainer.firstChild);
        }
      }

      posts.forEach((post) => {
        console.log(`Processing post: ${post.title.rendered}`); // Log the title of each post being processed
        const postElement = document.createElement("div");
        postElement.classList.add("post");

        const titleElement = document.createElement("h2");
        titleElement.textContent = post.title.rendered;

        const dateElement = document.createElement("p");
        const date = new Date(post.date);
        dateElement.textContent = `${date.getFullYear()}/${String(
          date.getMonth() + 1
        ).padStart(2, "0")}/${String(date.getDate()).padStart(2, "0")} ${String(
          date.getHours()
        ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
        dateElement.style.fontStyle = "italic";

        const contentElement = document.createElement("div");
        // Sanitize and set the HTML content
        contentElement.innerHTML = DOMPurify.sanitize(post.content.rendered);

        if (
          post._embedded &&
          post._embedded["wp:featuredmedia"] &&
          post._embedded["wp:featuredmedia"][0].source_url
        ) {
          const imageElement = document.createElement("img");
          imageElement.src = post._embedded["wp:featuredmedia"][0].source_url;
          const altText = `${
            post.title.rendered
          } - ${post.content.rendered.substring(0, 50)}`; // Descriptive alt text
          imageElement.alt = altText.substring(0, 100); // Limit alt text to 100 characters
          postElement.appendChild(imageElement);
        }

        postElement.appendChild(titleElement);
        postElement.appendChild(dateElement);
        postElement.appendChild(contentElement);
        mainInfoContainer.appendChild(postElement);
      });
    })
    .catch((error) => {
      console.error("There was a problem with your fetch operation:", error);
    });
}

function setupOlderPostsListener() {
  const olderPostsDiv = document.getElementById("older-posts");
  olderPostsDiv.style.cursor = "pointer";
  olderPostsDiv.addEventListener("click", () => {
    console.log(
      `Older posts button clicked. Moving to page ${currentPage + 1}`
    ); // Log when older posts are requested
    fetchAllPosts(++currentPage);
  });
}

function setupBackToTopButton() {
  const backToTopButton = document.getElementById("back-top");
  backToTopButton.addEventListener("click", () => {
    console.log("Back to top button clicked."); // Log when back to top button is clicked
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}
