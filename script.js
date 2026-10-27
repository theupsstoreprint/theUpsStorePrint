// Coming-soon messages on the landing page
const comingSoonDialog = document.querySelector("#coming-soon");

if (comingSoonDialog) {
  const dialogTitle = comingSoonDialog.querySelector("#soon-title");
  const closeButton = comingSoonDialog.querySelector(".close");

  document.querySelectorAll("[data-category]").forEach(button => {
    button.addEventListener("click", () => {
      dialogTitle.textContent = button.dataset.category;
      comingSoonDialog.showModal();
    });
  });

  closeButton.addEventListener("click", () => {
    comingSoonDialog.close();
  });

  comingSoonDialog.addEventListener("click", event => {
    if (event.target !== comingSoonDialog) return;

    const bounds = comingSoonDialog.getBoundingClientRect();

    const clickedOutside =
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom;

    if (clickedOutside) comingSoonDialog.close();
  });
}
