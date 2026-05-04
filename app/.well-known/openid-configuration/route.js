import { BASE_URL } from "@/lib/seo";

export async function GET() {
  const data = {
    issuer: BASE_URL,
    authorization_endpoint: `${BASE_URL}/oauth/authorize`,
    token_endpoint: `${BASE_URL}/oauth/token`,
    jwks_uri: `${BASE_URL}/oauth/jwks`,
    grant_types_supported: ["authorization_code", "client_credentials"]
  };

  return Response.json(data);
}
