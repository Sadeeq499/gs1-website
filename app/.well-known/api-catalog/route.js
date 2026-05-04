import { BASE_URL } from "@/lib/seo";

export async function GET() {
  const data = {
    linkset: [
      {
        anchor: `${BASE_URL}/api`,
        "service-desc": [
          {
            href: `${BASE_URL}/api/openapi.json`,
            type: "application/openapi+json"
          }
        ],
        "service-doc": [
          {
            href: `${BASE_URL}/docs`,
            type: "text/html"
          }
        ],
        status: [
          {
            href: `${BASE_URL}/api/health`,
            type: "application/json"
          }
        ]
      }
    ]
  };

  return new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/linkset+json",
    },
  });
}
