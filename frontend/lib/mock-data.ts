/**
 * Mock data for F1 placeholder state.
 * F2 and F3 will replace these with real AG-UI event streams from the Planner Agent.
 */

export type AgentEventType =
  | "RUN_STARTED"
  | "STEP_STARTED"
  | "STEP_FINISHED"
  | "STATE_DELTA"
  | "TOOL_CALL_START"
  | "TOOL_CALL_END"
  | "TEXT_MESSAGE_START"
  | "TEXT_MESSAGE_CONTENT"
  | "TEXT_MESSAGE_END"
  | "RUN_FINISHED"
  | "RUN_ERROR";

export type AgentEvent = {
  id: string;
  ts: string;            // HH:MM:SS
  type: AgentEventType;
  title: string;         // bold line
  detail?: string;       // secondary line
  agent?: "planner" | "search";
};

export type ToolCall = {
  id: string;
  name: string;
  status: "running" | "done" | "error";
  query?: string;
  resultsCount?: number;
};

export type SearchResult = {
  title: string;
  url: string;
  snippet: string;
};

export type ChatMessage =
  | { id: string; role: "user"; content: string }
  | {
      id: string;
      role: "assistant";
      agent: "planner" | "search";
      content: string;
      streaming?: boolean;
      tool?: {
        name: string;
        query: string;
        results: SearchResult[];
      };
    };

export const SAMPLE_QUERY = "What are the latest developments in AI agent protocols?";

export const MOCK_MESSAGES: ChatMessage[] = [
  { id: "m_1", role: "user", content: SAMPLE_QUERY },
  {
    id: "m_2",
    role: "assistant",
    agent: "planner",
    content:
      "Three protocols dominate the current agent stack. MCP (Anthropic) standardises how an agent calls tools and reads external data — it's already shipping in Claude, Cursor, and our own ServiceNow / Slack integrations. A2A (Google → Linux Foundation) gives agents an Agent Card and a JSON-RPC task lifecycle so one agent can delegate to another regardless of framework. AG-UI (CopilotKit) is the streaming event protocol that connects the agent backend to a React frontend — it's how the tokens you're reading right now reach your screen. This POC exercises all three: the Planner used A2A to delegate retrieval to the Search Agent, Search called the web_search MCP tool, and the answer streamed back over AG-UI.",
    tool: {
      name: "web_search",
      query: SAMPLE_QUERY,
      results: [
        {
          title: "AG-UI Protocol — agent–user interaction over SSE",
          url: "docs.ag-ui.com",
          snippet: "16 standard event types for streaming agent runs to a frontend. First-party support in LangGraph, CrewAI, Google ADK, Mastra.",
        },
        {
          title: "A2A specification — Linux Foundation",
          url: "google.github.io/A2A",
          snippet: "Agent Card discovery + task lifecycle (submitted → working → completed). Adopted by Salesforce, SAP, ServiceNow, Deutsche Bank.",
        },
        {
          title: "Model Context Protocol — modelcontextprotocol.io",
          url: "modelcontextprotocol.io",
          snippet: "Open standard from Anthropic for connecting AI models to tools, resources, and prompts. HTTP/SSE or stdio transport.",
        },
      ],
    },
  },
];

export const MOCK_EVENTS: AgentEvent[] = [
  { id: "e_1", ts: "13:18:23", type: "RUN_STARTED", title: "Run started", detail: "run_id=xn422j8r", agent: "planner" },
  { id: "e_2", ts: "13:18:23", type: "STATE_DELTA", title: "planner · decomposing question", agent: "planner" },
  { id: "e_3", ts: "13:18:23", type: "STEP_STARTED", title: "Delegating to Search Agent (A2A)", agent: "planner" },
  { id: "e_4", ts: "13:18:23", type: "STATE_DELTA", title: "search · preparing web_search call", agent: "search" },
  { id: "e_5", ts: "13:18:23", type: "TOOL_CALL_START", title: "web_search(query)", detail: '"AI agent protocols 2026"', agent: "search" },
  { id: "e_6", ts: "13:18:23", type: "TOOL_CALL_END", title: "tool returned", detail: "3 results", agent: "search" },
  { id: "e_7", ts: "13:18:23", type: "STEP_FINISHED", title: "Delegating to Search Agent (A2A) ✓", agent: "planner" },
  { id: "e_8", ts: "13:18:24", type: "STATE_DELTA", title: "planner · synthesising answer", agent: "planner" },
  { id: "e_9", ts: "13:18:24", type: "TEXT_MESSAGE_START", title: "assistant message open", agent: "planner" },
  { id: "e_10", ts: "13:18:29", type: "TEXT_MESSAGE_END", title: "assistant message closed", agent: "planner" },
  { id: "e_11", ts: "13:18:29", type: "STATE_DELTA", title: "idle · done", agent: "planner" },
  { id: "e_12", ts: "13:18:29", type: "RUN_FINISHED", title: "Run finished", agent: "planner" },
];

export const EVENT_COLOR: Record<AgentEventType, string> = {
  RUN_STARTED: "text-ok",
  STEP_STARTED: "text-a2a",
  STEP_FINISHED: "text-a2a",
  STATE_DELTA: "text-agui",
  TOOL_CALL_START: "text-mcp",
  TOOL_CALL_END: "text-mcp",
  TEXT_MESSAGE_START: "text-copilot",
  TEXT_MESSAGE_CONTENT: "text-copilot",
  TEXT_MESSAGE_END: "text-copilot",
  RUN_FINISHED: "text-ok",
  RUN_ERROR: "text-err",
};
