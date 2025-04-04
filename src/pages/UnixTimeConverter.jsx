// src/pages/UnixTimeConverter.jsx

import React, { useState, useEffect } from 'react';

export default function UnixTimeConverter() {
    const [dateInput, setDateInput] = useState('');
    const [timestampInput, setTimestampInput] = useState('');
    const [convertedTimestamp, setConvertedTimestamp] = useState('');
    const [convertedDate, setConvertedDate] = useState('');
    const [timezone, setTimezone] = useState('local'); // 'local' or 'utc'
    const [format, setFormat] = useState('iso'); // 'iso' | 'local' | 'utcString'

    useEffect(() => {
        const now = new Date();
        const isoTime = toDatetimeLocalString(now);
        setDateInput(isoTime);
        setConvertedTimestamp(Math.floor(now.getTime() / 1000).toString());
        setTimestampInput(Math.floor(now.getTime() / 1000).toString());
        setConvertedDate(formatDate(now));
    }, [timezone, format]);

    const toDatetimeLocalString = (date) => {
        const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
        return local.toISOString().slice(0, 16);
    };

    const formatDate = (date) => {
        switch (format) {
            case 'local':
                return date.toLocaleString();
            case 'utcString':
                return date.toUTCString();
            case 'iso':
            default:
                return date.toISOString();
        }
    };

    const parseDateInput = (value) => {
        if (timezone === 'utc') {
            return new Date(value);
        } else {
            const local = new Date(value);
            const adjusted = new Date(local.getTime() + local.getTimezoneOffset() * 60000);
            return adjusted;
        }
    };

    const handleDateChange = (e) => {
        const value = e.target.value;
        setDateInput(value);
        const date = parseDateInput(value);
        if (!isNaN(date.getTime())) {
            setConvertedTimestamp(Math.floor(date.getTime() / 1000).toString());
        } else {
            setConvertedTimestamp('Invalid date');
        }
    };

    const handleTimestampChange = (e) => {
        const value = e.target.value.trim();
        setTimestampInput(value);
        const timestamp = parseInt(value, 10);
        if (!isNaN(timestamp)) {
            const date = value.length > 10
                ? new Date(timestamp) // milliseconds
                : new Date(timestamp * 1000); // seconds
            setConvertedDate(formatDate(date));
            setDateInput(toDatetimeLocalString(date));
        } else {
            setConvertedDate('Invalid timestamp');
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2>Unix Epoch Time Converter</h2>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                <label>
                    <strong>Timezone:</strong>{' '}
                    <select value={timezone} onChange={(e) => setTimezone(e.target.value)} style={{ padding: '0.5rem', minWidth: '120px' }}>
                        <option value="local">Local</option>
                        <option value="utc">UTC</option>
                    </select>
                </label>
                <label>
                    <strong>Format:</strong>{' '}
                    <select value={format} onChange={(e) => setFormat(e.target.value)} style={{ padding: '0.5rem', minWidth: '150px' }}>
                        <option value="iso">ISO 8601</option>
                        <option value="local">Locale String</option>
                        <option value="utcString">UTC String</option>
                    </select>
                </label>
            </div>

            <div style={{ marginBottom: '2rem' }}>
                <label>
                    <strong>Date → Unix Timestamp</strong><br />
                    <input
                        type="datetime-local"
                        value={dateInput}
                        onChange={handleDateChange}
                        style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
                    />
                </label>
                <p>Result: <code>{convertedTimestamp}</code></p>
            </div>

            <div>
                <label>
                    <strong>Unix Timestamp → Date</strong><br />
                    <input
                        type="text"
                        value={timestampInput}
                        onChange={handleTimestampChange}
                        placeholder="e.g. 1712217363 or 1712217363123"
                        style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
                    />
                </label>
                <p>Result: <code>{convertedDate}</code></p>
                <p>Detected Unit: <code>{timestampInput.length > 10 ? 'milliseconds' : 'seconds'}</code></p>
            </div>
        </div>
    );
}
