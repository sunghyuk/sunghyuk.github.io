// src/pages/LadderSetup.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default function LadderSetup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [inputNames, setInputNames] = useState(["", "", ""]);
  const [inputResults, setInputResults] = useState(["", "", ""]);

  const handleNameChange = (index, value) => {
    const updated = [...inputNames];
    updated[index] = value;
    setInputNames(updated);
  };

  const handleResultChange = (index, value) => {
    const updated = [...inputResults];
    updated[index] = value;
    setInputResults(updated);
  };

  const handleAdd = () => {
    if (inputNames.length < 10) {
      setInputNames([...inputNames, ""]);
      setInputResults([...inputResults, ""]);
    }
  };

  const handleRemove = () => {
    if (inputNames.length > 3) {
      setInputNames(inputNames.slice(0, -1));
      setInputResults(inputResults.slice(0, -1));
    }
  };

  if (step === 1) {
    return (
      <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
        <h2>참가자 및 결과 입력</h2>
        <p>참가자 이름과 결과를 입력하세요 (3~10명)</p>

        {inputNames.map((name, idx) => (
          <div key={idx} style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem' }}>
            <input
              placeholder={`참가자 ${idx + 1}`}
              value={name}
              onChange={e => handleNameChange(idx, e.target.value)}
              style={{ flex: 1 }}
            />
            <input
              placeholder={`결과 ${idx + 1}`}
              value={inputResults[idx]}
              onChange={e => handleResultChange(idx, e.target.value)}
              style={{ flex: 1 }}
            />
          </div>
        ))}

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <button onClick={() => {
            const count = inputNames.length;
            const randomNames = Array.from({ length: count }, (_, i) => `참가자${i + 1}`);
            const randomResults = Array.from({ length: count }, (_, i) => `${i + 1}등`);
            setInputNames(randomNames);
            setInputResults(randomResults);
          }}>🎲 랜덤 채우기</button>
          <button onClick={handleAdd} disabled={inputNames.length >= 10}>➕ 추가</button>
          <button onClick={handleRemove} disabled={inputNames.length <= 3}>➖ 제거</button>
          <button
            onClick={() =>
              navigate('/ladder/game', {
                state: { participants: inputNames, results: shuffle([...inputResults]) },
              })
            }
            disabled={inputNames.some(n => !n) || inputResults.some(r => !r)}
          >
            ▶️ 다음
          </button>
        </div>
      </div>
    );
  }

  return null;
}



