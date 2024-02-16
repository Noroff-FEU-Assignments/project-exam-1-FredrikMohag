document.addEventListener("DOMContentLoaded", function () {
  console.log("Document is ready."); // Log when the document is ready

  function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (pair[0] == variable) {
        return decodeURIComponent(pair[1].replace(/\+/g, " "));
      }
    }
    return false;
  }

  const postId = getQueryVariable("postId");
  console.log(`postId: ${postId}`); // Log the postId

  let apiUrl =
    "https://www.haakansson.no/wp-json/wp/v2/posts?per_page=1&_embed";

  if (postId) {
    apiUrl = `https://www.haakansson.no/wp-json/wp/v2/posts/${postId}?_embed`;
  }

  console.log(`API URL: ${apiUrl}`); // Log the final API URL

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Network response was not ok. Status: ${response.status}`
        );
      }
      return response.json();
    })
    .then((data) => {
      console.log(data); // Log the data retrieved from the API
      const post = data;
      const specificBlogContainer = document.getElementById("specific-blog");

      // Check if band_title exists in the post data
      if (post.band_title) {
        const bandTitleElement = document.createElement("h3");
        bandTitleElement.textContent = post.band_title;
        specificBlogContainer.appendChild(bandTitleElement);
      }

      const titleElement = document.createElement("h2");
      titleElement.textContent = post.title.rendered;
      specificBlogContainer.appendChild(titleElement);

      if (
        post._embedded &&
        post._embedded["wp:featuredmedia"] &&
        post._embedded["wp:featuredmedia"][0].source_url
      ) {
        const imgElement = document.createElement("img");
        imgElement.src = post._embedded["wp:featuredmedia"][0].source_url;
        imgElement.alt = "Featured image";
        imgElement.style.cursor = "pointer";
        imgElement.addEventListener("click", function () {
          openModal(this.src);
        });
        specificBlogContainer.appendChild(imgElement);
      }

      const postDate = new Date(post.date);
      const formattedDate = `${postDate.getFullYear()}-${(
        postDate.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${postDate
        .getDate()
        .toString()
        .padStart(2, "0")} ${postDate
        .getHours()
        .toString()
        .padStart(2, "0")}:${postDate
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;
      const dateElement = document.createElement("div");
      dateElement.textContent = `Published: ${formattedDate}`;
      specificBlogContainer.appendChild(dateElement);

      const contentElement = document.createElement("div");
      contentElement.innerHTML = DOMPurify.sanitize(post.content.rendered);
      specificBlogContainer.appendChild(contentElement);
    })
    .catch((error) => {
      console.error("There was a problem with your fetch operation:", error);
      const specificBlogContainer = document.getElementById("specific-blog");
      specificBlogContainer.textContent =
        "Failed to load the post. Please try again later.";
    });

  const modal = document.createElement("div");
  modal.setAttribute("class", "modal");
  const modalImg = document.createElement("img");
  modalImg.setAttribute("class", "modal-content");
  const span = document.createElement("span");
  span.setAttribute("class", "close");
  span.textContent = "×";
  modal.appendChild(modalImg);
  modal.appendChild(span);
  document.body.appendChild(modal);

  function openModal(src) {
    modal.style.display = "block";
    modalImg.src = src;
  }

  function closeModal() {
    modal.style.display = "none";
  }

  span.onclick = closeModal;
  window.onclick = function (event) {
    if (event.target == modal) {
      closeModal();
    }
  };
});
