// src/components/JsonNode.jsx
import React, { useState, useEffect } from 'react';

const isObject = val => typeof val === 'object' && val !== null;

const renderValue = (val) => {
    if (typeof val === 'string') return `"${val}"`;
    if (typeof val === 'number' || typeof val === 'boolean') return String(val);
    if (val === null) return 'null';
    return JSON.stringify(val);
};

const Toast = ({ message }) => (
    <div style={{
        position: 'fixed',
        bottom: '1rem',
        right: '1rem',
        backgroundColor: '#333',
        color: '#fff',
        padding: '0.5rem 1rem',
        borderRadius: '4px',
        fontSize: '0.875rem',
        zIndex: 9999,
        boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
    }}>
        {message}
    </div>
);

const JsonNode = ({ data, level, expandAll = false, collapseAll = false, onCopy }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [toast, setToast] = useState(null);
    const indent = level * 16;

    useEffect(() => {
        if (expandAll) setCollapsed(false);
        if (collapseAll) setCollapsed(true);
    }, [expandAll, collapseAll]);

    const handleCopy = (text) => {
        if (onCopy) onCopy(text);
        setToast(`Copied: ${text}`);
        setTimeout(() => setToast(null), 1500);
    };

    if (!isObject(data)) {
        return (
            <span
                style={{ color: '#16a34a', cursor: onCopy ? 'pointer' : 'default' }}
                onClick={() => handleCopy(renderValue(data))}
            >
                {renderValue(data)}
                {toast && <Toast message={toast} />}
            </span>
        );
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
                                    <span
                                        style={{ color: '#8b5cf6', cursor: onCopy ? 'pointer' : 'default' }}
                                        onClick={() => handleCopy(key)}
                                    >
                                        &quot;{key}&quot;:
                                    </span>
                                )}
                                <div style={{ marginLeft: 4 }}>
                                    {isObject(value) ? (
                                        <JsonNode
                                            data={value}
                                            level={level + 1}
                                            expandAll={expandAll}
                                            collapseAll={collapseAll}
                                            onCopy={onCopy}
                                        />
                                    ) : (
                                        <span
                                            style={{ color: '#16a34a', cursor: onCopy ? 'pointer' : 'default' }}
                                            onClick={() => handleCopy(renderValue(value))}
                                        >
                                            {renderValue(value)}
                                        </span>
                                    )}
                                    {index < lastIndex ? <span>,</span> : null}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div>{bracketClose}</div>
                </div>
            )}
            {toast && <Toast message={toast} />}
        </div>
    );
};

export default JsonNode;
