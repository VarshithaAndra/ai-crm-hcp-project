# AI CRM HCP Project

An AI-powered Customer Relationship Management (CRM) tool specifically designed for Healthcare Professionals (HCP). This application leverages large language models (LLMs) to automate and enhance the logging, tracking, and management of interactions with healthcare providers.

## 🚀 Features

-   **AI-Powered Interaction Logging**: Automatically extract structured data (HCP name, interaction type, attendees, topics, materials, samples, sentiment, outcomes, and follow-up) from natural language input.
-   **Intelligent Form Editing**: Update CRM forms using natural language commands.
-   **Interaction History**: Retrieve and display complete interaction history for specific HCPs.
-   **AI Suggestions**: Generate intelligent follow-up suggestions based on current interaction data.
-   **Automated Summaries**: Create concise summaries of HCP interactions.
-   **Interactive Chat Interface**: A seamless React-based frontend for interacting with the AI agent.

## 🛠️ Tech Stack

-   **Frontend**: React, CSS (Vanilla)
-   **Backend**: FastAPI, Python
-   **AI Engine**: LangGraph, LangChain, ChatGroq (Llama 3.1)
-   **Database**: SQLAlchemy, SQLite (Local development)

## 📂 Project Structure

```text
ai-crm-hcp-project/
├── backend/            # FastAPI Backend
│   ├── app/
│   │   ├── agent/      # LangGraph Agent logic & tools
│   │   ├── db/         # Database models and configuration
│   │   └── main.py     # FastAPI application entry point
│   ├── .env            # Environment variables (API keys, etc.)
│   └── requirements.txt
├── frontend/           # React Frontend
│   ├── src/            # Components, styles, and logic
│   ├── public/
│   └── package.json
└── README.md
```

## ⚙️ Setup Instructions

### Backend Setup

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2.  Create a virtual environment:
    ```bash
    python -m venv venv
    ```
3.  Activate the virtual environment:
    -   **Windows**: `venv\Scripts\activate`
    -   **macOS/Linux**: `source venv/bin/activate`
4.  Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```
5.  Create a `.env` file based on `.env.example` and add your `GROQ_API_KEY`.
6.  Run the backend server:
    ```bash
    uvicorn app.main:app --reload
    ```

### Frontend Setup

1.  Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run the development server:
    ```bash
    npm start
    ```

## 🤖 Agent Tools

The AI agent is equipped with several specialized tools:

-   **Log Tool**: Extracts structured data and commits it to the database.
-   **Edit Tool**: Identifies specific fields to update in a form based on user input.
-   **History Tool**: Queries the database for all previous interactions with a given HCP.
-   **Suggest Tool**: Generates actionable follow-up items.
-   **Summary Tool**: Provides a high-level overview of the current interaction.

## 📝 License

This project is for internal use.
