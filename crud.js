document.addEventListener("DOMContentLoaded", () => {
    const addMovieBtn = document.getElementById("add-movie-btn");
    const modal = document.getElementById("movie-modal");
    const movieForm = document.getElementById("movie-form");
    const tableBody = document.getElementById("movie-table-body");
    let editingRow = null; // To track the row being edited

    // Load movies from Local Storage
    loadMovies();

    // Handle form submission for adding/editing movies
    movieForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const title = document.getElementById("title").value;
        const year = document.getElementById("year").value;
        const duration = document.getElementById("duration").value;
        const language = document.getElementById("language").value;
        const country = document.getElementById("country").value;

        if (editingRow) {
            // Edit existing row
            editingRow.cells[0].textContent = title;
            editingRow.cells[1].textContent = year;
            editingRow.cells[2].textContent = duration;
            editingRow.cells[3].textContent = language;
            editingRow.cells[4].textContent = country;
            editingRow = null;
        } else {
            // Add a new row
            const row = createTableRow(title, year, duration, language, country);
            tableBody.appendChild(row);
        }

        saveMoviesToLocalStorage();
        modal.style.display = "none";
        movieForm.reset();
    });

    // Create a table row
    function createTableRow(title, year, duration, language, country) {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${title}</td>
            <td>${year}</td>
            <td>${duration}</td>
            <td>${language}</td>
            <td>${country}</td>
            <td>
                <button class="btn edit-btn">Edit</button>
                <button class="btn delete-btn">Delete</button>
            </td>
        `;

        // Attach event listeners to buttons
        row.querySelector(".delete-btn").addEventListener("click", () => {
            row.remove();
            saveMoviesToLocalStorage();
        });

        row.querySelector(".edit-btn").addEventListener("click", () => {
            editRow(row);
        });

        return row;
    }

    // Edit row function
    function editRow(row) {
        editingRow = row;
        modal.style.display = "flex";

        // Pre-fill form fields with current row values
        document.getElementById("title").value = row.cells[0].textContent;
        document.getElementById("year").value = row.cells[1].textContent;
        document.getElementById("duration").value = row.cells[2].textContent;
        document.getElementById("language").value = row.cells[3].textContent;
        document.getElementById("country").value = row.cells[4].textContent;
    }

    // Save movies to Local Storage
    function saveMoviesToLocalStorage() {
        const rows = document.querySelectorAll("#movie-table-body tr");
        const movies = [];

        rows.forEach((row) => {
            movies.push({
                title: row.cells[0].textContent,
                year: row.cells[1].textContent,
                duration: row.cells[2].textContent,
                language: row.cells[3].textContent,
                country: row.cells[4].textContent,
            });
        });

        localStorage.setItem("movies", JSON.stringify(movies));
    }

    // Load movies from Local Storage
    function loadMovies() {
        const movies = JSON.parse(localStorage.getItem("movies")) || [];
        movies.forEach((movie) => {
            const row = createTableRow(
                movie.title,
                movie.year,
                movie.duration,
                movie.language,
                movie.country
            );
            tableBody.appendChild(row);
        });
    }
});
