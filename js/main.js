document.querySelectorAll('.nav a[href^="#"]').forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    let id = this.getAttribute("href");
    let targetOffset = document.querySelector(id).offsetTop;

    window.scrollTo({
      top: targetOffset - 100,
      behavior: "smooth"
    });
  });
});