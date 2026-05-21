"""STATE_DELTA payload schema — used by Planner Agent and consumed by the frontend Activity panel."""

from typing import Literal, TypedDict


class ToolCallState(TypedDict):
    name: str
    status: Literal["running", "done"]
    query: str


class StateDelta(TypedDict):
    active_agent: Literal["planner", "search", "idle"]
    step: str
    tool_calls: list[ToolCallState]


# Example payload emitted by Planner Agent:
#
# {
#   "active_agent": "search",
#   "step": "searching...",
#   "tool_calls": [
#     { "name": "web_search", "status": "running", "query": "AI agent protocols 2025" }
#   ]
# }
