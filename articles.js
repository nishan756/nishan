const API_URL = "https://nishan-backend-hc51.onrender.com/app/articles/";
const container = document.getElementById("articlesContainer");
const loading = document.getElementById("loading");

async function loadArticles() {
    try {
        const res = await fetch(API_URL);

        if (!res.ok) throw new Error("API error");

        const articles = await res.json();

        loading.style.display = "none";
        container.innerHTML = "";

        articles.forEach(article => {

            const card = document.createElement("div");
            card.className = "card item-card";

            card.innerHTML = `
                <div class="title">${article.title}</div>

                <div class="blurb">
                    ${article.short_description.slice(0, 120)}...
                </div>

                <a class="read" href="article-detail.html?id=${article.id}/">
                    read more →
                </a>
            `;

            container.appendChild(card);
        });

    } catch (err) {
        console.error(err);
        loading.innerText = "Failed to load articles.";
    }
}

loadArticles();
