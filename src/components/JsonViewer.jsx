// src/components/JsonViewer.jsx
import React from 'react';
import JsonNode from './JsonNode';

const JsonViewer = ({ data }) => {
    return (
        <div style={{ fontFamily: 'monospace', fontSize: '14px' }}>
            <JsonNode data={data} level={0} />
        </div>
    );
};

export default JsonViewer;
