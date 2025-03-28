// src/pages/LadderSetup.jsx
import React, { useState } from 'react';
import LadderGame from './LadderGame';

export default function LadderSetup() {
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
          <button onClick={handleAdd} disabled={inputNames.length >= 10}>➕ 추가</button>
          <button onClick={handleRemove} disabled={inputNames.length <= 3}>➖ 제거</button>
          <button
            onClick={() => setStep(2)}
            disabled={inputNames.some(n => !n) || inputResults.some(r => !r)}
          >
            ▶️ 다음
          </button>
        </div>
      </div>
    );
  }

  return <LadderGame participants={inputNames} results={inputResults} />;
}

