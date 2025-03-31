// src/components/JsonNode.jsx
import React, { useState, useEffect } from 'react';

const isObject = val => typeof val === 'object' && val !== null;

const renderValue = (val) => {
    if (typeof val === 'string') return <span style={{ color: '#16a34a' }}>&quot;{val}&quot;</span>;
    if (typeof val === 'number') return <span style={{ color: '#2563eb' }}>{val}</span>;
    if (typeof val === 'boolean') return <span style={{ color: '#d97706' }}>{val.toString()}</span>;
    if (val === null) return <span style={{ color: '#6b7280' }}>null</span>;
    return <span>{JSON.stringify(val)}</span>;
};

const JsonNode = ({ data, level, expandAll = false, collapseAll = false }) => {
    const [collapsed, setCollapsed] = useState(false);
    const indent = level * 16;

    useEffect(() => {
        if (expandAll) setCollapsed(false);
        if (collapseAll) setCollapsed(true);
    }, [expandAll, collapseAll]);

    if (!isObject(data)) {
        return <span>{renderValue(data)}</span>;
    }

    const entries = Array.isArray(data)
        ? data.map((val, i) => [i, val])
        : Object.entries(data);

    const isArray = Array.isArray(data);
    const bracketOpen = isArray ? '[' : '{';
    const bracketClose = isArray ? ']' : '}';
    const lastIndex = entries.length - 1;

    return (
        <div style={{ fontFamily: 'monospace', lineHeight: '1.6' }}>
            <div
                onClick={() => setCollapsed(!collapsed)}
                style={{ cursor: 'pointer', color: '#3b82f6', fontWeight: 'bold', marginLeft: indent }}
            >
                {collapsed ? `▸ ${bracketOpen}...${bracketClose}` : `▾`}
            </div>
            {!collapsed && (
                <div style={{ marginLeft: indent }}>
                    <div>{bracketOpen}</div>
                    <div style={{ marginLeft: 16 }}>
                        {entries.map(([key, value], index) => (
                            <div key={index} style={{ display: 'flex' }}>
                                {!isArray && (
                                    <span style={{ color: '#8b5cf6' }}>&quot;{key}&quot;: </span>
                                )}
                                <div>
                                    {isObject(value) ? (
                                        <JsonNode data={value} level={level + 1} expandAll={expandAll} collapseAll={collapseAll} />
                                    ) : (
                                        renderValue(value)
                                    )}
                                    {index < lastIndex ? <span>,</span> : null}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div>
                        {bracketClose}
                    </div>
                </div>
            )}
        </div>
    );
};

export default JsonNode;
