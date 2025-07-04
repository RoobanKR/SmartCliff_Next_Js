const SITE_URL = 'https://smartcliff.in';

export async function GET() {
  // Dynamic slugs
  const b2bSlugs = ['htd', 'td', 'coe', 'upSkilling'];
  const b2iSlugs = ['pt', 'dp', 'skilling', 'internship'];
  const csrSlugs = ['dp'];
  const courseSlugs = ['problemsolvingusingc', 'problemsolvingusingjava', 'problemsolusingpython', 'programmingfundamentalusingchash', 'javafullstack', 'dotnet', 'mernstack', 'manualtesting', 'meanstack', 'istqbcertification', 'automationtestingusingselenumpython', 'performancetestingusingjmeter', 'apitestingusingpostman', 'mobileapptesting', 'automationtestingusingselenumjava', 'apiautomationtestingusingrestassured', 'masteringpowerbi'];

  // Static URLs with metadata
  const staticUrls = [
    {
      loc: `${SITE_URL}/`,
      lastmod: '2025-06-09',
      changefreq: 'daily',
      priority: '1.0',
    },
    {
      loc: `${SITE_URL}/aboutUs`,
      lastmod: '2025-06-01',
      changefreq: 'monthly',
      priority: '0.8',
    },
    {
      loc: `${SITE_URL}/career`,
      lastmod: '2025-05-30',
      changefreq: 'monthly',
      priority: '0.8',
    },
    {
      loc: `${SITE_URL}/contact`,
      lastmod: '2025-05-28',
      changefreq: 'yearly',
      priority: '0.5',
    },
  ];

  // Dynamic URL generation
  const b2bUrls = b2bSlugs.map(
    (slug) => `
    <url>
      <loc>${SITE_URL}/b2b/${slug}</loc>
      <lastmod>2025-06-09</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.7</priority>
    </url>`
  );

  const b2iUrls = b2iSlugs.map(
    (slug) => `
    <url>
      <loc>${SITE_URL}/b2i/${slug}</loc>
      <lastmod>2025-06-09</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.7</priority>
    </url>`
  );

  const csrUrls = csrSlugs.map(
    (slug) => `
    <url>
      <loc>${SITE_URL}/csr/${slug}</loc>
      <lastmod>2025-06-09</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.7</priority>
    </url>`
  );

  const courseUrls = courseSlugs.map(
    (slug) => `
    <url>
      <loc>${SITE_URL}/courses/${slug}</loc>
      <lastmod>2025-06-09</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.7</priority>
    </url>`
  );

  // Combine everything
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${staticUrls
      .map(
        (u) => `
    <url>
      <loc>${u.loc}</loc>
      <lastmod>${u.lastmod}</lastmod>
      <changefreq>${u.changefreq}</changefreq>
      <priority>${u.priority}</priority>
    </url>`
      )
      .join('')}
    ${b2bUrls.join('')}
    ${b2iUrls.join('')}
    ${csrUrls.join('')}
    ${courseUrls.join('')}
  </urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
