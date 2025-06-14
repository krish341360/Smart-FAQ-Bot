import React, { useState } from "react";

const COLORS = {
  background: "#f3f6fd",
  card: "#ffffff",
  primary: "#6c63ff",
  secondary: "#a084e8",
  accent: "#f7b801",
  text: "#232946",
  input: "#e0e7ff",
  border: "#d1d5db",
  shadow: "rgba(108, 99, 255, 0.08)",
};
const isProjectQuestion = (question) => {
  const keywords = ['backend', 'frontend', 'tools', 'develop', 'structure', 'how to run'];
  return keywords.some(word => question.toLowerCase().includes(word));
};

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const askQuestion = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setAnswer("");
    try {
      const res = await fetch("http://localhost:8000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      setAnswer(data.answer);
    } catch (err) {
      setAnswer("Sorry, something went wrong. Please try again.");
    }
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") askQuestion();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: `linear-gradient(135deg, ${COLORS.background} 60%, ${COLORS.secondary} 100%)`,
        padding: "0",
        margin: "0",
        fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: 480,
          margin: "60px auto",
          padding: "32px 32px 24px 32px",
          background: COLORS.card,
          borderRadius: 24,
          boxShadow: `0 6px 32px 0 ${COLORS.shadow}`,
          border: `1px solid ${COLORS.border}`,
        }}
      >
        <h1
          style={{
            color: COLORS.primary,
            fontWeight: 800,
            fontSize: "2.1rem",
            letterSpacing: "-1px",
            marginBottom: 16,
            textAlign: "center",
          }}
        >
          Smart FAQ Bot
        </h1>
        <p
          style={{
            color: COLORS.text,
            fontSize: "1.07rem",
            marginBottom: 28,
            textAlign: "center",
            opacity: 0.77,
          }}
        >
          Ask any question about our service. Get instant answers powered by AI.
        </p>
        <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
          <input
            type="text"
            value={question}
            placeholder="Type your question…"
            onChange={e => setQuestion(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{
              flex: 1,
              padding: "13px 16px",
              fontSize: "1rem",
              borderRadius: 12,
              border: `1.5px solid ${COLORS.border}`,
              background: COLORS.input,
              color: COLORS.text,
              outline: "none",
              transition: "border 0.2s",
              boxShadow: loading ? `0 0 0 2px ${COLORS.primary}` : "none",
            }}
            disabled={loading}
            autoFocus
          />
          <button
            onClick={askQuestion}
            disabled={loading || !question.trim()}
            style={{
              background: loading
                ? COLORS.secondary
                : `linear-gradient(90deg, ${COLORS.primary} 60%, ${COLORS.secondary} 100%)`,
              color: "#fff",
              border: "none",
              borderRadius: 12,
              padding: "0 22px",
              fontSize: "1rem",
              fontWeight: 600,
              cursor: loading || !question.trim() ? "not-allowed" : "pointer",
              transition: "background 0.2s",
              boxShadow: `0 2px 8px 0 ${COLORS.shadow}`,
              height: 46,
            }}
          >
            {loading ? "Thinking…" : "Ask"}
          </button>
        </div>
        {answer && (
          <div
            style={{
              marginTop: 18,
              padding: "20px 18px",
              background: COLORS.input,
              borderRadius: 14,
              border: `1.5px solid ${COLORS.secondary}`,
              color: COLORS.text,
              fontSize: "1.1rem",
              minHeight: 48,
              boxShadow: `0 2px 8px 0 ${COLORS.shadow}`,
              animation: "fadeIn 0.5s",
            }}
          >
            <span style={{ color: COLORS.primary, fontWeight: 700 }}>Answer:</span>
            <div style={{ marginTop: 6, whiteSpace: "pre-wrap" }}>{answer}</div>
          </div>
        )}
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap');
        body {
          margin: 0;
          padding: 0;
          background: ${COLORS.background};
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(16px);}
          to { opacity: 1; transform: translateY(0);}
        }
      `}</style>
    </div>
  );
}

export default App;
