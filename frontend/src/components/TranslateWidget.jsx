import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import axios from "axios";
import { isLoggedIn, authHeaders } from "../utils/auth.js";
import { API_BASE } from "../config.js";

const MAX_CHARS = 5000;

const actionBtnBase = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "4px",
  padding: "5px 10px",
  borderRadius: "6px",
  border: "none",
  cursor: "pointer",
  fontSize: "11px",
  fontWeight: 600,
  transition: "all 0.15s",
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  background: "none",
  color: "#6B7280",
};

export default function TranslateWidget() {
  const [open, setOpen] = useState(false);
  const [sourceText, setSourceText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [direction, setDirection] = useState("de-en");
  const [speaking, setSpeaking] = useState(false);
  const [copiedSource, setCopiedSource] = useState(false);
  const [history, setHistory] = useState(() => {
    try { return JSON.parse(localStorage.getItem("twHistory") || "[]").slice(0, 10); } catch { return []; }
  });
  const [showHistory, setShowHistory] = useState(false);
  const panelRef = useRef(null);

  const srcLang = direction === "de-en" ? "de" : "en";
  const tgtLang = direction === "de-en" ? "en" : "de";
  const srcLabel = direction === "de-en" ? "German" : "English";
  const tgtLabel = direction === "de-en" ? "English" : "German";
  const srcFlag = direction === "de-en" ? "🇩🇪" : "🇺🇸";
  const tgtFlag = direction === "de-en" ? "🇺🇸" : "🇩🇪";
  const placeholder = direction === "de-en"
    ? "Wie sagt man das auf Englisch?"
    : "How do you say this in German?";

  const canTranslate = useMemo(() => sourceText.trim().length > 0 && !loading, [sourceText, loading]);

  /* Close on outside click */
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  /* Cleanup speech on unmount */
  useEffect(() => () => window.speechSynthesis?.cancel(), []);

  const handleTranslate = useCallback(async () => {
    const text = sourceText.trim();
    if (!text) return;
    setLoading(true);
    setErrorMsg("");
    setCopied(false);
    setSaved(false);
    try {
      const resp = await axios.post(`${API_BASE}/api/translate`, {
        source_text: text,
        source_language: srcLang,
        target_language: tgtLang,
      });
      const t = resp?.data?.translation ?? resp?.data?.translated_text ?? "";
      const result = typeof t === "string" ? t : JSON.stringify(t);
      setTranslatedText(result);
      // Save to history
      if (result) {
        setHistory(prev => {
          const entry = { src: text, tgt: result, dir: direction, ts: Date.now() };
          const next = [entry, ...prev.filter(h => h.src !== text)].slice(0, 10);
          try {
            localStorage.setItem("twHistory", JSON.stringify(next));
            // Sync translation history to backend inside study_stats
            if (isLoggedIn()) {
              const email = localStorage.getItem("email");
              const studyHistory = JSON.parse(localStorage.getItem("studyHistory") || "[]");
              const stats = {
                daily_goal: parseInt(localStorage.getItem("dailyGoal") || "5"),
                today_progress: parseInt(localStorage.getItem("todayProgress") || "0"),
                progress_date: new Date().toISOString().split("T")[0],
                study_history: studyHistory,
                translation_history: next,
              };
              axios.put(`${API_BASE}/api/user/profile`, { email, study_stats: stats }, authHeaders()).catch(() => {});
            }
          } catch {}
          return next;
        });
        setShowHistory(false);
      }
    } catch (err) {
      const status = err?.response?.status;
      const detail = err?.response?.data?.detail || "";
      if (status === 429) setErrorMsg("Rate limit reached — wait a moment and try again.");
      else if (status === 503) setErrorMsg("Translation service is starting up. Please wait a moment and retry.");
      else if (status === 504) setErrorMsg("Translation service timed out. Please try again.");
      else if (status === 502) setErrorMsg("Translation service error. Please try again shortly.");
      else if (status === 500) setErrorMsg("Server error — please try again.");
      else if (status === 422) setErrorMsg("Invalid input — please check your text.");
      else if (detail) setErrorMsg(detail);
      else if (!navigator.onLine) setErrorMsg("You appear to be offline.");
      else setErrorMsg("Could not reach translation service. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }, [sourceText, srcLang, tgtLang]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); if (canTranslate) handleTranslate(); }
    if (e.key === "Escape") setOpen(false);
  };

  const handleSwap = () => {
    setDirection(d => d === "de-en" ? "en-de" : "de-en");
    if (translatedText) { setSourceText(translatedText); setTranslatedText(sourceText); }
    setCopied(false);
    setSaved(false);
  };

  const handleCopy = async () => {
    if (!translatedText) return;
    try { await navigator.clipboard.writeText(translatedText); setCopied(true); setTimeout(() => setCopied(false), 2000); }
    catch { /* clipboard not available */ }
  };

  const handleSpeak = () => {
    if (!translatedText || !window.speechSynthesis) return;
    if (speaking) { window.speechSynthesis.cancel(); setSpeaking(false); return; }
    const utter = new SpeechSynthesisUtterance(translatedText);
    utter.lang = tgtLang === "de" ? "de-DE" : "en-US";
    utter.rate = 0.9;
    utter.onend = () => setSpeaking(false);
    utter.onerror = () => setSpeaking(false);
    setSpeaking(true);
    window.speechSynthesis.speak(utter);
  };

  /** Combined save — adds to vocab deck (localStorage) AND saves as phrase to backend */
  const handleSave = async () => {
    if (!sourceText.trim() || !translatedText) return;
    const german = direction === "de-en" ? sourceText.trim() : translatedText;
    const english = direction === "de-en" ? translatedText : sourceText.trim();

    // 1) Save to local vocab cards
    try {
      const existing = JSON.parse(localStorage.getItem("vocabCards") || "[]");
      if (!existing.some(c => c.german === german && c.english === english)) {
        const card = { id: Date.now(), german, english, context: "", mastery: 0, lastReviewed: null, created: new Date().toISOString().split("T")[0] };
        const updated = [card, ...existing];
        localStorage.setItem("vocabCards", JSON.stringify(updated));
        if (isLoggedIn()) {
          const email = localStorage.getItem("email");
          axios.put(`${API_BASE}/api/user/profile`, { email, vocab_cards: updated }, authHeaders()).catch(() => {});
        }
      }
    } catch { /* localStorage full */ }

    // 2) Save as phrase to backend
    const userEmail = localStorage.getItem("email");
    if (userEmail) {
      const citySlug = localStorage.getItem("study_abroad_city") || "";
      try {
        await axios.post(`${API_BASE}/api/phrases/quick-save`, {
          german_phrase: german, english_translation: english,
          user_email: userEmail, city_slug: citySlug,
        });
      } catch { /* already saved or error — silent */ }
    }

    setSaved(true);
  };

  const handleCopySource = async () => {
    if (!sourceText.trim()) return;
    try { await navigator.clipboard.writeText(sourceText.trim()); setCopiedSource(true); setTimeout(() => setCopiedSource(false), 1500); }
    catch { /* clipboard not available */ }
  };

  const handleSourceChange = (e) => { if (e.target.value.length <= MAX_CHARS) setSourceText(e.target.value); };

  const handleClear = () => { setSourceText(""); setTranslatedText(""); setErrorMsg(""); setCopied(false); setSaved(false); };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text && text.length <= MAX_CHARS) { setSourceText(text); setCopied(false); setSaved(false); }
    } catch { /* clipboard not available */ }
  };

  const handleSpeakSource = () => {
    if (!sourceText.trim() || !window.speechSynthesis) return;
    if (speaking) { window.speechSynthesis.cancel(); setSpeaking(false); return; }
    const utter = new SpeechSynthesisUtterance(sourceText.trim());
    utter.lang = srcLang === "de" ? "de-DE" : "en-US";
    utter.rate = 0.9;
    utter.onend = () => setSpeaking(false);
    utter.onerror = () => setSpeaking(false);
    setSpeaking(true);
    window.speechSynthesis.speak(utter);
  };

  /* Panel open/close animation state */
  const [visible, setVisible] = useState(false);
  const [animClass, setAnimClass] = useState("");
  useEffect(() => {
    if (open) { setVisible(true); setAnimClass("twSlideUp"); }
    else if (visible) {
      setAnimClass("twSlideDown");
      const t = setTimeout(() => { setVisible(false); setAnimClass(""); }, 220);
      return () => clearTimeout(t);
    }
  }, [open]);

  return (
    <div ref={panelRef} style={{
      position: "fixed", bottom: "20px", right: "20px", zIndex: 99999,
      display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px",
      pointerEvents: "none",
    }}>

      {/* ── Panel ── */}
      {visible && (
        <div style={{
          pointerEvents: "all", width: 380, background: "#fff", borderRadius: "20px",
          border: "1px solid rgba(0,33,165,0.08)",
          boxShadow: "0 24px 64px rgba(0,33,165,0.12), 0 8px 24px rgba(0,0,0,0.08)",
          overflow: "hidden", animation: `${animClass} 0.25s cubic-bezier(0.16,1,0.3,1) forwards`,
        }}>

          {/* Header */}
          <div style={{
            background: "linear-gradient(135deg, #0021A5 0%, #003087 60%, #001a6e 100%)",
            padding: "14px 18px 12px", display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{
                width: 32, height: 32, borderRadius: "10px",
                background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px",
              }}>🌐</div>
              <div>
                <div style={{ fontSize: "13px", fontWeight: 700, color: "#fff", letterSpacing: "-0.01em" }}>Quick Translate</div>
                <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.55)", fontWeight: 500 }}>Powered by LibreTranslate</div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} style={{
              background: "rgba(255,255,255,0.12)", border: "none", borderRadius: "8px",
              width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: "rgba(255,255,255,0.7)", fontSize: "16px", transition: "all 0.15s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.2)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.12)"}
            >×</button>
          </div>

          {/* Language selector bar */}
          <div style={{
            display: "flex", alignItems: "center", padding: "0",
            borderBottom: "1px solid #F3F4F6", background: "#FAFBFC",
          }}>
            <div style={{ flex: 1, textAlign: "center", padding: "10px 0", fontSize: "12px", fontWeight: 700, color: "#0021A5", borderBottom: "2px solid #0021A5" }}>
              {srcFlag} {srcLabel}
            </div>
            <button onClick={handleSwap} title="Swap languages" style={{
              background: "#fff", border: "1px solid #E5E7EB", borderRadius: "50%",
              width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", fontSize: "13px", color: "#6B7280",
              boxShadow: "0 1px 4px rgba(0,0,0,0.06)", transition: "all 0.2s",
              flexShrink: 0, margin: "0 -4px", zIndex: 1, position: "relative",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "#0021A5"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#0021A5"; e.currentTarget.style.transform = "rotate(180deg)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#6B7280"; e.currentTarget.style.borderColor = "#E5E7EB"; e.currentTarget.style.transform = "rotate(0)"; }}
            >⇄</button>
            <div style={{ flex: 1, textAlign: "center", padding: "10px 0", fontSize: "12px", fontWeight: 700, color: "#6B7280" }}>
              {tgtFlag} {tgtLabel}
            </div>
          </div>

          {/* Body */}
          <div style={{ padding: "14px 16px 12px" }}>

            {/* History toggle + clear */}
            {history.length > 0 && (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                <button onClick={() => setShowHistory(v => !v)} style={{
                  display: "flex", alignItems: "center", gap: "4px",
                  background: "none", border: "none", padding: "2px 0",
                  fontSize: "11px", fontWeight: 600, color: "#6B7280", cursor: "pointer",
                  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                }}>
                  <span style={{ fontSize: "12px" }}>🕑</span>
                  {showHistory ? "Hide History" : `Recent (${history.length})`}
                </button>
                {showHistory && (
                  <button onClick={() => { setHistory([]); localStorage.removeItem("twHistory"); setShowHistory(false); }} style={{
                    background: "none", border: "none", fontSize: "10px", color: "#9CA3AF",
                    cursor: "pointer", padding: "2px 4px", fontWeight: 500,
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = "#DC2626"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = "#9CA3AF"; }}
                  >Clear all</button>
                )}
              </div>
            )}

            {/* History dropdown */}
            {showHistory && history.length > 0 && (
              <div style={{
                marginBottom: "10px", maxHeight: 140, overflowY: "auto",
                borderRadius: "10px", border: "1px solid #E5E7EB", background: "#FAFBFC",
              }}>
                {history.map((h, i) => (
                  <div key={i} onClick={() => {
                    setDirection(h.dir);
                    setSourceText(h.src);
                    setTranslatedText(h.tgt);
                    setShowHistory(false);
                    setCopied(false);
                    setSaved(false);
                  }} style={{
                    padding: "8px 12px", cursor: "pointer",
                    borderBottom: i < history.length - 1 ? "1px solid #F3F4F6" : "none",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#EFF6FF"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
                  >
                    <div style={{ fontSize: "11px", fontWeight: 600, color: "#111827", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {h.dir === "de-en" ? "🇩🇪" : "🇺🇸"} {h.src}
                    </div>
                    <div style={{ fontSize: "10px", color: "#6B7280", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginTop: "1px" }}>
                      → {h.tgt}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Source input */}
            <div style={{ position: "relative", marginBottom: "10px" }}>
              <textarea
                value={sourceText}
                onChange={handleSourceChange}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                rows={3}
                style={{
                  width: "100%", padding: "12px 14px", paddingBottom: "28px",
                  borderRadius: "12px", border: "1.5px solid #E5E7EB",
                  fontSize: "14px", lineHeight: 1.5, resize: "vertical", boxSizing: "border-box",
                  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                  color: "#111827", background: "#fff",
                  transition: "border-color 0.2s, box-shadow 0.2s", outline: "none",
                }}
                onFocus={e => { e.target.style.borderColor = "#0021A5"; e.target.style.boxShadow = "0 0 0 3px rgba(0,33,165,0.08)"; }}
                onBlur={e => { e.target.style.borderColor = "#E5E7EB"; e.target.style.boxShadow = "none"; }}
              />
              {/* Bottom actions */}
              <div style={{
                position: "absolute", bottom: "8px", left: "14px", right: "14px",
                display: "flex", alignItems: "center", justifyContent: "flex-end",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  {!sourceText && (
                    <button onClick={handlePaste} style={{
                      background: "none", border: "none", padding: "2px 6px",
                      fontSize: "10px", color: "#6B7280", cursor: "pointer",
                      fontWeight: 600, borderRadius: "4px", transition: "all 0.15s",
                      display: "flex", alignItems: "center", gap: "3px",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color = "#0021A5"; e.currentTarget.style.background = "#EFF6FF"; }}
                    onMouseLeave={e => { e.currentTarget.style.color = "#6B7280"; e.currentTarget.style.background = "none"; }}
                    >📋 Paste</button>
                  )}
                  {sourceText && (
                    <button onClick={handleCopySource} style={{
                      background: "none", border: "none", padding: "2px 6px",
                      fontSize: "10px", color: copiedSource ? "#059669" : "#6B7280", cursor: "pointer",
                      fontWeight: 600, borderRadius: "4px", transition: "all 0.15s",
                    }}
                    onMouseEnter={e => { if (!copiedSource) { e.currentTarget.style.color = "#0021A5"; e.currentTarget.style.background = "#EFF6FF"; }}}
                    onMouseLeave={e => { if (!copiedSource) { e.currentTarget.style.color = "#6B7280"; e.currentTarget.style.background = "none"; }}}
                    >{copiedSource ? "✓" : "📋"}</button>
                  )}
                  {sourceText && (
                    <button onClick={handleSpeakSource} style={{
                      background: "none", border: "none", padding: "2px 6px",
                      fontSize: "10px", color: speaking ? "#2563EB" : "#6B7280", cursor: "pointer",
                      fontWeight: 600, borderRadius: "4px", transition: "all 0.15s",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color = "#0021A5"; e.currentTarget.style.background = "#EFF6FF"; }}
                    onMouseLeave={e => { e.currentTarget.style.color = speaking ? "#2563EB" : "#6B7280"; e.currentTarget.style.background = "none"; }}
                    >{speaking ? "■ Stop" : "🔊 Hear"}</button>
                  )}
                  {sourceText && (
                    <button onClick={handleClear} style={{
                      background: "none", border: "none", padding: "2px 6px",
                      fontSize: "10px", color: "#9CA3AF", cursor: "pointer",
                      fontWeight: 600, borderRadius: "4px", transition: "all 0.15s",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color = "#DC2626"; e.currentTarget.style.background = "#FEF2F2"; }}
                    onMouseLeave={e => { e.currentTarget.style.color = "#9CA3AF"; e.currentTarget.style.background = "none"; }}
                    >Clear</button>
                  )}
                </div>
              </div>
            </div>

            {/* Translate button */}
            <button onClick={handleTranslate} disabled={!canTranslate}
              style={{
                width: "100%", padding: "11px", borderRadius: "12px", border: "none",
                background: canTranslate ? "linear-gradient(135deg, #FA4616 0%, #FF6B35 100%)" : "#F3F4F6",
                color: canTranslate ? "#fff" : "#9CA3AF",
                fontWeight: 700, fontSize: "13px", letterSpacing: "0.02em",
                cursor: canTranslate ? "pointer" : "not-allowed",
                boxShadow: canTranslate ? "0 4px 16px rgba(250,70,22,0.3)" : "none",
                transition: "all 0.25s cubic-bezier(0.16,1,0.3,1)",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
              }}
              onMouseEnter={e => { if (canTranslate) { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(250,70,22,0.35)"; }}}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = canTranslate ? "0 4px 16px rgba(250,70,22,0.3)" : "none"; }}
            >
              {loading ? (
                <><span style={{ display: "inline-block", width: 14, height: 14, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "twSpin 0.6s linear infinite" }}/> Translating…</>
              ) : (
                <>Translate{canTranslate ? " ↵" : ""}</>
              )}
            </button>

            {/* Error */}
            {errorMsg && (
              <div style={{
                marginTop: "8px", padding: "10px 12px", borderRadius: "10px",
                background: "#FEF2F2", border: "1px solid #FECACA",
                color: "#991B1B", fontSize: "12px", lineHeight: 1.4,
              }}>{errorMsg}</div>
            )}

            {/* Translation output */}
            {translatedText && (
              <div style={{ marginTop: "10px" }}>
                <div style={{
                  padding: "12px 14px", borderRadius: "12px",
                  background: "#fff",
                  border: "1.5px solid #BFDBFE",
                  fontSize: "14px", lineHeight: 1.5, color: "#1E3A8A", fontWeight: 500,
                  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                  maxHeight: 150, overflowY: "auto", whiteSpace: "pre-wrap", wordBreak: "break-word",
                  boxShadow: "0 0 0 3px rgba(0,33,165,0.04)",
                }}>{translatedText}</div>

                {/* Action buttons — minimal style, matching source area */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", gap: "2px", marginTop: "6px", paddingLeft: "2px" }}>
                  <button onClick={handleCopy} title="Copy to clipboard"
                    style={{ ...actionBtnBase, color: copied ? "#059669" : "#6B7280" }}
                    onMouseEnter={e => { if (!copied) { e.currentTarget.style.color = "#0021A5"; e.currentTarget.style.background = "#EFF6FF"; }}}
                    onMouseLeave={e => { if (!copied) { e.currentTarget.style.color = "#6B7280"; e.currentTarget.style.background = "none"; }}}
                  >{copied ? "✓ Copied" : "📋 Copy"}</button>
                  <button onClick={handleSpeak} title="Listen to pronunciation"
                    style={{ ...actionBtnBase, color: speaking ? "#2563EB" : "#6B7280" }}
                    onMouseEnter={e => { if (!speaking) { e.currentTarget.style.color = "#0021A5"; e.currentTarget.style.background = "#EFF6FF"; }}}
                    onMouseLeave={e => { if (!speaking) { e.currentTarget.style.color = "#6B7280"; e.currentTarget.style.background = "none"; }}}
                  >{speaking ? "■ Stop" : "🔊 Listen"}</button>
                  <button onClick={handleSave} title="Save to vocabulary & phrases"
                    style={{ ...actionBtnBase, color: saved ? "#059669" : "#6B7280" }}
                    onMouseEnter={e => { if (!saved) { e.currentTarget.style.color = "#0021A5"; e.currentTarget.style.background = "#EFF6FF"; }}}
                    onMouseLeave={e => { if (!saved) { e.currentTarget.style.color = "#6B7280"; e.currentTarget.style.background = "none"; }}}
                  >{saved ? "✓ Saved" : "📌 Save"}</button>
                </div>

                {/* Hint */}
                <p style={{ margin: "6px 0 0", fontSize: "10px", color: "#9CA3AF", textAlign: "center" }}>
                  Press <kbd style={{ padding: "1px 4px", borderRadius: "3px", background: "#F3F4F6", fontSize: "9px", fontWeight: 600, border: "1px solid #E5E7EB" }}>Enter</kbd> to translate · <kbd style={{ padding: "1px 4px", borderRadius: "3px", background: "#F3F4F6", fontSize: "9px", fontWeight: 600, border: "1px solid #E5E7EB" }}>Esc</kbd> to close
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── FAB Button ── */}
      <button
        onClick={() => { setOpen(v => !v); setErrorMsg(""); }}
        style={{
          pointerEvents: "all",
          background: open
            ? "#374151"
            : "linear-gradient(135deg, #0021A5 0%, #003087 100%)",
          color: "#fff", border: "none", borderRadius: "14px",
          padding: "0 16px", height: 42,
          fontWeight: 600, fontSize: "12px", cursor: "pointer",
          boxShadow: open
            ? "0 4px 14px rgba(0,0,0,0.2)"
            : "0 6px 22px rgba(0,33,165,0.3), 0 0 0 1px rgba(0,33,165,0.06)",
          letterSpacing: "0.01em",
          display: "flex", alignItems: "center", gap: "6px",
          transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
          animation: open ? "none" : "twPulse 3s ease-in-out infinite",
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px) scale(1.02)"; }}
        onMouseLeave={e => { e.currentTarget.style.transform = "none"; }}
      >
        <span style={{
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          width: 20, height: 20, borderRadius: "6px",
          background: "rgba(255,255,255,0.15)", fontSize: "12px",
          transition: "transform 0.3s", transform: open ? "rotate(45deg)" : "none",
        }}>
          {open ? "✕" : "🌐"}
        </span>
        {open ? "Close" : "Translate"}
      </button>

      {/* Animations */}
      <style>{`
        @keyframes twSlideUp { from { opacity: 0; transform: translateY(12px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes twSlideDown { from { opacity: 1; transform: translateY(0) scale(1); } to { opacity: 0; transform: translateY(10px) scale(0.97); } }
        @keyframes twSpin { to { transform: rotate(360deg); } }
        @keyframes twPulse { 0%,100%{box-shadow:0 8px 28px rgba(0,33,165,0.35), 0 0 0 0 rgba(0,33,165,0.3)} 50%{box-shadow:0 8px 28px rgba(0,33,165,0.35), 0 0 0 8px rgba(0,33,165,0)} }
      `}</style>
    </div>
  );
}