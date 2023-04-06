import * as fs from "fs";
import path from "path";

interface Response {
  statusCode: 200;
  setHeader: (...args: unknown[]) => void;
  write: (...args: unknown[]) => void;
  end: (...args: unknown[]) => void;
}

export default function handler(req: unknown, res: Response) {
  const BASE_URL = "https://photography-nine-gamma.vercel.app";

  const staticPaths = fs
    .readdirSync(path.resolve(process.cwd(), "src/pages"))
    .filter((staticPage) => {
      return !["api", "_app.tsx", "_document.tsx", "sitemap.xml.tsx"].includes(
        staticPage
      );
    })
    .map((staticPagePath) => {
      const fileData = fs.statSync(
        path.resolve(process.cwd(), "src/pages", staticPagePath)
      );

      return { url: `${BASE_URL}/${staticPagePath.split(".")[0]}`, fileData };
    });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticPaths
        .map(({ url, fileData }) => {
          return `<url>
          <loc>${url}</loc>
          <lastmod>${new Date(fileData.mtime)}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>1.0</priority>
        </url>`;
        })
        .join("")}
    </urlset>
  `;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();
}
