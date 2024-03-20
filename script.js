const apiUrl = 'http://localhost:3000';

document.addEventListener('DOMContentLoaded', () => {
    // Fetch a random joke when the page loads
    getRandomJoke();

    // Fetch and display joke categories
    fetchJokeCategories();

    // Handle form submission for adding a new joke
    const formElement = document.getElementById('add-joke-form-section');
    formElement.addEventListener('submit', (event) => {
        event.preventDefault();
        addNewJoke();
    });
});

async function getRandomJoke() {
    try {
        // Fetch categories of jokes
        fetch(`${apiUrl}/jokebook/categories`)
            .then(response => response.json())
            .then(categories => {
                // Select a random category
                const randomCategory = categories[Math.floor(Math.random() * categories.length)];

                // Fetch a random joke within the selected category
                fetch(`${apiUrl}/jokebook/joke/${randomCategory}`)
                    .then(response => response.json())
                    .then(jokes => {
                        // Retrieve and display a random joke
                        const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
                        const jokeContainer = document.getElementById('random-joke-display');
                        jokeContainer.textContent = `${randomJoke.joke} - ${randomJoke.response}`;
                    });
            });
    } catch (error) {
        console.error('Error fetching a random joke:', error);
    }
}

async function fetchJokeCategories() {
    try {
        const response = await fetch(`${apiUrl}/jokebook/categories`);
        const categories = await response.json();

        const categoryListElement = document.getElementById('category-list-section');
        categories.forEach(category => {
            const listItemElement = document.createElement('li');
            listItemElement.textContent = category;
            categoryListElement.appendChild(listItemElement);

            // Add event listener for clicking on a joke category
            listItemElement.addEventListener('click', () => {
                let jokesContainer = document.getElementById('jokes-display-section');
                jokesContainer.innerHTML = '';

                fetchJokesByCategory(category);
            });
        });
    } catch (error) {
        console.error('Error fetching joke categories:', error);
    }
}

function fetchJokesByCategory(category) {
    fetch(`${apiUrl}/jokebook/joke/${category}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch jokes');
            }
            return response.json();
        })
        .then(jokes => {
            const jokesContainer = document.getElementById('jokes-display-section');

            // Create and append a new list for the jokes
            const jokesList = document.createElement('ul');
            jokesList.classList.add('jokes-list');
            jokesContainer.appendChild(jokesList);

            // Add each joke to the list
            jokes.forEach(joke => {
                const listItemElement = document.createElement('li');
                listItemElement.textContent = `${joke.joke} - ${joke.response}`;
                jokesList.appendChild(listItemElement);
            });
        })
        .catch(error => {
            console.error('Error fetching jokes by category:', error);
        });
}

async function addNewJoke() {
    const formElement = document.getElementById('add-joke-form-section');
    const formData = new FormData(formElement);
    const jsonData = {};
    formData.forEach((value, key) => jsonData[key] = value);

    try {
        const response = await fetch(`${apiUrl}/jokebook/joke/new`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        });
        const responseData = await response.json();
        console.log('New joke added:', responseData);
    } catch (error) {
        console.error('Error adding a new joke:', error);
    }
}
