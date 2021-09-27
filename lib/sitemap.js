const fs = require("fs");
const globby = require("globby");
const prettier = require("prettier");
const siteMetadata = require("../config/siteMetadata");

console.log("Generating sitemap.xml...");

(async () => {
  const prettierConfig = await prettier.resolveConfig("./.prettier.js");
  const pages = await globby([
    "pages/*.tsx",
    "!pages/_*.tsx",
    "pages/*.js",
    "data/**/*.mdx",
    "data/**/*.md",
    "public/tags/**/*.xml",
    "!pages/_*.js",
    "!pages/api",
  ]);

  const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${pages
              .map((page) => {
                const path = page
                  .replace("pages/", "/")
                  .replace("data/blog", "/blog")
                  .replace("public/", "/")
                  .replace(".js", "")
                  .replace(".tsx", "")
                  .replace(".mdx", "")
                  .replace(".md", "")
                  .replace("/feed.xml", "");
                const route = path === "/index" ? "" : path;
                if (page === `pages/404.js` || page === `pages/blog/[...slug].js`) {
                  // eslint-disable-next-line array-callback-return
                  return;
                }

                return `
                    <url>
                        <loc>${siteMetadata.siteUrl}${route}</loc>
                    </url>
                    `;
              })
              .join("")}
        </urlset>
    `;

  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: "html",
  });
  // eslint-disable-next-line no-sync
  fs.writeFile("./public/sitemap.xml", formatted, "utf8", (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Sitemap generated!");
    }
  });
})();
