// src/pages/SqlFormatter.jsx

import React, { useState, useEffect } from 'react';
import { format as formatSql } from 'sql-formatter';

// SQL Formatter 옵션 설정
const defaultOptions = {
    language: 'sql',
    indent: '  ',             // 2 spaces
    keywordCase: 'upper',     // 키워드를 대문자로
    linesBetweenQueries: 1,
};

// 미리보기용 샘플 SQL (WHERE 조건 2개 추가)
// 미리보기용 샘플 SQL (모든 줄바꿈 및 들여쓰기 제거)
const sampleSql = `SELECT u.id, u.name, orders_summary.total_orders, o.order_date, o.total_amount FROM users u JOIN ( SELECT user_id, COUNT(*) AS total_orders FROM orders GROUP BY user_id ) orders_summary ON u.id = orders_summary.user_id JOIN orders o ON u.id = o.user_id WHERE u.status = 'active' AND o.total_amount > 100 AND o.order_date >= '2025-01-01' ORDER BY orders_summary.total_orders DESC;`;

// 스타일 정의
const containerStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px',
    padding: '16px',
    backgroundColor: '#fff',
    borderRadius: '16px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
};

const panelStyle = {
    display: 'flex',
    flexDirection: 'column',
    padding: '8px',
};

const headingStyle = {
    fontSize: '1.125rem',
    fontWeight: 500,
    marginBottom: '8px',
};

const textareaStyle = {
    width: '100%',
    height: '320px',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontFamily: 'monospace',
    resize: 'none',
};

const outputStyle = {
    ...textareaStyle,
    backgroundColor: '#f9fafb',
};

export default function SqlFormatter() {
    const [input, setInput] = useState(sampleSql);
    const [output, setOutput] = useState('');

    // 컴포넌트 마운트 시 샘플 SQL 포맷 적용
    useEffect(() => {
        setOutput(formatSql(sampleSql, defaultOptions));
    }, []);

    const handleChange = (e) => {
        const value = e.target.value;
        setInput(value);
        try {
            setOutput(formatSql(value, defaultOptions));
        } catch (err) {
            setOutput(`Error: ${err.message}`);
        }
    };

    return (
        <div style={containerStyle}>
            <div style={panelStyle}>
                <h2 style={headingStyle}>소스 SQL</h2>
                <textarea
                    style={textareaStyle}
                    placeholder="여기에 SQL을 입력하세요..."
                    value={input}
                    onChange={handleChange}
                />
            </div>
            <div style={panelStyle}>
                <h2 style={headingStyle}>포맷된 SQL</h2>
                <textarea
                    style={outputStyle}
                    placeholder="포맷된 SQL이 여기에 표시됩니다."
                    value={output}
                    readOnly
                />
            </div>
        </div>
    );
}
