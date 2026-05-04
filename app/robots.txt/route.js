import { BASE_URL } from "@/lib/seo";

export async function GET() {
  const robotsTxt = `User-Agent: *
Allow: /
Disallow: /api/
Disallow: /_next/
Disallow: /fonts/

Sitemap: ${BASE_URL}/sitemap.xml
Host: ${BASE_URL}

Content-Signal: ai-train=no, search=yes, ai-input=no
`;

  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
