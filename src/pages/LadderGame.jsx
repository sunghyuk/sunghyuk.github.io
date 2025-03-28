// src/pages/LadderGame.jsx
import React, { useState, useEffect } from 'react';

export default function LadderGame() {
  const participants = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const [ladder, setLadder] = useState(generateLadder(participants.length));
  const [path, setPath] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [results, setResults] = useState(shuffle([...Array(participants.length).keys()].map(n => `${n + 1}등`)));
  const [revealedIndexes, setRevealedIndexes] = useState(new Set());
  const [history, setHistory] = useState([]);

  const ladderHeight = 400;
  const columnWidth = 60;

  useEffect(() => {
    if (path.length > 1 && currentStep < path.length - 1) {
      const timer = setTimeout(() => setCurrentStep(prev => prev + 1), 50);
      return () => clearTimeout(timer);
    } else if (path.length > 1 && currentStep === path.length - 1) {
      const endX = path[path.length - 1].x;
      const index = Math.round(endX / columnWidth - 0.5);
      setTimeout(() => {
        setRevealedIndexes(prev => new Set(prev).add(index));
        const name = participants.find((_, i) => path[0].x === i * columnWidth + columnWidth / 2);
        setHistory(prev => {
          if (prev.some(entry => entry.name === name)) return prev;
          const updated = [...prev, { name, result: results[index] }];
          return updated.sort((a, b) => a.name.localeCompare(b.name));
        });
      }, 300);
    }
  }, [path, currentStep]);

  const handleStart = (index) => {
    const computed = computePath(index, ladder);
    setPath(computed);
    setCurrentStep(0);
  };

  return (
    <div>
      <h1>🪜 Ladder Game</h1>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', alignItems: 'flex-start' }}>
        <div>
          <div style={{ position: 'relative', height: '2rem', width: participants.length * columnWidth, margin: '0 auto' }}>
            {participants.map((name, idx) => (
              <div
                key={idx}
                style={{
                  position: 'absolute',
                  left: idx * columnWidth,
                  width: columnWidth,
                  textAlign: 'center',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
                onClick={() => handleStart(idx)}
              >
                {name}
              </div>
            ))}
          </div>

          <div style={{ position: 'relative', height: ladderHeight + 40, width: participants.length * columnWidth }}
          >
            {/* 세로줄 */}
            {participants.map((_, idx) => (
              <div
                key={idx}
                style={{
                  position: 'absolute',
                  left: idx * columnWidth + columnWidth / 2,
                  top: 0,
                  width: 2,
                  height: ladderHeight,
                  background: 'black'
                }}
              />
            ))}

            {/* 가로줄 */}
            {ladder.map((line, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  top: `${(line.pos / 20) * ladderHeight}px`,
                  left: line.y * columnWidth + columnWidth / 2,
                  width: columnWidth,
                  height: 2,
                  background: 'black'
                }}
              />
            ))}

            {/* 애니메이션 선 */}
            {path.length > 1 && (
              <svg
                width={participants.length * columnWidth}
                height={ladderHeight}
                style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
              >
                <polyline
                  points={path.slice(0, currentStep + 1).map(p => `${p.x},${p.y}`).join(' ')}
                  fill="none"
                  stroke="red"
                  strokeWidth={3}
                  strokeLinejoin="round"
                />
              </svg>
            )}

            {/* 결과 표시 */}
            <div
              style={{
                position: 'absolute',
                top: ladderHeight + 10,
                left: 0,
                width: '100%',
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              {participants.map((_, idx) => (
                <div
                  key={idx}
                  style={{ width: columnWidth, textAlign: 'center' }}
                >
                  {revealedIndexes.has(idx) ? results[idx] : "?"}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 결과 표 항상 공간 차지 */}
        <div style={{ minWidth: '200px' }}>
          <table style={{ borderCollapse: 'collapse', fontSize: '1rem', minWidth: '180px', boxShadow: '0 0 6px #ccc' }}>
            <thead>
              <tr>
                <th style={{ borderBottom: '2px solid #ccc', padding: '0.5rem', background: '#f8f8f8' }}>참가자</th>
                <th style={{ borderBottom: '2px solid #ccc', padding: '0.5rem', background: '#f8f8f8' }}>결과</th>
              </tr>
            </thead>
            <tbody>
              {history.length > 0 ? (
                history.map((item, idx) => (
                  <tr key={idx}>
                    <td style={{ borderBottom: '1px solid #eee', padding: '0.5rem' }}>{item.name}</td>
                    <td style={{ borderBottom: '1px solid #eee', padding: '0.5rem' }}>{item.result}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2} style={{ padding: '0.5rem', textAlign: 'center', color: '#aaa' }}>결과 없음</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap', marginTop: '2rem' }}>
        <button onClick={() => {
          setLadder(generateLadder(participants.length));
          setPath([]);
          setCurrentStep(0);
          setResults(shuffle([...Array(participants.length).keys()].map(n => `${n + 1}등`)));
          setHistory([]);
          setRevealedIndexes(new Set());
        }}>
          🔄 Regenerate Ladder
        </button>
      </div>
    </div>
  );
}

function computePath(startIndex, ladder) {
  const ladderHeight = 400;
  const columnWidth = 60;
  const steps = [];
  let x = startIndex;
  const ladderMap = [...ladder].sort((a, b) => a.pos - b.pos);
  const heightSteps = 20;

  for (let i = 0; i <= heightSteps; i++) {
    const y = (i / heightSteps) * ladderHeight;
    steps.push({ x: x * columnWidth + columnWidth / 2, y });

    const matched = ladderMap.find(l => l.pos === i && l.y === x);
    const back = ladderMap.find(l => l.pos === i && l.y === x - 1);

    if (matched) {
      steps.push({ x: (x + 1) * columnWidth + columnWidth / 2, y });
      x += 1;
    } else if (back) {
      steps.push({ x: (x - 1) * columnWidth + columnWidth / 2, y });
      x -= 1;
    }
  }

  steps.push({ x: x * columnWidth + columnWidth / 2, y: ladderHeight });
  return steps;
}

function generateLadder(cols) {
  const lines = [];
  const taken = new Set();
  const heightSteps = 20;
  const usedByHeight = Array.from({ length: cols - 1 }, () => new Set());

  for (let y = 0; y < cols - 1; y++) {
    const minRungs = 3;
    const maxRungs = cols - 2;
    const target = Math.floor(Math.random() * (maxRungs - minRungs + 1)) + minRungs;
    let count = 0;
    let attempts = 0;
    while (count < target && attempts < 200) {
      const pos = Math.floor(Math.random() * (heightSteps - 1)) + 1;
      const key = `${y}-${pos}`;
      const left = `${y - 1}-${pos}`;
      const right = `${y + 1}-${pos}`;
      if (!taken.has(key) && !taken.has(left) && !taken.has(right) && !usedByHeight[y].has(pos)) {
        taken.add(key);
        usedByHeight[y].add(pos);
        lines.push({ y, pos });
        count++;
      }
      attempts++;
    }
  }

  return lines;
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

