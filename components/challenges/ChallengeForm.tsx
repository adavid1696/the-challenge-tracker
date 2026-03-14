"use client";

import { useState } from "react";
import MyDatePicker from "../ui/DatePicker";
import { type DateRange } from "react-day-picker";
import { useRouter } from "next/navigation";

export default function ChallengeForm({ userId }: { userId: string }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [goal, setGoal] = useState("");
  const [range, setRange] = useState<DateRange>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const data = await fetch("/api/challenges", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        goal,
        startDate: range?.from,
        endDate: range?.to,
        userId,
      }),
    });

    if (data.ok) {
      router.push("/dashboard");
    } else {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .challenge-root {
          min-height: 100vh;
          background: #0a0a0a;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'DM Sans', sans-serif;
          position: relative;
          overflow: hidden;
          padding: 40px 20px;
        }

        .bg-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
        }

        .bg-glow {
          position: absolute;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255, 214, 0, 0.06) 0%, transparent 70%);
          top: -100px;
          right: -100px;
          pointer-events: none;
        }

        .bg-glow-2 {
          position: absolute;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255, 100, 50, 0.04) 0%, transparent 70%);
          bottom: -50px;
          left: -100px;
          pointer-events: none;
        }

        .card {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 560px;
          padding: 48px 40px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 2px;
          backdrop-filter: blur(12px);
          animation: fadeUp 0.6s ease forwards;
          opacity: 0;
          transform: translateY(20px);
        }

        @keyframes fadeUp {
          to { opacity: 1; transform: translateY(0); }
        }

        .day-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 214, 0, 0.1);
          border: 1px solid rgba(255, 214, 0, 0.2);
          border-radius: 2px;
          padding: 4px 10px;
          margin-bottom: 24px;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #ffd600;
        }

        .dot {
          width: 6px;
          height: 6px;
          background: #ffd600;
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        .title {
          font-family: 'Syne', sans-serif;
          font-size: 36px;
          font-weight: 800;
          color: #ffffff;
          line-height: 1.1;
          margin-bottom: 8px;
          letter-spacing: -0.02em;
        }

        .title span {
          color: #ffd600;
        }

        .subtitle {
          font-size: 14px;
          color: rgba(255,255,255,0.4);
          font-weight: 300;
          margin-bottom: 36px;
          line-height: 1.5;
        }

        .field {
          margin-bottom: 16px;
        }

        .field label {
          display: block;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          margin-bottom: 8px;
        }

        .field input,
        .field textarea {
          width: 100%;
          padding: 12px 16px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 2px;
          color: #ffffff;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 400;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
          resize: none;
        }

        .field textarea {
          height: 80px;
        }

        .field input::placeholder,
        .field textarea::placeholder {
          color: rgba(255,255,255,0.2);
        }

        .field input:focus,
        .field textarea:focus {
          border-color: rgba(255, 214, 0, 0.4);
          background: rgba(255,255,255,0.06);
        }

        .divider {
          height: 1px;
          background: rgba(255,255,255,0.06);
          margin: 24px 0;
        }

        .section-label {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          margin-bottom: 12px;
        }

        .date-wrapper {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 2px;
          padding: 16px;
          margin-bottom: 24px;
        }

        .error-msg {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 14px;
          background: rgba(255, 80, 80, 0.08);
          border: 1px solid rgba(255, 80, 80, 0.2);
          border-radius: 2px;
          color: #ff6b6b;
          font-size: 13px;
          margin-bottom: 16px;
        }

        .submit-btn {
          width: 100%;
          padding: 14px;
          background: #ffd600;
          border: none;
          border-radius: 2px;
          color: #0a0a0a;
          font-family: 'Syne', sans-serif;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          cursor: pointer;
          margin-top: 8px;
          transition: background 0.2s, transform 0.1s, opacity 0.2s;
        }

        .submit-btn:hover:not(:disabled) {
          background: #ffe033;
          transform: translateY(-1px);
        }

        .submit-btn:active:not(:disabled) {
          transform: translateY(0);
        }

        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .loading-dots {
          display: inline-flex;
          gap: 4px;
          align-items: center;
        }

        .loading-dots span {
          width: 4px;
          height: 4px;
          background: #0a0a0a;
          border-radius: 50%;
          animation: bounce 0.8s ease-in-out infinite;
        }

        .loading-dots span:nth-child(2) { animation-delay: 0.15s; }
        .loading-dots span:nth-child(3) { animation-delay: 0.3s; }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }

        .counter {
          position: absolute;
          top: 40px;
          right: 40px;
          font-family: 'Syne', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.15);
          text-transform: uppercase;
        }

        /* Override DayPicker styles to match dark theme */

        .date-wrapper {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 2px;
          padding: 16px;
          margin-bottom: 24px;
          display: flex;
          justify-content: center;
        } 
          .date-wrapper * {
          color: #ffffff !important;
        }
              
        .date-wrapper button:hover {
          background: rgba(255, 214, 0, 0.15) !important;
        }
              
        .date-wrapper [data-selected] {
          background: #ffd600 !important;
          color: #0a0a0a !important;
        }
              
        .date-wrapper [data-in-range] {
          background: rgba(255, 214, 0, 0.15) !important;
        }
        
      `}</style>

      <div className="challenge-root">
        <div className="bg-grid" />
        <div className="bg-glow" />
        <div className="bg-glow-2" />

        <div className="card">
          <div className="counter">30 Day Tracker</div>

          <div className="day-badge">
            <div className="dot" />
            New Challenge
          </div>

          <h1 className="title">
            Define Your
            <br />
            <span>Challenge.</span>
          </h1>
          <p className="subtitle">Commit to 30 days. Track every step.</p>

          <form onSubmit={handleSubmit}>
            <div className="field">
              <label>Challenge Title</label>
              <input
                type="text"
                name="title"
                placeholder="30 Day Push Up Challenge"
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="field">
              <label>Description</label>
              <textarea
                name="description"
                placeholder="What is this challenge about?"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="field">
              <label>Goal</label>
              <input
                type="text"
                name="goal"
                placeholder="Complete 100 push ups every day"
                onChange={(e) => setGoal(e.target.value)}
                required
              />
            </div>

            <div className="divider" />

            <p className="section-label">Select Date Range</p>
            <div className="date-wrapper">
              <MyDatePicker range={range} setRange={setRange} />
            </div>

            {error && (
              <div className="error-msg">
                <span>⚠</span> {error}
              </div>
            )}

            <button className="submit-btn" disabled={loading}>
              {loading ? (
                <span className="loading-dots">
                  <span />
                  <span />
                  <span />
                </span>
              ) : (
                "Create Challenge →"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
