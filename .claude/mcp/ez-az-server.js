import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { execSync } from "child_process";

const PROJECT_ROOT = "/home/jay/projects/ez_az";

function rails(ruby) {
  const escaped = ruby.replace(/"/g, '\\"');
  return execSync(`bin/rails runner "${escaped}"`, {
    cwd: PROJECT_ROOT,
    encoding: "utf8",
    timeout: 30000,
  }).trim();
}

function parseBugs(output) {
  if (!output) return [];
  return output
    .split("\n")
    .filter((l) => l.trim())
    .map((line) => {
      try {
        return JSON.parse(line);
      } catch {
        return null;
      }
    })
    .filter(Boolean);
}

const server = new Server(
  { name: "ez-az", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "list_pending_bugs",
      description: "List all bug reports with status=pending, ordered by newest first.",
      inputSchema: { type: "object", properties: {} },
    },
    {
      name: "list_approved_bugs",
      description: "List all approved bug reports ordered by votes_count DESC.",
      inputSchema: { type: "object", properties: {} },
    },
    {
      name: "approve_bug",
      description: "Set a bug report status to approved (makes it visible on the public board).",
      inputSchema: {
        type: "object",
        properties: { id: { type: "number", description: "Bug report ID" } },
        required: ["id"],
      },
    },
    {
      name: "dismiss_bug",
      description: "Set a bug report status to dismissed (spam, duplicate, or not a bug).",
      inputSchema: {
        type: "object",
        properties: { id: { type: "number", description: "Bug report ID" } },
        required: ["id"],
      },
    },
    {
      name: "squash_bug",
      description: "Set a bug report status to squashed (the bug has been fixed).",
      inputSchema: {
        type: "object",
        properties: { id: { type: "number", description: "Bug report ID" } },
        required: ["id"],
      },
    },
    {
      name: "bug_detail",
      description: "Get full details of a single bug report by ID.",
      inputSchema: {
        type: "object",
        properties: { id: { type: "number", description: "Bug report ID" } },
        required: ["id"],
      },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case "list_pending_bugs": {
        const out = rails(
          'BugReport.pending.order(created_at: :desc).each { |b| puts({id: b.id, game_slug: b.game_slug, description: b.description, player_name: b.player.username, created_at: b.created_at.iso8601}.to_json) }'
        );
        return { content: [{ type: "text", text: JSON.stringify(parseBugs(out), null, 2) }] };
      }

      case "list_approved_bugs": {
        const out = rails(
          'BugReport.approved.by_votes.each { |b| puts({id: b.id, game_slug: b.game_slug, description: b.description, player_name: b.player.username, votes_count: b.votes_count, created_at: b.created_at.iso8601}.to_json) }'
        );
        return { content: [{ type: "text", text: JSON.stringify(parseBugs(out), null, 2) }] };
      }

      case "approve_bug": {
        rails(`BugReport.find(${args.id}).update!(status: 'approved')`);
        return { content: [{ type: "text", text: `Bug #${args.id} approved.` }] };
      }

      case "dismiss_bug": {
        rails(`BugReport.find(${args.id}).update!(status: 'dismissed')`);
        return { content: [{ type: "text", text: `Bug #${args.id} dismissed.` }] };
      }

      case "squash_bug": {
        rails(`BugReport.find(${args.id}).update!(status: 'squashed')`);
        return { content: [{ type: "text", text: `Bug #${args.id} squashed.` }] };
      }

      case "bug_detail": {
        const out = rails(
          `b = BugReport.find(${args.id}); puts({id: b.id, game_slug: b.game_slug, description: b.description, status: b.status, player_name: b.player.username, votes_count: b.votes_count, created_at: b.created_at.iso8601}.to_json)`
        );
        const parsed = out ? JSON.parse(out) : null;
        return { content: [{ type: "text", text: JSON.stringify(parsed, null, 2) }] };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (err) {
    return {
      content: [{ type: "text", text: `Error: ${err.message}` }],
      isError: true,
    };
  }
});

const transport = new StdioServerTransport();
await server.connect(transport);
