import { BASE_URL } from "@/lib/seo";

export async function GET() {
  const data = {
    $schema: "https://agentskills.io/schema.json",
    skills: [
      {
        name: "GS1 MCP Skill",
        type: "mcp",
        description: "Core GS1 platform capabilities for agents.",
        url: `${BASE_URL}/.well-known/mcp/server-card.json`,
      }
    ]
  };

  return Response.json(data);
}
