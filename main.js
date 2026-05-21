// Year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Mobile menu
const menuBtn = document.getElementById('menuBtn');
if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    document.querySelector('.nav nav').classList.toggle('open');
  });
}

// Helper: fetch JSON
async function fetchJSON(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error('Failed to load ' + url);
  return r.json();
}

// Render list pages
async function renderProjectsList() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;
  try {
    const items = await fetchJSON('data/projects.json');
    grid.innerHTML = items.map(p => `
      <a class="card item-card" href="project.html?id=${encodeURIComponent(p.id)}">
        <span class="title">${p.title}</span>
        <span class="blurb">${p.summary}</span>
        <div class="tags">${p.tags.map(t=>`<span class="tag-pill">${t}</span>`).join('')}</div>
        <span class="read">read more →</span>
      </a>
    `).join('');
  } catch (e) {
    grid.innerHTML = `<p class="muted">Could not load projects.</p>`;
  }
}

async function renderArticlesList() {
  const grid = document.getElementById('articles-grid');
  if (!grid) return;
  try {
    const items = await fetchJSON('data/articles.json');
    grid.innerHTML = items.map(a => `
      <a class="card item-card" href="article.html?id=${encodeURIComponent(a.id)}">
        <span class="title">${a.title}</span>
        <span class="blurb">${a.summary}</span>
        <div class="tags"><span class="tag-pill">${a.date}</span><span class="tag-pill">${a.readTime}</span></div>
        <span class="read">read article →</span>
      </a>
    `).join('');
  } catch (e) {
    grid.innerHTML = `<p class="muted">Could not load articles.</p>`;
  }
}

// Detail pages
function getQueryId() {
  return new URLSearchParams(location.search).get('id');
}

async function renderProjectDetail() {
  const root = document.getElementById('project-detail');
  if (!root) return;
  const id = getQueryId();
  try {
    const items = await fetchJSON('data/projects.json');
    const p = items.find(x => String(x.id) === String(id));
    if (!p) { root.innerHTML = `<p class="muted">Project not found.</p>`; return; }
    document.title = `${p.title} — Ata Alahy Nishan`;
    root.innerHTML = `
      <article class="detail">
        <p class="muted" style="font-family:var(--mono);font-size:12px;letter-spacing:.2em;text-transform:uppercase">// project</p>
        <h1>${p.title}</h1>
        <div class="meta">${p.tags.join(' · ')}</div>
        ${p.cover ? `<img class="cover" src="${p.cover}" alt="${p.title}"/>` : ''}
        <div class="content">${p.content}</div>
        <div class="tags">${p.tags.map(t=>`<span class="tag-pill">${t}</span>`).join('')}</div>
        ${p.link ? `<p style="margin-top:24px"><a class="btn primary" href="${p.link}" target="_blank" rel="noopener">visit project →</a></p>`:''}
      </article>`;
  } catch (e) {
    root.innerHTML = `<p class="muted">Could not load project.</p>`;
  }
}

async function renderArticleDetail() {
  const root = document.getElementById('article-detail');
  if (!root) return;
  const id = getQueryId();
  try {
    const items = await fetchJSON('data/articles.json');
    const a = items.find(x => String(x.id) === String(id));
    if (!a) { root.innerHTML = `<p class="muted">Article not found.</p>`; return; }
    document.title = `${a.title} — Ata Alahy Nishan`;
    root.innerHTML = `
      <article class="detail">
        <p class="muted" style="font-family:var(--mono);font-size:12px;letter-spacing:.2em;text-transform:uppercase">// article</p>
        <h1>${a.title}</h1>
        <div class="meta">${a.date} · ${a.readTime}</div>
        <div class="content">${a.content}</div>
      </article>`;
  } catch (e) {
    root.innerHTML = `<p class="muted">Could not load article.</p>`;
  }
}

renderProjectsList();
renderArticlesList();
renderProjectDetail();
renderArticleDetail();
