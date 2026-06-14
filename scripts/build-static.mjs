import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const src = path.join(root, "src");
const dist = path.join(root, "dist");
const base = process.env.PUBLIC_BASE_PATH || "./";
const asset = (value) => `${base}${value}`.replace(/([^:]\/)\/+/g, "$1");
const readJson = async (file) => JSON.parse(await readFile(path.join(src, "content", file), "utf8"));

const [profileZh, profileEn, experience, expertise, works, draftWorks, interviewees] = await Promise.all([
  readJson("profile.zh.json"),
  readJson("profile.en.json"),
  readJson("experience.json"),
  readJson("expertise.json"),
  readJson("works.json"),
  readJson("draft-works.json"),
  readJson("interviewees.json"),
]);

const esc = (value) =>
  String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const lang = (zh, en) => `<span data-zh>${esc(zh)}</span><span data-en>${esc(en)}</span>`;

const html = `<!doctype html>
<html lang="zh-Hant" data-lang="zh">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Anita Tsai / 蔡靚萱 bilingual portfolio website for business reporting, CEO learning products, and featured works.">
  <title>Anita Tsai / 蔡靚萱</title>
  <link rel="stylesheet" href="${asset("styles/global.css")}">
  <link rel="icon" href="${asset("assets/profile/anita-tsai-profile.webp")}">
</head>
<body>
  <header class="site-header">
    <a href="#home" class="brand">Anita Tsai <span>蔡靚萱</span></a>
    <nav aria-label="Main navigation">
      <a href="#about">About</a>
      <a href="#experience">Experience</a>
      <a href="#expertise">Expertise</a>
      <a href="#works">Works</a>
    </nav>
    <div class="language-toggle" aria-label="Language selector">
      <button type="button" data-lang-button="zh">中文</button>
      <button type="button" data-lang-button="en">EN</button>
    </div>
  </header>
  <main>
    <section class="hero" id="home">
      <div class="hero-media"><img src="${asset("assets/profile/anita-tsai-profile.webp")}" alt="Anita Tsai profile portrait"></div>
      <div class="hero-copy">
        <p class="eyebrow">${lang(profileZh.eyebrow, profileEn.eyebrow)}</p>
        <h1>${lang(profileZh.name, profileEn.name)}</h1>
        <p class="role">${lang(profileZh.title, profileEn.title)}</p>
        <p class="lede">${lang(profileZh.subtitle, profileEn.subtitle)}</p>
        <div class="hero-actions">
          <a class="button primary" href="#works">${lang("觀看作品", "View Works")}</a>
          <a class="button" href="#experience">${lang("查看經歷", "View Experience")}</a>
          <a class="button text" href="https://www.linkedin.com/in/anita-tsai-a547b89" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </div>
    </section>
    <section class="section two-column" id="about">
      <div>
        <p class="section-kicker">About / 關於 Anita</p>
        <h2>${lang("把趨勢翻成決策語言", "Translating trends into decision language")}</h2>
      </div>
      <div class="prose">
        ${profileZh.summary.map((item, index) => `<p>${lang(item, profileEn.summary[index])}</p>`).join("")}
        <p class="highlight">${lang(profileZh.positioning, profileEn.positioning)}</p>
      </div>
    </section>
    <section class="section" id="experience">
      <div class="section-head">
        <p class="section-kicker">Experience / 經歷</p>
        <h2>${lang("從新聞室到 CEO 學習場景", "From newsroom reporting to CEO learning products")}</h2>
      </div>
      <div class="timeline">
        ${experience.map((item) => `<article class="timeline-item">
          <div class="timeline-date">${esc(item.years)}</div>
          <div class="timeline-card">
            <h3>${lang(item.title_zh, item.title_en)}</h3>
            <p class="organization">${esc(item.organization)}</p>
            <p>${lang(item.description_zh, item.description_en)}</p>
            <p class="source">Source: ${esc(item.source)}</p>
          </div>
        </article>`).join("")}
      </div>
    </section>
    <section class="section" id="expertise">
      <div class="section-head compact">
        <p class="section-kicker">Expertise / 採訪領域</p>
        <h2>${lang("跨科技、金融、社會與醫療的長線觀察", "Long-form observation across technology, finance, society, and healthcare")}</h2>
      </div>
      <div class="expertise-grid">
        ${expertise.map((item) => `<article class="expertise-card">
          <div>
            <h3>${lang(item.label_zh, item.label_en)}</h3>
            <p>${lang(item.description_zh, item.description_en)}</p>
          </div>
          <div class="cover-strip" aria-label="${esc(item.label_en)} cover gallery">
            ${item.covers.slice(0, 6).map((cover) => `<img src="${asset(cover)}" alt="${esc(item.label_en)} portfolio cover from user-provided PPT" loading="lazy">`).join("")}
          </div>
        </article>`).join("")}
      </div>
    </section>
    <section class="section" id="works">
      <div class="section-head">
        <p class="section-kicker">Featured Works / 得意作品</p>
        <h2>${lang("已驗證作品", "Verified works")}</h2>
        <p>${lang("只有能回溯標題、作者與外部頁面的作品會顯示連結。", "Links appear only when title, authorship, and external source have been verified.")}</p>
      </div>
      <div class="work-grid verified">
        ${works.map((work) => `<article class="work-card">
          <img src="${asset(work.cover_image)}" alt="${esc(work.title_en)} cover image" loading="lazy">
          <div class="work-copy">
            <p class="meta">${esc(work.publication)} · ${work.issue ? `Issue ${esc(work.issue)}` : esc(work.year)}</p>
            <h3>${lang(work.title_zh, work.title_en)}</h3>
            <p>${lang(work.short_description_zh, work.short_description_en)}</p>
            <a href="${esc(work.external_url)}" target="_blank" rel="noreferrer">${lang("查看作品", "Read article")}</a>
            <p class="source">${esc(work.source_note)}</p>
          </div>
        </article>`).join("")}
      </div>
      <div class="draft-works">
        <div class="section-head compact">
          <h2>${lang("待驗證封面資料", "Cover candidates pending verification")}</h2>
          <p>${lang("這些來自使用者提供 PPT，尚未確認公開 URL 與作者資訊，因此不提供外部連結。", "These are extracted from the user-provided PPT. External URLs and authorship still need verification, so no outbound links are shown.")}</p>
        </div>
        <div class="masonry">
          ${draftWorks.map((work) => `<article class="draft-card">
            <img src="${asset(work.cover_image)}" alt="${esc(work.title_en)} cover candidate from PPT" loading="lazy">
            <h3>${lang(work.title_zh, work.title_en)}</h3>
            <p>${esc(work.publication)}</p>
          </article>`).join("")}
        </div>
      </div>
    </section>
    <section class="section interview-section" id="interviews">
      <div class="section-head compact">
        <p class="section-kicker">Interviews / 重要訪談對象</p>
        <h2>${lang("跨科技、創業、金融與生醫的全球觀察", "Global perspective across technology, entrepreneurship, finance, and biomedicine")}</h2>
        <p>${lang("以下名單依英文 Bio 建立；呈現重點是專業觀察範圍，而非名人堆疊。", "The list is sourced from the English bio and framed as a map of Anita's reporting range.")}</p>
      </div>
      <div class="name-cloud">${interviewees.map((name) => `<span>${esc(name)}</span>`).join("")}</div>
    </section>
  </main>
  <footer class="footer" id="contact">
    <div>
      <p class="section-kicker">Contact / 聯絡</p>
      <h2>${lang("保持專業、保留邊界", "Professional contact, with privacy intact")}</h2>
      <p>${lang("本網站暫不公開私人 email 或電話。可先透過 LinkedIn 或公開作者頁補充。", "Private email and phone are intentionally omitted. LinkedIn or public author pages can be added here.")}</p>
      <p class="source">© ${new Date().getFullYear()} Anita Tsai. Image credits: user-provided PPT and profile photo; publication marks remain on original covers.</p>
    </div>
    <a class="button primary" href="https://www.linkedin.com/in/anita-tsai-a547b89" target="_blank" rel="noreferrer">LinkedIn</a>
  </footer>
  <script>
    const root = document.documentElement;
    const saved = localStorage.getItem("preferred-language");
    if (saved === "en" || saved === "zh") root.dataset.lang = saved;
    document.querySelectorAll("[data-lang-button]").forEach((button) => {
      button.addEventListener("click", () => {
        const next = button.getAttribute("data-lang-button");
        root.dataset.lang = next;
        localStorage.setItem("preferred-language", next);
      });
    });
  </script>
</body>
</html>`;

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
await mkdir(path.join(dist, "styles"), { recursive: true });
await cp(path.join(root, "public", "assets"), path.join(dist, "assets"), { recursive: true });
await cp(path.join(src, "styles", "global.css"), path.join(dist, "styles", "global.css"));
await writeFile(path.join(dist, "index.html"), html, "utf8");
console.log(`Built ${path.join(dist, "index.html")}`);
