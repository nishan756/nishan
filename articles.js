// Backend API URL
const API_URL = "http://127.0.0.1:8000/api/articles/";

// DOM Element
const articleContainer = document.getElementById("articles");

// Fetch Articles
async function fetchArticles() {
    try {
        const response = await fetch(API_URL);

        // Response check
        if (!response.ok) {
            throw new Error("Failed to fetch articles");
        }

        // Convert response to JSON
        const articles = await response.json();

        // Clear previous content
        articleContainer.innerHTML = "";

        // Loop through articles
        articles.forEach(article => {
            const articleCard = document.createElement("div");
            articleCard.classList.add("article-card");

            articleCard.innerHTML = `
                <h2>${article.title}</h2>
                <p>${article.content}</p>
                <small>Author: ${article.author}</small>
            `;

            articleContainer.appendChild(articleCard);
        });

    } catch (error) {
        console.error("Error:", error);

        articleContainer.innerHTML = `
            <p>Failed to load articles.</p>
        `;
    }
}

// Call function
fetchArticles();
