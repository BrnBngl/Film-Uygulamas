const template = document.createElement("template");
template.innerHTML = `
<style>
@import url('http://${location.host}/components/movieCard/movieCard.css')
</style>
<div class="movie-container">
    <div class="image-container">
        <img />
    </div>
    <div class="info">
        <h3 class="title"></h3>
        <p>
            <slot />
        </p>
        <div class="action_container">
            <i class="isLike fa fa-thumbs-up"></i>
            <a target="_blank" class="button">IMDb</a>
        </div>
    </div>
</div>
`;

class MovieCard extends HTMLElement {
  constructor() {
    super();

    this.isLike = false;

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    
    setTimeout(() => {
      this.shadowRoot.querySelector("h3.title").innerHTML = this.getAttribute(
        "title"
      );
      this.shadowRoot.querySelector("img").src = this.getAttribute("poster");
      this.shadowRoot
        .querySelector(".button")
        .setAttribute(
          "href",
          `https://imdb.com/title/${this.getAttribute("imdbID")}`
        );

      if (this.getAttribute("isLike") == "true") {
        this.isLike = true;
        this.shadowRoot
          .querySelector(".isLike")
          .classList.add("is_like");
      }
    }, 100);
  }

  favToggle() {
    this.isFavourite = !this.isFavourite;
    if (this.isFavourite) {
      this.shadowRoot
        .querySelector(".isLike")
        .classList.add("is_like");
    } else {
      this.shadowRoot
        .querySelector(".isLike")
        .classList.remove("is_like");
    }
  }

  connectedCallback() {
    this.shadowRoot
      .querySelector(".isLike")
      .addEventListener("click", () => this.favToggle());
  }

  disconnectedCallback() {
    this.shadowRoot
      .querySelector(".isFavourite")
      .removeEventListener("click", () => this.favToggle());
  }
}

window.customElements.define("movie-card", MovieCard);