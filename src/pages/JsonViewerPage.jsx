// src/pages/JsonViewerPage.jsx

import React, { useState } from 'react';
import JsonViewer from '../components/JsonViewer';

const sampleJson = {
    name: "John Doe",
    age: 30,
    hobbies: ["reading", "gaming", "hiking"],
    address: {
        street: "123 Main St",
        city: "Somewhere",
        zip: "12345"
    },
    isActive: true
};

const JsonViewerPage = () => {
    const [inputValue, setInputValue] = useState(JSON.stringify(sampleJson, null, 2));
    const [jsonData, setJsonData] = useState(sampleJson);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const text = e.target.value;
        setInputValue(text);
        try {
            const parsed = JSON.parse(text);
            setJsonData(parsed);
            setError(null);
        } catch (err) {
            setJsonData(null);
            setError(err.message);
        }
    };

    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: '1rem' }}>🧾 JSON Viewer</h1>
            <div style={{ display: 'flex', flex: 1, gap: '1rem', padding: '0 1rem 1rem', minHeight: 0 }}>
                <div style={{ flex: 3, display: 'flex', flexDirection: 'column' }}>
                    <textarea
                        style={{
                            flex: 1,
                            minHeight: '300px',
                            padding: '0.5rem',
                            border: error ? '1px solid red' : '1px solid #ccc',
                            borderRadius: '4px',
                            fontFamily: 'monospace',
                            resize: 'none'
                        }}
                        placeholder="Paste your JSON here..."
                        value={inputValue}
                        onChange={handleChange}
                    />
                    {error && (
                        <div style={{ color: 'white', backgroundColor: 'red', padding: '0.5rem', borderRadius: '4px', marginTop: '0.5rem' }}>
                            <strong>JSON Error:</strong> {error}
                        </div>
                    )}
                </div>
                <div style={{
                    flex: 7,
                    overflow: 'auto',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    padding: '0.5rem'
                }}>
                    {jsonData && <JsonViewer data={jsonData} />}
                </div>
            </div>
        </div>
    );
};

export default JsonViewerPage;
