"""
MCP Tool Server — Day 1 (B1)
FastMCP server exposing web_search(query) tool on port 8001.
Returns mock data (hardcoded results).
"""

from fastmcp import FastMCP

# --- FastMCP Tool Server ---
mcp = FastMCP("Web Search MCP Server")


@mcp.tool()
def web_search(query: str) -> dict:
    """Search the web for a given query and return top results."""
    # Mock data — will be replaced with real search API later
    return {
        "results": [
            {
                "title": f"Understanding {query} - A Comprehensive Guide",
                "url": f"https://example.com/guide/{query.replace(' ', '-')}",
                "snippet": f"This comprehensive guide covers everything you need to know about {query}, including latest developments and best practices.",
            },
            {
                "title": f"{query} - Latest Research 2025",
                "url": f"https://research.example.com/{query.replace(' ', '-')}",
                "snippet": f"Recent research findings on {query} show significant progress in the field, with new breakthroughs announced this quarter.",
            },
            {
                "title": f"Top 10 Resources for {query}",
                "url": f"https://resources.example.com/top-10-{query.replace(' ', '-')}",
                "snippet": f"Curated list of the best resources, tools, and frameworks related to {query} for developers and researchers.",
            },
        ]
    }


# --- Custom route for health check ---
@mcp.custom_route("/health", methods=["GET"])
async def health(request):
    from starlette.responses import JSONResponse
    return JSONResponse({"status": "ok"})


if __name__ == "__main__":
    mcp.run(transport="sse", host="0.0.0.0", port=8001)
