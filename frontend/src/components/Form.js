import { useState, useEffect } from "react";
import ChatBox from "./ChatBox";
import "./Form.css";

function Form() {
    const [formData, setFormData] = useState({
        hcp_name: "",
        interaction_type: "Meeting",
        attendees: "",
        topics: "",
        materials: "",
        samples: "",
        sentiment: "",
        outcomes: "",
        follow_up: "",
        date: "",
        time: ""
    });

    const handleAI = async () => {
        const res = await fetch("http://127.0.0.1:8000/ai", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ input })
        });

        const data = await res.json();
        console.log("API RESPONSE:", data);

        const output = data.output;

        setForm({
            hcp_name: output.hcp_name || "",
            interaction_type: output.interaction_type || "",
            attendees: output.attendees || "",
            topics: output.topics || "",
            materials: output.materials || "",
            samples: output.samples || "",
            sentiment: output.sentiment || "",
            outcomes: output.outcomes || "",
            follow_up: output.follow_up || ""
        });
    };

    return (
        <div className="container">
            <h1 className="title">Log HCP Interaction</h1>

            <div className="layout">

                {/* LEFT PANEL */}
                <div className="left-panel">
                    <h2>Interaction Details</h2>

                    <div className="row">
                        <input
                            placeholder="Search or select HCP..."
                            value={formData.hcp_name}
                            onChange={e => setFormData({ ...formData, hcp_name: e.target.value })}
                        />

                        <select
                            value={formData.interaction_type}
                            onChange={e => setFormData({ ...formData, interaction_type: e.target.value })}
                        >
                            <option>Meeting</option>
                            <option>Call</option>
                            <option>Email</option>
                        </select>
                    </div>

                    <div className="row">
                        <input value={formData.date} readOnly />
                        <input value={formData.time} readOnly />
                    </div>

                    <input
                        placeholder="Enter names or search..."
                        value={formData.attendees}
                        onChange={e => setFormData({ ...formData, attendees: e.target.value })}
                    />

                    <textarea
                        placeholder="Enter key discussion points..."
                        value={formData.topics}
                        onChange={e => setFormData({ ...formData, topics: e.target.value })}
                    />

                    <button className="voice-btn">
                        🎤 Summarize from Voice Note (Requires Consent)
                    </button>

                    <div className="section">
                        <h3>Materials Shared / Samples Distributed</h3>

                        <div className="row between">
                            <span>No materials added</span>
                            <button>Search/Add</button>
                        </div>

                        <div className="row between">
                            <span>No samples added</span>
                            <button>Add Sample</button>
                        </div>
                    </div>

                    <div className="section">
                        <h3>Observed / Inferred HCP Sentiment</h3>

                        <div className="radio-group">
                            <label><input type="radio" name="sentiment" value="Positive"
                                onChange={e => setFormData({ ...formData, sentiment: e.target.value })} /> Positive</label>

                            <label><input type="radio" name="sentiment" value="Neutral"
                                onChange={e => setFormData({ ...formData, sentiment: e.target.value })} /> Neutral</label>

                            <label><input type="radio" name="sentiment" value="Negative"
                                onChange={e => setFormData({ ...formData, sentiment: e.target.value })} /> Negative</label>
                        </div>
                    </div>

                    <textarea
                        placeholder="Key outcomes or agreements..."
                        value={formData.outcomes}
                        onChange={e => setFormData({ ...formData, outcomes: e.target.value })}
                    />

                    <textarea
                        placeholder="Enter next steps or tasks..."
                        value={formData.follow_up}
                        onChange={e => setFormData({ ...formData, follow_up: e.target.value })}
                    />

                    <div className="suggestions">
                        <p>AI Suggested Follow-ups:</p>
                        <ul>
                            <li>Schedule follow-up meeting in 2 weeks</li>
                            <li>Send brochure PDF</li>
                            <li>Add to advisory board list</li>
                        </ul>
                    </div>

                </div>

                {/* RIGHT PANEL */}
                <ChatBox setFormData={setFormData} />

            </div>
        </div>
    );
}

export default Form;