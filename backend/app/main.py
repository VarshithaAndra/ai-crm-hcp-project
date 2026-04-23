from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.agent.graph import run_agent

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/ai")
def ai_route(body: dict):
    text = body.get("input", "")
    context = body.get("context", {})
    result = run_agent(text, context)
    return result