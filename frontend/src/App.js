
import React, { useState } from "react";
import "./App.css";
import ChatBox from "./ChatBox";

function App() {
  const [form, setForm] = useState({
    hcp: "",
    attendees: "",
    topics: "",
    sentiment: "Neutral",
    outcomes: "",
    follow_up: ""
  });

  const [materials, setMaterials] = useState([]);
  const [samples, setSamples] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [suggestions, setSuggestions] = useState([
    "Schedule follow-up meeting in 2 weeks",
    "Send brochure PDF",
    "Add to advisory board list"
  ]);

  // // 🔥 AI parser (mock)
  // const handleAIData = () => {
  //   setForm({
  //     hcp: "Dr. Smith",
  //     attendees: "Me and Dr. Smith",
  //     topics: "Product X efficiency",
  //     sentiment: "Neutral"
  //   });

  //   setMaterials(["Brochures"]);
  // };

  const handleAIData = async (text) => {
    try {
      console.log("📤 Sending:", text);
      setChatMessages(prev => [...prev, { sender: 'user', text }]);

      const res = await fetch("http://localhost:8000/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ input: text, context: form })
      });

      const resData = await res.json();
      console.log("📦 FULL RESPONSE:", resData);

      const output = resData?.output || {};
      const action = output.action || "log";
      const aiData = output.data;

      if (!aiData) {
        console.log("⚠️ No AI data");
        return;
      }

      if (action === "log") {
        setForm({
          hcp: aiData.hcp_name || "",
          attendees: aiData.attendees || "",
          topics: aiData.topics || "",
          sentiment:
            (aiData.sentiment || "").toLowerCase() === "positive"
              ? "Positive"
              : (aiData.sentiment || "").toLowerCase() === "negative"
                ? "Negative"
                : "Neutral",
          outcomes: aiData.outcomes || "",
          follow_up: aiData.follow_up || ""
        });

        if (aiData.materials) {
          const mats = aiData.materials.split(",").map((m) => m.trim()).filter(Boolean);
          if (mats.length > 0) setMaterials(mats);
        }

        if (aiData.samples) {
          const samps = aiData.samples.split(",").map((s) => s.trim()).filter(Boolean);
          if (samps.length > 0) setSamples(samps);
        }
        
        setChatMessages(prev => [...prev, { sender: 'ai', text: 'Form updated with parsed data.' }]);
        
      } else if (action === "edit") {
        setForm(prev => ({ ...prev, ...aiData }));
        setChatMessages(prev => [...prev, { sender: 'ai', text: 'Form edited as requested.' }]);
        
      } else if (action === "history" || action === "summary") {
        const textToDisplay = typeof aiData === 'string' ? aiData : JSON.stringify(aiData);
        setChatMessages(prev => [...prev, { sender: 'ai', text: textToDisplay }]);
        
      } else if (action === "suggest") {
        setSuggestions(Array.isArray(aiData) ? aiData : []);
        setChatMessages(prev => [...prev, { sender: 'ai', text: 'Suggestions updated below.' }]);
      }

      console.log("🔥 AI ACTION HANDLED:", action);

    } catch (err) {
      console.error("❌ API ERROR:", err);
      setChatMessages(prev => [...prev, { sender: 'ai', text: 'Error connecting to AI.' }]);
    }
  };
  // ✅ Add Material
  const handleAddMaterial = () => {
    const item = prompt("Enter material name:");
    if (item) {
      setMaterials([...materials, item]);
    }
  };

  // ✅ Add Sample
  const handleAddSample = () => {
    const item = prompt("Enter sample name:");
    if (item) {
      setSamples([...samples, item]);
    }
  };

  return (
    <div className="app">
      <h2>Log HCP Interaction</h2>

      <div className="layout">
        {/* LEFT */}
        <div className="left">
          <div className="card">
            <div className="sectionTitle">Interaction Details</div>

            {/* ROW 1 */}
            <div className="row">
              <div className="field">
                <label>HCP Name</label>
                <input
                  value={form.hcp}
                  placeholder="Search or select HCP..."
                  onChange={(e) => setForm({ ...form, hcp: e.target.value })}
                />
              </div>

              <div className="field">
                <label>Interaction Type</label>
                <select>
                  <option>Meeting</option>
                </select>
              </div>
            </div>

            {/* ROW 2 */}
            <div className="row">
              <div className="field">
                <label>Date</label>
                <input type="date" defaultValue="2025-04-19" />
              </div>

              <div className="field">
                <label>Time</label>
                <input type="time" defaultValue="19:36" />
              </div>
            </div>

            {/* ATTENDEES */}
            <div className="field full">
              <label>Attendees</label>
              <input
                value={form.attendees}
                placeholder="Enter names or search..."
                onChange={(e) => setForm({ ...form, attendees: e.target.value })}
              />
            </div>

            {/* TOPICS */}
            <div className="field full">
              <label>Topics Discussed</label>
              <div className="textareaWrapper">
                <textarea
                  value={form.topics}
                  placeholder="Enter key discussion points..."
                  onChange={(e) => setForm({ ...form, topics: e.target.value })}
                />
                <button className="micBtn">🎤</button>
              </div>
            </div>

            <button className="voiceBtn">
              🎤 Summarize from Voice Note (Requires Consent)
            </button>

            {/* MATERIALS */}
            <div className="sectionBlock">
              <div className="sectionTitle">
                Materials Shared / Samples Distributed
              </div>

              {/* MATERIALS BOX */}
              <div className="box">
                <div>
                  <div className="boxTitle">Materials Shared</div>

                  {materials.length === 0 ? (
                    <div className="empty">No materials added</div>
                  ) : (
                    materials.map((m, i) => <div key={i}>{m}</div>)
                  )}
                </div>

                <button className="sideBtn" onClick={handleAddMaterial}>
                  🔍 Search/Add
                </button>
              </div>

              {/* SAMPLES BOX */}
              <div className="box">
                <div>
                  <div className="boxTitle">Samples Distributed</div>

                  {samples.length === 0 ? (
                    <div className="empty">No samples added</div>
                  ) : (
                    samples.map((s, i) => <div key={i}>{s}</div>)
                  )}
                </div>

                <button className="sideBtn" onClick={handleAddSample}>
                  ➕ Add Sample
                </button>
              </div>
            </div>

            {/* SENTIMENT */}
            <div className="sectionBlock">
              <div className="sectionTitle">
                Observed / Inferred HCP Sentiment
              </div>

              <div className="sentimentRow">
                {/* POSITIVE */}
                <div
                  className={`sentimentItem ${form.sentiment === "Positive" ? "active positive" : ""
                    }`}
                  onClick={() =>
                    setForm({ ...form, sentiment: "Positive" })
                  }
                >
                  <div className="circle">😊</div>
                  <span>Positive</span>
                </div>

                {/* NEUTRAL */}
                <div
                  className={`sentimentItem ${form.sentiment === "Neutral" ? "active neutral" : ""
                    }`}
                  onClick={() =>
                    setForm({ ...form, sentiment: "Neutral" })
                  }
                >
                  <div className="circle">😐</div>
                  <span>Neutral</span>
                </div>

                {/* NEGATIVE */}
                <div
                  className={`sentimentItem ${form.sentiment === "Negative" ? "active negative" : ""
                    }`}
                  onClick={() =>
                    setForm({ ...form, sentiment: "Negative" })
                  }
                >
                  <div className="circle">☹️</div>
                  <span>Negative</span>
                </div>
              </div>
            </div>

            {/* OUTCOMES */}
            <div className="field full">
              <label className="sectionLabel">Outcomes</label>
              <textarea 
                value={form.outcomes}
                onChange={(e) => setForm({ ...form, outcomes: e.target.value })}
                placeholder="Key outcomes or agreements..." 
              />
            </div>

            {/* FOLLOW UP */}
            <div className="field full">
              <label className="sectionLabel">Follow-up Actions</label>
              <textarea 
                value={form.follow_up}
                onChange={(e) => setForm({ ...form, follow_up: e.target.value })}
                placeholder="Enter next steps or tasks..." 
              />
            </div>

            {/* SUGGESTIONS */}
            <div className="followups">
              <b>AI Suggested Follow-ups:</b>
              <ul>
                {suggestions.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="right">
          <ChatBox onLog={handleAIData} messages={chatMessages} />
        </div>
      </div>
    </div>
  );
}

export default App;



