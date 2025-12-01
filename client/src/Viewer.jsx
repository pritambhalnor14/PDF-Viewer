import React from 'react';

export default function Viewer({ url, fileName }) {
    return (
        <div style={{ width: '70vw', height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#e0e0e0' }}>
            {/* <div style={{ padding: '10px', textAlign: 'right' }}>
                <a href={url} target="_blank" rel="noopener noreferrer" style={{ padding: '8px 16px', backgroundColor: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>
                    Open PDF in New Tab
                </a>
            </div>
            <div style={{ flex: 1, position: 'relative' }}> */}
            {url ? (
                <object
                    data={`/viewer.html?file=${encodeURIComponent(url)}&fileName=${encodeURIComponent(fileName || 'document.pdf')}`}
                    type="text/html"
                    width="100%"
                    height="100%"
                    style={{ display: 'block' }}
                >
                    <div style={{ padding: '20px', textAlign: 'center' }}>
                        <p>Unable to display PDF viewer.</p>
                        <a href={url} download={fileName || "document.pdf"} style={{ color: 'blue', textDecoration: 'underline' }}>Download PDF</a>
                    </div>
                </object>
            ) : (
                <div>No PDF to display</div>
            )}
            {/* </div> */}
        </div>
    );
}
