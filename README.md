# 🧠 AI-First CRM – HCP Log Interaction Module

🚀 **An AI-powered CRM module designed for Healthcare Professionals (HCPs), enabling intelligent interaction logging via structured forms and conversational AI using LangGraph and LLMs.**

---

## 📌 Project Overview

This project implements an **AI-first CRM system** focused on the **HCP (Healthcare Professional) interaction module**, specifically the **Log Interaction Screen**.

The system allows field representatives to:

* Log interactions using a **structured form**
* Or interact via a **chat-based conversational interface**

The backend leverages **LangGraph + LLMs (Groq)** to process unstructured input and convert it into structured CRM data.

---

## 🎯 Objective

To design a **smart, AI-driven interaction logging system** that:

* Reduces manual effort
* Improves data accuracy
* Extracts meaningful insights from conversations
* Aligns with real-world **Life Sciences workflows**

---

## 🧩 Core Features

### 📝 1. Structured Interaction Logging

* Form-based input for:

  * HCP Name
  * Date
  * Interaction Type
  * Notes
* Ensures standardized data entry

---

### 💬 2. Conversational Chat Interface

* Users can log interactions naturally

* Example:

  > "Doctor discussed new API drug but is concerned about side effects"

* AI processes and converts into structured format

---

### 🤖 3. AI Processing Engine (LangGraph)

* Built using **LangGraph workflow orchestration**
* Handles:

  * Input parsing
  * Context understanding
  * Output structuring

---

### 🧠 4. LLM Integration (Groq)

* Model Used:

  * `gemma2-9b-it` (primary)
  * `llama-3.3-70b-versatile` (optional for extended reasoning)

* Capabilities:

  * Sentiment analysis
  * Entity extraction
  * Concern identification
  * Follow-up recommendations

---

### 📊 5. Structured Output Generation

Transforms raw input into:

```json
{
  "hcp_name": "Dr. Smith",
  "sentiment": "Neutral",
  "discussion_topic": "API Drug",
  "concern": "Side effects",
  "follow_up": "Share clinical trial data"
}
```

---

## 🏗️ System Architecture

```id="arch1"
User (Field Rep)
      ↓
React UI (Form / Chat)
      ↓
Redux (State Management)
      ↓
FastAPI Backend
      ↓
LangGraph Workflow
      ↓
Groq LLM (gemma2-9b-it)
      ↓
Structured CRM Data
      ↓
SQL Database (MySQL/Postgres)
      ↓
UI Display
```

---

## ⚙️ Tech Stack

### 🔹 Frontend

* React.js
* Redux
* Google Inter Font

### 🔹 Backend

* FastAPI (Python)

### 🔹 AI Layer

* LangGraph (Agent orchestration)
* Groq API (LLMs):

  * gemma2-9b-it
  * llama-3.3-70b-versatile

### 🔹 Database

* MySQL / PostgreSQL

---

## 🔄 End-to-End Workflow

1. User logs interaction via:

   * Form OR Chat

2. Request sent to FastAPI

3. LangGraph agent:

   * Parses input
   * Calls LLM
   * Structures output

4. AI returns structured CRM data

5. Data stored in database

6. UI displays processed insights

---

## 🤖 LangGraph Workflow Design

* **Node 1:** Input Preprocessing
* **Node 2:** LLM Call (Groq API)
* **Node 3:** Output Structuring
* **Node 4:** Validation
* **Node 5:** Response Return

---

## 🧪 Example

### 🔹 User Input (Chat)

Doctor is interested in API drug but worried about side effects.

### 🔹 AI Output

* Sentiment: Neutral
* Topic: API Drug
* Concern: Side effects
* Action: Provide clinical data

---

## 👥 User Roles

### 👨‍⚕️ Field Representative

* Logs HCP interactions
* Uses chat or form

### 🧑‍💼 Manager

* Reviews interaction quality
* Tracks insights

---

## 📂 Project Structure

```id="struct1"
ai-crm-hcp-project/
│
├── backend/
│   ├── app/
│   ├── routes/
│   ├── langgraph/
│   ├── services/
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── redux/
│
├── database/
│
├── .env
└── README.md
```

---

## ⚙️ Setup Instructions

### 🔹 Clone

```bash id="clone1"
git clone https://github.com/VarshithaAndra/ai-crm-hcp-project.git
cd ai-crm-hcp-project
```

---

### 🔹 Backend Setup

```bash id="backend1"
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

---

### 🔹 Frontend Setup

```bash id="frontend1"
cd frontend
npm install
npm start
```

---

## 🔐 Environment Variables

```id="env1"
GROQ_API_KEY=your_groq_api_key
DATABASE_URL=your_db_url
```

---

## 🧪 API Endpoint

### POST /log-interaction

```json id="api1"
{
  "text": "Doctor is interested but concerned about pricing"
}
```

---

## 🚀 Future Enhancements

* 📊 Analytics Dashboard
* 🔐 Role-based Access
* 📈 Predictive AI Insights
* 🔗 Integration with Healthcare Systems

---

## 🧠 Key Learnings

* Built AI-first system using LangGraph
* Integrated Groq LLM APIs
* Designed real-world CRM workflow
* Implemented full-stack architecture

---

## 🎥 Demo

(Add your demo video link here)

---

## 📸 Screenshots

(Add UI screenshots here)

---

## 📄 License

For educational and demonstration purposes.

---

## 👩‍💻 Author

**Varshitha Andra**
