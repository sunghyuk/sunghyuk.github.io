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

const JsonNode = ({ data, level = 0, expandAll = false, collapseAll = false, onCopy, path = '$' }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [toast, setToast] = useState(null);

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
    const paddingLeft = level * 16;
    const childPaddingLeft = (level + 1) * 16;

    return (
        <div style={{ fontFamily: 'monospace', lineHeight: '1.4' }}>
            <div
                onClick={() => setCollapsed(!collapsed)}
                style={{ cursor: 'pointer', color: '#3b82f6', fontWeight: 'bold', paddingLeft: `${paddingLeft}px` }}
            >
                {collapsed ? `▸ ${bracketOpen}...${bracketClose}` : `▾ ${bracketOpen}`}
            </div>
            {!collapsed && (
                <div style={{ paddingLeft: `${childPaddingLeft}px` }}>
                    {entries.map(([key, value], index) => {
                        const currentPath = isArray ? `${path}[${key}]` : `${path}.${key}`;
                        const valueIsObject = isObject(value);
                        const isLast = index === lastIndex;

                        return (
                            <div key={index}>
                                {!isArray && (
                                    <span style={{ display: 'inline-block', marginRight: 6 }}>
                                        <span
                                            style={{ color: '#8b5cf6', cursor: onCopy ? 'pointer' : 'default' }}
                                            onClick={() => handleCopy(key)}
                                        >
                                            &quot;{key}&quot;:
                                        </span>
                                        <span
                                            title={`Copy path: ${currentPath}`}
                                            style={{ color: '#999', marginLeft: 6, fontSize: '0.75rem', cursor: 'pointer' }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleCopy(currentPath);
                                            }}
                                        >
                                            ⓘ
                                        </span>
                                    </span>
                                )}
                                <span>
                                    {valueIsObject ? (
                                        <JsonNode
                                            data={value}
                                            level={level + 1}
                                            expandAll={expandAll}
                                            collapseAll={collapseAll}
                                            onCopy={onCopy}
                                            path={currentPath}
                                        />
                                    ) : (
                                        <span
                                            style={{ color: '#16a34a', cursor: onCopy ? 'pointer' : 'default' }}
                                            onClick={() => handleCopy(renderValue(value))}
                                        >
                                            {renderValue(value)}
                                        </span>
                                    )}
                                    {!isLast && <span>,</span>}
                                </span>
                            </div>
                        );
                    })}
                </div>
            )}
            {!collapsed && (
                <div style={{ paddingLeft: `${paddingLeft}px` }}>{bracketClose}</div>
            )}
            {toast && <Toast message={toast} />}
        </div>
    );
};

export default JsonNode;