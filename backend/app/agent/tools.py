import os, json, re
from langchain_groq import ChatGroq
from dotenv import load_dotenv
from app.db.database import SessionLocal
from app.db.models import Interaction

load_dotenv()

llm = ChatGroq(
    groq_api_key=os.getenv("GROQ_API_KEY"),
    model="llama-3.1-8b-instant"
)

def extract_json(text):
    try:
        text = re.sub(r"```json|```", "", text).strip()
        match = re.search(r"\{.*\}", text, re.DOTALL)
        if match:
            return json.loads(match.group())
    except Exception as e:
        print("JSON ERROR:", e)
    return None


def log_tool(state):
    try:
        text = state.get("input", "")
        context = state.get("context", {})

        prompt = f"""
Extract structured CRM interaction data from the text. Follow these strict rules:
1. Make educated guesses (e.g., if a single name is given like 'varshi', assume it is the hcp_name).
2. Differentiate 'materials' (e.g., brochures, PDFs, literature) from 'samples' (e.g., physical product samples, sample packs).
3. For 'outcomes', capture the full meaning of the result or agreement, not just a few words.
4. For 'follow_up', capture the complete action item, including what to do and when (e.g., "follow up next Tuesday to check on patients"), rather than just the date.
5. If you cannot infer a field, leave it as an empty string.

Text:
\"\"\"{text}\"\"\"

Return ONLY a valid JSON object with these exact keys:
{{
    "hcp_name": "",
    "interaction_type": "",
    "attendees": "",
    "topics": "",
    "materials": "",
    "samples": "",
    "sentiment": "Neutral",
    "outcomes": "",
    "follow_up": ""
}}
"""

        res = llm.invoke(prompt)
        print("LLM:", res.content)

        data = extract_json(res.content) or {}

        db = SessionLocal()
        interaction = Interaction(
            hcp_name=data.get("hcp_name"),
            interaction_type=data.get("interaction_type"),
            attendees=data.get("attendees"),
            topics=data.get("topics"),
            materials=data.get("materials"),
            samples=data.get("samples"),
            sentiment=data.get("sentiment"),
            outcomes=data.get("outcomes"),
            follow_up=data.get("follow_up")
        )
        db.add(interaction)
        db.commit()

        return {"input": text, "context": context, "output": {"action": "log", "data": data}}

    except Exception as e:
        print("ERROR:", e)
        return {"input": state.get("input", ""), "context": state.get("context", {}), "output": {"action": "log", "data": {}}}


def edit_tool(state):
    try:
        text = state.get("input", "")
        context = state.get("context", {})

        prompt = f"""
You are an AI assistant helping to edit a CRM interaction form.
The user wants to edit the form based on this input: "{text}"

Current Form State:
{json.dumps(context, indent=2)}

Return ONLY a JSON object containing the fields that need to be updated with their new values. 
Match the keys used in the current form state exactly.
Do not include fields that should remain unchanged.
"""
        res = llm.invoke(prompt)
        updates = extract_json(res.content) or {}
        return {"input": text, "context": context, "output": {"action": "edit", "data": updates}}
    except Exception as e:
        print("ERROR in edit:", e)
        return {"input": state.get("input", ""), "context": state.get("context", {}), "output": {"action": "edit", "data": {}}}

def history_tool(state):
    try:
        text = state.get("input", "")
        context = state.get("context", {})
        hcp_name = context.get("hcp", "")
        
        if not hcp_name:
            prompt = f"Extract the HCP name from this text: '{text}'. Return ONLY a JSON like {{\"hcp_name\": \"...\"}}"
            res = llm.invoke(prompt)
            data = extract_json(res.content) or {}
            hcp_name = data.get("hcp_name", "")
            
        if not hcp_name:
            return {"input": text, "context": context, "output": {"action": "history", "data": "Please specify an HCP name to search for their history."}}
            
        db = SessionLocal()
        interactions = db.query(Interaction).filter(Interaction.hcp_name.ilike(f"%{hcp_name}%")).order_by(Interaction.id.desc()).all()
        db.close()
        
        if not interactions:
            return {"input": text, "context": context, "output": {"action": "history", "data": f"No previous interactions found for {hcp_name}."}}
            
        history_text = f"Here is the complete history for {hcp_name}:\n"
        for idx, i in enumerate(interactions):
            history_text += f"\n{idx+1}. {i.interaction_type or 'Interaction'}:"
            history_text += f"\n   - Attendees: {i.attendees or 'N/A'}"
            history_text += f"\n   - Topics: {i.topics or 'N/A'}"
            history_text += f"\n   - Materials: {i.materials or 'N/A'}"
            history_text += f"\n   - Samples: {i.samples or 'N/A'}"
            history_text += f"\n   - Sentiment: {i.sentiment or 'N/A'}"
            history_text += f"\n   - Outcomes: {i.outcomes or 'N/A'}"
            history_text += f"\n   - Follow-up: {i.follow_up or 'N/A'}\n"
            
        return {"input": text, "context": context, "output": {"action": "history", "data": history_text}}
    except Exception as e:
        print("ERROR in history:", e)
        return {"input": state.get("input", ""), "context": state.get("context", {}), "output": {"action": "history", "data": "Error fetching history."}}

def suggest_tool(state):
    try:
        text = state.get("input", "")
        context = state.get("context", {})
        prompt = f"""
Based on the following CRM interaction form, suggest 3 follow-up actions.
Current Form State:
{json.dumps(context, indent=2)}

Return ONLY a JSON object:
{{
  "suggestions": ["suggestion 1", "suggestion 2", "suggestion 3"]
}}
"""
        res = llm.invoke(prompt)
        data = extract_json(res.content) or {}
        suggestions = data.get("suggestions", [])
        return {"input": text, "context": context, "output": {"action": "suggest", "data": suggestions}}
    except Exception as e:
        print("ERROR in suggest:", e)
        return {"input": state.get("input", ""), "context": state.get("context", {}), "output": {"action": "suggest", "data": []}}

def summary_tool(state):
    try:
        text = state.get("input", "")
        context = state.get("context", {})
        prompt = f"""
Summarize the current interaction briefly based on the form data.
Current Form State:
{json.dumps(context, indent=2)}

Return a short 2-3 sentence summary as plain text. Do not return JSON.
"""
        res = llm.invoke(prompt)
        return {"input": text, "context": context, "output": {"action": "summary", "data": res.content.strip()}}
    except Exception as e:
        print("ERROR in summary:", e)
        return {"input": state.get("input", ""), "context": state.get("context", {}), "output": {"action": "summary", "data": "Error generating summary."}}