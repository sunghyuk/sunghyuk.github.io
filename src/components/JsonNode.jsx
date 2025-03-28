// src/components/JsonNode.jsx
import React, { useState } from 'react';

const isObject = val => typeof val === 'object' && val !== null;

const renderValue = (val) => {
    if (typeof val === 'string') return <span style={{ color: '#16a34a' }}>&quot;{val}&quot;</span>;
    if (typeof val === 'number') return <span style={{ color: '#2563eb' }}>{val}</span>;
    if (typeof val === 'boolean') return <span style={{ color: '#d97706' }}>{val.toString()}</span>;
    if (val === null) return <span style={{ color: '#6b7280' }}>null</span>;
    return <span>{JSON.stringify(val)}</span>;
};

const JsonNode = ({ data, level }) => {
    const [collapsed, setCollapsed] = useState(false);
    const indent = level * 16; // px

    if (!isObject(data)) {
        return (
            <span>{renderValue(data)}</span>
        );
    }

    const entries = Object.entries(data);
    const isArray = Array.isArray(data);
    const bracketOpen = isArray ? '[' : '{';
    const bracketClose = isArray ? ']' : '}';

    return (
        <div style={{ fontFamily: 'monospace', lineHeight: '1.6' }}>
            <div
                onClick={() => setCollapsed(!collapsed)}
                style={{ cursor: 'pointer', color: '#3b82f6', fontWeight: 'bold', marginLeft: indent }}
            >
                {collapsed ? `▸ ${bracketOpen}...${bracketClose}` : `▾ ${bracketOpen}`}
            </div>
            {!collapsed && (
                <div style={{ marginLeft: indent + 16 }}>
                    {isArray ? (
                        entries.map(([_, value], index) => (
                            <div key={index} style={{ display: 'inline' }}>
                                <JsonNode data={value} level={level + 1} />{index < entries.length - 1 ? ', ' : ''}
                            </div>
                        ))
                    ) : (
                        entries.map(([key, value], index) => (
                            <div key={index}>
                                <span style={{ color: '#8b5cf6' }}>&quot;{key}&quot;: </span>
                                {isObject(value) ? (
                                    <JsonNode data={value} level={level + 1} />
                                ) : (
                                    renderValue(value)
                                )}
                                {index < entries.length - 1 ? ',' : ''}
                            </div>
                        ))
                    )}
                    <span>{bracketClose}</span>
                </div>
            )}
        </div>
    );
};

export default JsonNode;
