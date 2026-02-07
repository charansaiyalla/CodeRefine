import { useEffect, useState } from 'react';
import '../styles/speedometer.css';

export default function Speedometer({ score }) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    // Animate score from 0 to actual score
    let currentScore = 0;
    const targetScore = Math.min(Math.max(score, 0), 100); // Clamp between 0-100
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = targetScore / steps;
    const stepDuration = duration / steps;

    const timer = setInterval(() => {
      currentScore += increment;
      if (currentScore >= targetScore) {
        currentScore = targetScore;
        clearInterval(timer);
      }
      setAnimatedScore(Math.round(currentScore));
    }, stepDuration);

    return () => clearInterval(timer);
  }, [score]);

  // Calculate needle rotation (-90deg to 90deg)
  const rotation = (animatedScore / 100) * 180 - 90;

  // Get color based on score
  const getScoreColor = (score) => {
    if (score >= 80) return '#10b981'; // Green
    if (score >= 60) return '#f59e0b'; // Orange
    if (score >= 40) return '#f97316'; // Deep orange
    return '#ef4444'; // Red
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Needs Work';
  };

  const scoreColor = getScoreColor(animatedScore);

  return (
    <div className="speedometer-container">
      <div className="speedometer">
        {/* Background arc */}
        <svg className="speedometer-svg" viewBox="0 0 200 120">
          {/* Background arc */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="#1e293b"
            strokeWidth="20"
            strokeLinecap="round"
          />
          
          {/* Colored progress arc */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke={scoreColor}
            strokeWidth="20"
            strokeLinecap="round"
            strokeDasharray={`${(animatedScore / 100) * 251.2} 251.2`}
            className="progress-arc"
          />

          {/* Tick marks */}
          {[0, 20, 40, 60, 80, 100].map((tick) => {
            const angle = (tick / 100) * 180 - 90;
            const radian = (angle * Math.PI) / 180;
            const x1 = 100 + 70 * Math.cos(radian);
            const y1 = 100 + 70 * Math.sin(radian);
            const x2 = 100 + 80 * Math.cos(radian);
            const y2 = 100 + 80 * Math.sin(radian);
            
            return (
              <g key={tick}>
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#475569"
                  strokeWidth="2"
                />
                <text
                  x={100 + 90 * Math.cos(radian)}
                  y={100 + 90 * Math.sin(radian)}
                  fill="#64748b"
                  fontSize="10"
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  {tick}
                </text>
              </g>
            );
          })}

          {/* Needle */}
          <g className="needle" style={{ transform: `rotate(${rotation}deg)`, transformOrigin: '100px 100px' }}>
            <line
              x1="100"
              y1="100"
              x2="100"
              y2="35"
              stroke={scoreColor}
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle cx="100" cy="100" r="6" fill={scoreColor} />
            <circle cx="100" cy="100" r="3" fill="#0f172a" />
          </g>
        </svg>

        {/* Score display */}
        <div className="score-display">
          <div className="score-number" style={{ color: scoreColor }}>
            {animatedScore}
          </div>
          <div className="score-label" style={{ color: scoreColor }}>
            {getScoreLabel(animatedScore)}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="speedometer-legend">
        <div className="legend-item">
          <span className="legend-dot" style={{ background: '#ef4444' }}></span>
          <span>0-40 Needs Work</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot" style={{ background: '#f59e0b' }}></span>
          <span>40-60 Fair</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot" style={{ background: '#f59e0b' }}></span>
          <span>60-80 Good</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot" style={{ background: '#10b981' }}></span>
          <span>80-100 Excellent</span>
        </div>
      </div>
    </div>
  );
}