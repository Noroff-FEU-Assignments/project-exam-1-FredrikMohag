document.addEventListener("DOMContentLoaded", function () {
  console.log("Document is ready.");
  fetchAllPosts(currentPage);
  setupOlderPostsListener();
});

let currentPage = 1;
console.log(`Current Page: ${currentPage}`);

function fetchAllPosts(page) {
  const postsApiUrl = `https://www.haakansson.no/wp-json/wp/v2/posts?_embed&per_page=10&page=${page}`;
  console.log(`Fetching posts from: ${postsApiUrl}`);

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
      console.log(`Received ${posts.length} posts for page ${page}.`);
      const mainInfoContainer = document.getElementById("main-info");
      if (page === 1) {
        while (mainInfoContainer.firstChild) {
          mainInfoContainer.removeChild(mainInfoContainer.firstChild);
        }
      }

      posts.forEach((post) => {
        console.log(`Processing post: ${post.title.rendered}`);
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
        contentElement.innerHTML = DOMPurify.sanitize(post.content.rendered);

        if (
          post._embedded &&
          post._embedded["wp:featuredmedia"] &&
          post._embedded["wp:featuredmedia"][0].source_url
        ) {
          const imageElement = document.createElement("img");
          imageElement.src = post._embedded["wp:featuredmedia"][0].source_url;
          imageElement.classList.add("post-image");
          const altText = `${
            post.title.rendered
          } - ${post.content.rendered.substring(0, 50)}`;
          imageElement.alt = altText.substring(0, 100);
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
    );
    fetchAllPosts(++currentPage);
  });
}

window.addEventListener("scroll", function () {
  var scrollToTopContainer = document.getElementById("scrollToTopContainer");
  if (window.scrollY > 300) {
    scrollToTopContainer.style.display = "block";
    console.log("Displaying scroll-to-top button.");
  } else {
    scrollToTopContainer.style.display = "none";
    console.log("Hiding scroll-to-top button.");
  }
});

var scrollToTopButton = document.getElementById("scrollToTopContainer");
scrollToTopButton.addEventListener("click", function () {
  console.log("Scroll-to-top button clicked. Scrolling to top.");
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
