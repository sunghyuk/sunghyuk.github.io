// src/components/JsonViewer.jsx
import React, { useState } from 'react';
import JsonNode from './JsonNode';

const JsonViewer = ({ data }) => {
    const [expandAll, setExpandAll] = useState(false);
    const [collapseAll, setCollapseAll] = useState(false);

    const handleExpand = () => {
        setExpandAll(true);
        setCollapseAll(false);
        setTimeout(() => setExpandAll(false), 0);
    };

    const handleCollapse = () => {
        setCollapseAll(true);
        setExpandAll(false);
        setTimeout(() => setCollapseAll(false), 0);
    };

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            console.log('Copied:', text);
        });
    };

    return (
        <div style={{ fontFamily: 'monospace', fontSize: '14px' }}>
            <div style={{ marginBottom: '0.5rem' }}>
                <button onClick={handleExpand} style={{ marginRight: '0.5rem' }}>Expand All</button>
                <button onClick={handleCollapse} style={{ marginRight: '0.5rem' }}>Collapse All</button>
            </div>
            <JsonNode
                data={data}
                level={0}
                expandAll={expandAll}
                collapseAll={collapseAll}
                onCopy={handleCopy}
            />
        </div>
    );
};

export default JsonViewer;
