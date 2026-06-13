import React from "react";

const getHealthColor = (score) => {
  if (score <= 3) return "health-score-red";
  if (score <= 7) return "health-score-yellow";
  return "health-score-green";
};

const getHealthLabel = (score) => {
  if (score <= 3) return "Unhealthy";
  if (score <= 7) return "Moderate";
  return "Healthy";
};

const getHealthBg = (score) => {
  if (score <= 3) return "rgba(239, 71, 111, 0.12)";
  if (score <= 7) return "rgba(255, 209, 102, 0.12)";
  return "rgba(6, 214, 160, 0.12)";
};

const getHealthBorder = (score) => {
  if (score <= 3) return "rgba(239, 71, 111, 0.3)";
  if (score <= 7) return "rgba(255, 209, 102, 0.3)";
  return "rgba(6, 214, 160, 0.3)";
};

const HealthBadge = ({ score, showLabel = false }) => {
  const colorClass = getHealthColor(score);
  const bg = getHealthBg(score);
  const border = getHealthBorder(score);
  const label = getHealthLabel(score);

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        background: bg,
        border: `1px solid ${border}`,
        borderRadius: "50px",
        padding: "3px 10px",
        fontSize: "0.78rem",
        fontWeight: 700,
      }}
    >
      <span>🌿</span>
      <span className={colorClass}>{score}/10</span>
      {showLabel && <span style={{ color: "var(--text-muted)", fontWeight: 500 }}>{label}</span>}
    </div>
  );
};

export default HealthBadge;
export { getHealthColor, getHealthLabel };
