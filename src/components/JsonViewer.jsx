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

    return (
        <div style={{ fontFamily: 'monospace', fontSize: '14px' }}>
            <div style={{ marginBottom: '0.5rem' }}>
                <button onClick={handleExpand} style={{ marginRight: '0.5rem' }}>Expand All</button>
                <button onClick={handleCollapse}>Collapse All</button>
            </div>
            <JsonNode data={data} level={0} expandAll={expandAll} collapseAll={collapseAll} />
        </div>
    );
};

export default JsonViewer;
