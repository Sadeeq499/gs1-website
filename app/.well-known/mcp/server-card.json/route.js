import { BASE_URL } from "@/lib/seo";

export async function GET() {
  const data = {
    serverInfo: {
      name: "GS1 MCP Server",
      version: "1.0.0"
    },
    transport: {
      type: "sse",
      endpoint: `${BASE_URL}/mcp/sse`
    },
    capabilities: {
      tools: {},
      resources: {}
    }
  };

  return Response.json(data);
}
