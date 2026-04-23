from langgraph.graph import StateGraph, END, START
from typing import TypedDict
from app.agent.tools import log_tool, edit_tool, history_tool, suggest_tool, summary_tool

class State(TypedDict):
    input: str
    context: dict
    output: dict


def router(state):
    text = state["input"].lower()

    if "edit" in text:
        return "edit"
    elif "history" in text:
        return "history"
    elif "suggest" in text:
        return "suggest"
    elif "summary" in text:
        return "summary"
    else:
        return "log"


graph = StateGraph(State)

graph.add_node("log", log_tool)
graph.add_node("edit", edit_tool)
graph.add_node("history", history_tool)
graph.add_node("suggest", suggest_tool)
graph.add_node("summary", summary_tool)

graph.add_conditional_edges(
    START,
    router,
    {
        "log": "log",
        "edit": "edit",
        "history": "history",
        "suggest": "suggest",
        "summary": "summary"
    }
)

graph.add_edge("log", END)
graph.add_edge("edit", END)
graph.add_edge("history", END)
graph.add_edge("suggest", END)
graph.add_edge("summary", END)

app_graph = graph.compile()


def run_agent(text, context=None):
    if context is None:
        context = {}
    return app_graph.invoke({
        "input": text,
        "context": context,
        "output": {}
    })