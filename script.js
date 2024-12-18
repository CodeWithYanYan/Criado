document.addEventListener("DOMContentLoaded", () => {
  const addMovieBtn = document.getElementById("add-movie-btn");
  const modal = document.getElementById("movie-modal");
  const movieForm = document.getElementById("movie-form");
  const tableBody = document.getElementById("movie-table-body");

  // Show modal on button click
  addMovieBtn.addEventListener("click", () => {
      modal.style.display = "flex";
  });

  // Close modal when clicking outside content
  window.onclick = (event) => {
      if (event.target === modal) {
          modal.style.display = "none";
      }
  };

  // Form submission
  movieForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const title = document.getElementById("title").value;
      const year = document.getElementById("year").value;
      const duration = document.getElementById("duration").value;
      const language = document.getElementById("language").value;
      const country = document.getElementById("country").value;

      // Add a new row to the table
      const row = `<tr>
                      <td>${title}</td>
                      <td>${year}</td>
                      <td>${duration}</td>
                      <td>${language}</td>
                      <td>${country}</td>
                      <td><button class="btn delete-btn">Delete</button></td>
                  </tr>`;

      tableBody.insertAdjacentHTML("beforeend", row);

      // Clear form and close modal
      movieForm.reset();
      modal.style.display = "none";

      // Handle delete button
      const deleteBtns = document.querySelectorAll(".delete-btn");
      deleteBtns.forEach((btn) => {
          btn.addEventListener("click", (event) => {
              event.target.closest("tr").remove();
          });
      });
  });
});
