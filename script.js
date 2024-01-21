
const API_URL = 'https://api.github.com/users/';
let currentPage = 1;

function fetchRepositories() {
    const username = document.getElementById('username').value;
    const repositoriesPerPage = document.getElementById('repositoriesPerPage').value;
    const searchKeyword = document.getElementById('search').value;

    const url = `${API_URL}${username}/repos?page=${currentPage}&per_page=${repositoriesPerPage}&q=${searchKeyword}`;

    const loader = document.getElementById('loader');
    loader.style.display = 'block';

    $.get(url, function (repositories) {
        displayRepositories(repositories);
        displayPagination(repositories, repositoriesPerPage);
    })
    .fail(function (error) {
        console.error('Error fetching repositories:', error);
    })
    .always(function () {
        loader.style.display = 'none';
    });
}

function displayRepositories(repositories) {
    const repositoriesContainer = document.getElementById('repositories');
    repositoriesContainer.innerHTML = '';

    repositories.forEach(repo => {
        const repoElement = document.createElement('div');
        repoElement.className = 'repository';
        repoElement.innerHTML = `
            <h3>${repo.name}</h3>
            <p>${repo.description || 'No description available.'}</p>
            <p>Topics: ${repo.topics.join(', ') || 'No topics available.'}</p>
            <hr>
        `;
        repositoriesContainer.appendChild(repoElement);
    });
}

function displayPagination(repositories, repositoriesPerPage) {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';

    const totalPages = Math.ceil(repositories.length / repositoriesPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.innerText = i;
        pageButton.addEventListener('click', () => {
            currentPage = i;
            fetchRepositories();
        });
        paginationContainer.appendChild(pageButton);
    }
}
