import { BASE_URL } from "@/lib/seo";

export async function GET() {
  const data = {
    resource: BASE_URL,
    authorization_servers: [BASE_URL],
    scopes_supported: ["read", "write"]
  };

  return Response.json(data);
}
