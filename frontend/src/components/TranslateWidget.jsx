import { useState, useMemo } from "react";
import axios from "axios";

export default function TranslateWidget() {
  const [open, setOpen] = useState(false);
  const [sourceText, setSourceText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const canTranslate = useMemo(() => sourceText.trim().length > 0 && !loading, [sourceText, loading]);

  const handleTranslate = async () => {
    const text = sourceText.trim();
    if (!text) return;
    setLoading(true);
    setErrorMsg("");
    try {
      const resp = await axios.post("/api/translate", {
        source_text: text,
        source_language: "de",
        target_language: "en",
      });
      const t = resp?.data?.translation ?? resp?.data?.translated_text ?? "";
      setTranslatedText(typeof t === "string" ? t : JSON.stringify(t));
    } catch (err) {
      setErrorMsg(err?.response?.data?.detail || err?.message || "Translation failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: "fixed",
      bottom: "24px",
      right: "24px",
      zIndex: 99999,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      gap: "10px",
      pointerEvents: "none",  // lets clicks pass through the container
    }}>

      {/* Panel */}
      {open && (
        <div style={{
          pointerEvents: "all",
          width: "320px",
          background: "#fff",
          borderRadius: "16px",
          border: "1px solid #e5e7eb",
          boxShadow: "0 24px 48px rgba(0,0,0,0.15)",
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontWeight: 700, fontSize: "14px", color: "#111827" }}>🇩🇪 → 🇺🇸 Translate</span>
            <button onClick={() => { setOpen(false); setErrorMsg(""); }}
              style={{ background: "none", border: "none", cursor: "pointer", fontSize: "18px", color: "#6b7280" }}>×</button>
          </div>

          <textarea
            value={sourceText}
            onChange={(e) => setSourceText(e.target.value)}
            placeholder="Type German text here…"
            rows={3}
            style={{
              width: "100%", padding: "10px", borderRadius: "10px",
              border: "1px solid #d1d5db", fontSize: "13px",
              resize: "vertical", boxSizing: "border-box", fontFamily: "inherit",
            }}
          />

          <button
            onClick={handleTranslate}
            disabled={!canTranslate}
            style={{
              padding: "10px", borderRadius: "10px", border: "none",
              background: canTranslate ? "#2563eb" : "#93c5fd",
              color: "#fff", fontWeight: 700, fontSize: "13px",
              cursor: canTranslate ? "pointer" : "not-allowed",
            }}
          >
            {loading ? "Translating…" : "Translate"}
          </button>

          {errorMsg && (
            <div style={{
              padding: "10px", borderRadius: "10px", background: "#fef2f2",
              border: "1px solid #fecaca", color: "#991b1b", fontSize: "12px",
            }}>{errorMsg}</div>
          )}

          {translatedText && (
            <textarea
              value={translatedText}
              readOnly
              rows={3}
              style={{
                width: "100%", padding: "10px", borderRadius: "10px",
                border: "1px solid #d1d5db", fontSize: "13px",
                background: "#f9fafb", boxSizing: "border-box", fontFamily: "inherit",
              }}
            />
          )}
        </div>
      )}

      {/* FAB button */}
      <button
        onClick={() => { setOpen(v => !v); setErrorMsg(""); }}
        style={{
          pointerEvents: "all",
          background: open ? "#111827" : "#2563eb",
          color: "#fff",
          border: "none",
          borderRadius: "999px",
          padding: "14px 20px",
          fontWeight: 700,
          fontSize: "13px",
          cursor: "pointer",
          boxShadow: "0 8px 24px rgba(37,99,235,0.4)",
          letterSpacing: "0.03em",
        }}
      >
        {open ? "✕ Close" : "🌐 Translate"}
      </button>
    </div>
  );
}