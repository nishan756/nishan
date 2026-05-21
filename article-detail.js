const API_BASE = "https://nishan-backend-hc51.onrender.com/app/articles/{id}";

        const container = document.getElementById("articleContainer");
        const loading = document.getElementById("loading");

        const params = new URLSearchParams(window.location.search);
        const articleId = params.get("id");

        async function loadArticle() {

            try {

                const res = await fetch(`${API_BASE}${articleId}/`);

                if (!res.ok) {
                    throw new Error("Failed to fetch article");
                }

                const article = await res.json();

                loading.style.display = "none";

                container.innerHTML = `

                    <div class="banner-wrapper">

                        <img
                            src="${article.banner}"
                            alt="${article.title}"
                            class="banner"
                        >

                    </div>

                    <div class="article-content">

                        <div class="meta-row">

                            <span class="category">
                                ${article.category}
                            </span>

                            <span class="author">
                                By ${article.author}
                            </span>

                        </div>

                        <h1 class="title">
                            ${article.title}
                        </h1>

                        <div class="detail">
                            ${article.detail}
                        </div>

                    </div>

                `;

            } catch (err) {

                console.error(err);

                loading.innerHTML = `
                    Failed to load article.
                `;
            }
        }

        loadArticle();
