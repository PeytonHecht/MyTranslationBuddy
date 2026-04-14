import React from "react";

/* ══════════════════════════════════════════════════════
   Shared Loading Spinners, Skeleton Screens & Empty States
   ═══════════════════════════════════════════════════════ */

/** Branded spinner — used as the primary loading indicator */
export const Spinner = ({ size = 40, color = "#0021A5", accent = "#FA4616", label }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem" }}>
    <div style={{
      width: size, height: size, borderRadius: "50%",
      border: `3px solid ${color}20`,
      borderTopColor: color,
      borderRightColor: accent,
      animation: "mtbSpin 0.8s linear infinite",
    }} />
    {label && <p style={{ color: "#6B7280", fontSize: "0.85rem", fontWeight: 500, margin: 0 }}>{label}</p>}
  </div>
);

/** Full-page centered spinner */
export const PageSpinner = ({ label = "Loading…" }) => (
  <div style={{
    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
    minHeight: "60vh", gap: "1rem",
  }}>
    <Spinner size={44} label={label} />
  </div>
);

/** Inline section spinner (smaller, for within cards) */
export const InlineSpinner = ({ label }) => (
  <div style={{
    display: "flex", alignItems: "center", justifyContent: "center",
    padding: "2.5rem 1rem", gap: "0.75rem",
  }}>
    <Spinner size={28} label={label} />
  </div>
);

/* ── Skeleton building blocks ─────────────────────────── */
const shimmerKeyframes = `
@keyframes mtbShimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
`;

// Inject shimmer animation once
if (typeof document !== "undefined") {
  const id = "mtb-shimmer-anim";
  if (!document.getElementById(id)) {
    const el = document.createElement("style");
    el.id = id;
    el.textContent = shimmerKeyframes + `@keyframes mtbSpin{to{transform:rotate(360deg)}}`;
    document.head.appendChild(el);
  }
}

const shimmerBg = {
  background: "linear-gradient(90deg, #F3F4F6 25%, #E5E7EB 50%, #F3F4F6 75%)",
  backgroundSize: "200% 100%",
  animation: "mtbShimmer 1.5s ease-in-out infinite",
};

/** A single skeleton line */
export const SkeletonLine = ({ width = "100%", height = 14, radius = 6, style: extraStyle }) => (
  <div style={{
    width, height, borderRadius: radius, ...shimmerBg, ...extraStyle,
  }} />
);

/** A skeleton block (for cards, images, etc.) */
export const SkeletonBlock = ({ width = "100%", height = 120, radius = 12, style: extraStyle }) => (
  <div style={{
    width, height, borderRadius: radius, ...shimmerBg, ...extraStyle,
  }} />
);

/** Skeleton card — mimics an event/phrase card shape */
export const SkeletonCard = ({ imageHeight = 140, lines = 3 }) => (
  <div style={{
    backgroundColor: "#fff", borderRadius: "1rem", overflow: "hidden",
    border: "1px solid #E5E7EB",
  }}>
    <SkeletonBlock height={imageHeight} radius={0} />
    <div style={{ padding: "0.85rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <SkeletonLine width="75%" height={16} />
      {lines >= 2 && <SkeletonLine width="50%" height={12} />}
      {lines >= 3 && (
        <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.25rem" }}>
          <SkeletonLine width={60} height={10} radius={9999} />
          <SkeletonLine width={80} height={10} radius={9999} />
        </div>
      )}
    </div>
  </div>
);

/** Skeleton row — mimics a list item (icon + text) */
export const SkeletonRow = () => (
  <div style={{
    display: "flex", alignItems: "center", gap: "0.75rem",
    padding: "0.75rem 1rem", backgroundColor: "#fff", borderRadius: "0.65rem",
    border: "1px solid #F3F4F6",
  }}>
    <SkeletonBlock width={40} height={40} radius={8} />
    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.35rem" }}>
      <SkeletonLine width="60%" height={14} />
      <SkeletonLine width="40%" height={10} />
    </div>
  </div>
);

/* ── Skeleton grids for different views ──────────────── */

/** Events page skeleton (2-col grid of event cards) */
export const EventGridSkeleton = ({ count = 6 }) => (
  <div style={{
    display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem",
  }}>
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i} imageHeight={155} lines={3} />
    ))}
  </div>
);

/** City grid skeleton (Explore page) */
export const CityGridSkeleton = ({ count = 12 }) => (
  <div style={{
    display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "0.85rem",
  }}>
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i} imageHeight={120} lines={2} />
    ))}
  </div>
);

/** Phrase list skeleton */
export const PhraseListSkeleton = ({ count = 4 }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} style={{
        backgroundColor: "#fff", borderRadius: "0.75rem", padding: "1.15rem",
        border: "1px solid #E5E7EB", borderLeft: "3px solid #E5E7EB",
        display: "flex", flexDirection: "column", gap: "0.5rem",
      }}>
        <SkeletonLine width="30%" height={10} radius={9999} />
        <SkeletonLine width="65%" height={18} />
        <SkeletonLine width="55%" height={14} />
        <SkeletonLine width="80%" height={11} />
        <div style={{ display: "flex", gap: "0.35rem" }}>
          <SkeletonLine width={50} height={10} radius={9999} />
          <SkeletonLine width={40} height={10} radius={9999} />
        </div>
      </div>
    ))}
  </div>
);

