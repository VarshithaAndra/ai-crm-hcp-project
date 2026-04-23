# 🧠 AI-First CRM for HCP Interaction Management

🚀 **An intelligent CRM system that leverages AI to transform unstructured healthcare interactions into actionable insights.**

---

## 📌 Overview

This project is an AI-powered Customer Relationship Management (CRM) system designed for managing interactions with Healthcare Professionals (HCPs).

Traditional CRM systems rely on manual data entry, which is often inconsistent and inefficient. This system uses **Large Language Models (LLMs)** to automatically analyze, structure, and extract insights from unstructured interaction data.

---

## 🎯 Key Highlights (Why This Project Stands Out)

* 🧠 AI-powered interaction analysis using LLMs
* ⚡ Converts unstructured text → structured CRM data
* 📊 Real-world healthcare use case (HCP engagement)
* 🔄 End-to-end system (Frontend + Backend + AI + Database)
* 🏗️ Scalable architecture design

---

## 🏗️ System Architecture

```
User Input (UI)
      ↓
Frontend (React)
      ↓
Backend API (FastAPI)
      ↓
AI Processing Layer (LLM / LangGraph)
      ↓
Structured Insights
      ↓
Database (SQL/MySQL)
      ↓
Dashboard / UI Display
```

---

## ⚙️ Tech Stack

### 🔹 Frontend

* React.js
* Axios

### 🔹 Backend

* FastAPI
* Uvicorn

### 🔹 Database

* MySQL

### 🔹 AI Layer

* LLM APIs (OpenAI / Anthropic)
* LangGraph (for workflow orchestration)

---

## 🔄 End-to-End Workflow

1. User enters interaction details (free text)
2. Frontend sends data to backend API
3. Backend invokes AI model
4. AI extracts:

   * Sentiment
   * Key discussion points
   * Concerns
   * Suggested follow-ups
5. Structured data is stored in database
6. Results displayed in UI

---

## 🤖 AI Capabilities

* 🧠 Sentiment Analysis
* 📝 Summarization
* 📌 Entity Extraction
* 🎯 Follow-up Recommendation
* 🔍 Context Understanding

---

## 📊 Example

### 🔹 Input:

Doctor is interested in the new API drug but concerned about side effects.

### 🔹 Output:

* Sentiment: Neutral
* Concern: Side effects
* Product: API drug
* Suggested Action: Share clinical trial data

---

## 🧩 Core Modules

### 1. Interaction Logging

* Capture HCP interaction data
* Store raw input

### 2. AI Processing Engine

* Analyze interaction using LLM
* Generate structured insights

### 3. Data Storage

* Store interaction + AI output

### 4. Dashboard *(Planned)*

* Visualize insights
* Track engagement

---

## 👥 User Roles

### 👨‍⚕️ Sales Representative

* Logs interactions
* Views AI-generated insights

### 🧑‍💼 Manager

* Tracks engagement quality
* Monitors team performance

---

## 📂 Project Structure

```
ai-crm-hcp-project/
│
├── backend/
│   ├── app/
│   ├── routes/
│   ├── services/
│
├── frontend/
│   ├── src/
│   ├── components/
│
├── database/
│
├── .env
├── .gitignore
└── README.md
```

---

## ⚙️ Setup Instructions

### 🔹 Clone Repository

```bash
git clone https://github.com/VarshithaAndra/ai-crm-hcp-project.git
cd ai-crm-hcp-project
```

### 🔹 Backend Setup

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### 🔹 Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

## 🔐 Environment Variables

Create a `.env` file:

```
OPENAI_API_KEY=your_api_key
DATABASE_URL=your_database_url
```

---

## 🧪 Sample API

### POST /log-interaction

```json
{
  "text": "Doctor is interested but concerned about pricing"
}
```

### Response:

```json
{
  "sentiment": "Neutral",
  "concern": "Pricing",
  "action": "Provide cost comparison"
}
```

---

## 🚀 Future Enhancements

* 📊 Analytics Dashboard
* 🔐 Role-Based Access Control
* 🔄 Real-time Notifications
* 📈 Predictive Insights using AI
* 🔗 Integration with healthcare systems

---

## 🧠 Key Learnings

* Applied AI in real-world CRM workflows
* Built full-stack application (React + FastAPI)
* Integrated LLM APIs for intelligent processing
* Designed scalable and modular architecture

---

## 📸 Screenshots (Add Here)

> Add UI screenshots to improve project visibility

---

## 🎥 Demo (Add Here)

> Add demo video or GIF for better impact

---

## 🤝 Contribution

Contributions are welcome! Feel free to fork and submit pull requests.

---

## 📄 License

This project is for educational purposes.

---

## 👩‍💻 Author

**Varshitha Andra**

