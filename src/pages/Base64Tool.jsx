// src/pages/Base64Tool.jsx

import React, { useState, useEffect } from 'react';

export default function Base64Tool() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [includePadding, setIncludePadding] = useState(true);
    const [toast, setToast] = useState('');

    const handleEncode = () => {
        try {
            let encoded = btoa(
                new Uint8Array(new TextEncoder().encode(input))
                    .reduce((data, byte) => data + String.fromCharCode(byte), '')
            );
            if (!includePadding) {
                encoded = encoded.replace(/=+$/, '');
            }
            setOutput(encoded);
        } catch (err) {
            setOutput('⚠️ 인코딩 중 오류가 발생했습니다.');
        }
    };

    const handleDecode = () => {
        try {
            let base64 = input;
            if (!includePadding) {
                const padLength = (4 - (input.length % 4)) % 4;
                base64 += '='.repeat(padLength);
            }
            const binary = atob(base64);
            const bytes = new Uint8Array([...binary].map(char => char.charCodeAt(0)));
            const decoded = new TextDecoder().decode(bytes);
            setOutput(decoded);
        } catch (err) {
            setOutput('⚠️ 디코딩 중 오류가 발생했습니다.');
        }
    };

    const handleSwap = () => {
        setInput(output);
        setOutput(input);
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(output);
            setToast('✅ 결과가 클립보드에 복사되었습니다.');
        } catch (err) {
            setToast('⚠️ 클립보드 복사에 실패했습니다.');
        }
    };

    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => setToast(''), 3000);
            return () => clearTimeout(timer);
        }
    }, [toast]);

    return (
        <div style={{ maxWidth: 600, margin: '0 auto', position: 'relative' }}>
            <h2>🔐 Base64 인코딩 / 디코딩 도구</h2>

            <div style={{ marginBottom: '1rem' }}>
                <label>
                    <strong>입력:</strong>
                </label>
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    rows={4}
                    style={{ width: '100%' }}
                />
            </div>

            <div style={{ marginBottom: '1rem' }}>
                <label>
                    <input
                        type="checkbox"
                        checked={includePadding}
                        onChange={() => setIncludePadding(!includePadding)}
                        style={{ marginRight: '0.5rem' }}
                    />
                    패딩 문자 포함 ("=")
                </label>
            </div>

            <div style={{ marginBottom: '1rem' }}>
                <button onClick={handleEncode}>인코딩</button>
                <button onClick={handleDecode} style={{ marginLeft: '0.5rem' }}>디코딩</button>
                <button onClick={handleSwap} style={{ marginLeft: '0.5rem' }}>입력↔결과 교환</button>
                <button onClick={handleCopy} style={{ marginLeft: '0.5rem' }}>📋 복사</button>
            </div>

            <div style={{ marginTop: '1rem' }}>
                <label>
                    <strong>결과:</strong>
                </label>
                <textarea value={output} readOnly rows={4} style={{ width: '100%' }} />
            </div>

            {toast && (
                <div style={{
                    position: 'fixed',
                    bottom: '2rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: '#333',
                    color: '#fff',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '8px',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                    zIndex: 1000
                }}>
                    {toast}
                </div>
            )}
        </div>
    );
}
