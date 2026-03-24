"use client"

import { Challenge } from "@/app/dashboard/page";
import { useRouter } from "next/navigation";

export default function ChallengeCard({ challenge }: { challenge: Challenge }) {
	const today = new Date()
  const start = new Date(challenge.startDate);
  const end = new Date(challenge.endDate);
  const totalDays = Math.round(
    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
  );
  const daysPassed = Math.round(
    (Date.now() - start.getTime()) / (1000 * 60 * 60 * 24),
  );

  const progress = Math.min(Math.max((daysPassed / totalDays) * 100, 0), 100);
	const datePassed = end.getTime() < today.getTime()

	const router = useRouter();

	const handleClick = () => {
		router.push(`/challenges/${challenge.id}`)
	}

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .challenge-card {
          position: relative;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 2px;
          padding: 28px;
          font-family: 'DM Sans', sans-serif;
          transition: border-color 0.2s, transform 0.2s;
          overflow: hidden;
          cursor: pointer;
        }

        .challenge-card:hover {
          border-color: rgba(255, 214, 0, 0.25);
          transform: translateY(-2px);
        }

        .challenge-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, #ffd600, transparent);
          opacity: 0;
          transition: opacity 0.2s;
        }

        .challenge-card:hover::before {
          opacity: 1;
        }

        .card-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 16px;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 3px 8px;
          border-radius: 2px;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .status-active {
          background: rgba(255, 214, 0, 0.1);
          border: 1px solid rgba(255, 214, 0, 0.2);
          color: #ffd600;
        }

        .status-completed {
          background: rgba(80, 255, 150, 0.1);
          border: 1px solid rgba(80, 255, 150, 0.2);
          color: #50ff96;
        }

        .status-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: currentColor;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        .day-count {
          font-family: 'Syne', sans-serif;
          font-size: 11px;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.2);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .card-title {
          font-family: 'Syne', sans-serif;
          font-size: 20px;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: -0.01em;
          margin-bottom: 8px;
          line-height: 1.2;
        }

        .card-goal {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.5);
          font-weight: 400;
          margin-bottom: 6px;
          line-height: 1.5;
        }

        .card-description {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.3);
          font-weight: 300;
          margin-bottom: 24px;
          line-height: 1.6;
        }

        .progress-section {
          margin-top: auto;
        }

        .progress-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .progress-label {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.25);
        }

        .progress-pct {
          font-family: 'Syne', sans-serif;
          font-size: 12px;
          font-weight: 700;
          color: #ffd600;
        }

        .progress-bar-bg {
          width: 100%;
          height: 3px;
          background: rgba(255, 255, 255, 0.06);
          border-radius: 2px;
          overflow: hidden;
        }

        .progress-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #ffd600, #ffaa00);
          border-radius: 2px;
          transition: width 0.6s ease;
        }

        .card-dates {
          display: flex;
          gap: 16px;
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .date-item {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .date-label {
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.2);
        }

        .date-value {
          font-family: 'Syne', sans-serif;
          font-size: 12px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.5);
        }
      `}</style>

      <div className="challenge-card" onClick={handleClick}>
        <div className="card-top">
          <span
            className={`status-badge ${challenge.completed || datePassed ? "status-completed" : "status-active"}`}
          >
            <span className="status-dot" />
            {challenge.completed || datePassed ? "Finished" : "Active"}
          </span>
          <span className="day-count">{totalDays} days</span>
        </div>

        <h2 className="card-title">{challenge.title}</h2>

        <div className="progress-section">
          <div className="progress-header">
            <span className="progress-label">Progress</span>
            <span className="progress-pct">{Math.round(progress)}%</span>
          </div>
          <div className="progress-bar-bg">
            <div
              className="progress-bar-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="card-dates">
          <div className="date-item">
            <span className="date-label">Start</span>
            <span className="date-value">
              {start.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
          <div className="date-item">
            <span className="date-label">End</span>
            <span className="date-value">
              {end.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