/** Profile skeleton */
export const ProfileSkeleton = () => (
  <div style={{ maxWidth: 900, margin: "2rem auto", padding: "0 1.5rem" }}>
    {/* Hero banner skeleton */}
    <SkeletonBlock height={160} radius={24} style={{ marginBottom: "1.5rem" }} />
    {/* Tabs */}
    <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.25rem" }}>
      <SkeletonLine width={100} height={36} radius={8} />
      <SkeletonLine width={80} height={36} radius={8} />
      <SkeletonLine width={90} height={36} radius={8} />
    </div>
    {/* Content cards */}
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
      <SkeletonBlock height={200} radius={16} />
      <SkeletonBlock height={200} radius={16} />
    </div>
  </div>
);

/** Vocab card skeleton grid */
export const VocabGridSkeleton = ({ count = 4 }) => (
  <div style={{
    display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "0.75rem",
  }}>
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} style={{
        backgroundColor: "#fff", borderRadius: "0.65rem", padding: "1rem",
        border: "1px solid #E5E7EB", display: "flex", flexDirection: "column", gap: "0.5rem",
      }}>
        <SkeletonLine width="55%" height={16} />
        <SkeletonLine width="45%" height={13} />
        <SkeletonLine width="70%" height={10} />
        <div style={{ display: "flex", gap: "2px", marginTop: "0.25rem" }}>
          {[1, 2, 3, 4, 5].map(i => (
            <SkeletonBlock key={i} width={11} height={11} radius={2} />
          ))}
        </div>
      </div>
    ))}
  </div>
);

/* ── Empty state templates ────────────────────────────── */

/**
 * Generic empty state — icon, title, description, optional action button.
 * Consistent look across all pages.
 */
export const EmptyState = ({ icon, title, description, actionLabel, onAction, style: extraStyle }) => (
  <div style={{
    display: "flex", flexDirection: "column", alignItems: "center",
    padding: "2.5rem 1.5rem", textAlign: "center",
    backgroundColor: "#fff", borderRadius: "0.75rem",
    border: "1px dashed #CBD5E1",
    ...extraStyle,
  }}>
    {icon && <div style={{ marginBottom: "0.65rem", color: "#D1D5DB" }}>{icon}</div>}
    {title && <p style={{ fontSize: "0.95rem", fontWeight: 600, color: "#334155", margin: "0 0 0.25rem" }}>{title}</p>}
    {description && <p style={{ fontSize: "0.82rem", color: "#94A3B8", margin: 0, maxWidth: 360, lineHeight: 1.5 }}>{description}</p>}
    {actionLabel && onAction && (
      <button onClick={onAction} style={{
        display: "inline-flex", alignItems: "center", gap: "0.35rem",
        padding: "0.55rem 1.15rem", borderRadius: "0.5rem",
        border: "none", background: "#0021A5", color: "#fff",
        cursor: "pointer", fontSize: "0.82rem", fontWeight: 600,
        marginTop: "0.85rem", boxShadow: "0 2px 8px rgba(0,33,165,0.18)",
      }}>
        {actionLabel}
      </button>
    )}
  </div>
);

/** Error state — red-tinted for failures */
export const ErrorState = ({ message = "Something went wrong.", onRetry, retryLabel = "Try Again" }) => (
  <div style={{
    display: "flex", flexDirection: "column", alignItems: "center",
    padding: "2rem 1.5rem", textAlign: "center",
    backgroundColor: "#FEF2F2", borderRadius: "0.75rem",
    border: "1px solid #FECACA",
  }}>
    <div style={{
      width: 48, height: 48, borderRadius: "50%", background: "#FEE2E2",
      display: "flex", alignItems: "center", justifyContent: "center",
      marginBottom: "0.75rem", fontSize: "1.25rem",
    }}>⚠️</div>
    <p style={{ fontSize: "0.92rem", fontWeight: 600, color: "#991B1B", margin: "0 0 0.25rem" }}>{message}</p>
    <p style={{ fontSize: "0.78rem", color: "#B91C1C", margin: 0, lineHeight: 1.5 }}>
      Please check your connection and try again.
    </p>
    {onRetry && (
      <button onClick={onRetry} style={{
        display: "inline-flex", alignItems: "center", gap: "0.35rem",
        padding: "0.5rem 1.1rem", borderRadius: "0.5rem",
        border: "1px solid #FECACA", background: "#fff", color: "#DC2626",
        cursor: "pointer", fontSize: "0.82rem", fontWeight: 600, marginTop: "0.85rem",
      }}>
        {retryLabel}
      </button>
    )}
  </div>
);
