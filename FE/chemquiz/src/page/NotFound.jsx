import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  const [count, setCount] = useState(5);

  useEffect(() => {
    if (count === 0) {
      navigate("/");
      return;
    }
    const t = setTimeout(() => setCount((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [count, navigate]);

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.code}>404</div>
        <h1 style={styles.title}>Trang không tồn tại</h1>
        <p style={styles.desc}>
          Đường dẫn bạn truy cập không hợp lệ hoặc đã bị xóa.
        </p>

        <div style={styles.countdown}>
          <svg viewBox="0 0 48 48" width="64" height="64">
            <circle cx="24" cy="24" r="20" fill="none" stroke="#e2e8f0" strokeWidth="4" />
            <circle
              cx="24" cy="24" r="20"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="4"
              strokeDasharray={`${(count / 5) * 125.6} 125.6`}
              strokeLinecap="round"
              transform="rotate(-90 24 24)"
              style={{ transition: "stroke-dasharray .9s linear" }}
            />
            <text x="24" y="29" textAnchor="middle" fontSize="16" fontWeight="700" fill="#1e293b">
              {count}
            </text>
          </svg>
          <p style={styles.countText}>Tự chuyển về trang chủ sau {count}s</p>
        </div>

        <button style={styles.btn} onClick={() => navigate("/")}>
          ← Về trang chủ ngay
        </button>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f0f4ff 0%, #e8f0fe 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Segoe UI', sans-serif",
    padding: "20px",
  },
  card: {
    background: "#fff",
    borderRadius: "20px",
    padding: "48px 40px",
    maxWidth: "420px",
    width: "100%",
    textAlign: "center",
    boxShadow: "0 20px 60px rgba(0,0,0,.1)",
    animation: "fadeUp .5s ease",
  },
  code: {
    fontSize: "80px",
    fontWeight: "900",
    color: "#3b82f6",
    lineHeight: 1,
    letterSpacing: "-4px",
    marginBottom: "8px",
  },
  title: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: "10px",
  },
  desc: {
    color: "#64748b",
    fontSize: "15px",
    lineHeight: "1.6",
    marginBottom: "28px",
  },
  countdown: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
    marginBottom: "28px",
  },
  countText: {
    color: "#94a3b8",
    fontSize: "13px",
  },
  btn: {
    background: "#3b82f6",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    padding: "12px 28px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background .15s",
    width: "100%",
  },
};