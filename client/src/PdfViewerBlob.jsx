import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Viewer from './viewer';

const PdfViewerBlob = () => {
    const [pdfUrl, setPdfUrl] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPdf = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/pdf');
                if (response.data.base64) {
                    const binaryString = window.atob(response.data.base64);
                    const len = binaryString.length;
                    const bytes = new Uint8Array(len);
                    for (let i = 0; i < len; i++) {
                        bytes[i] = binaryString.charCodeAt(i);
                    }
                    const blob = new Blob([bytes], { type: 'application/pdf' });
                    const url = URL.createObjectURL(blob);
                    setPdfUrl(url);
                } else {
                    setError('No PDF data received');
                }
            } catch (err) {
                console.error('Error fetching PDF:', err);
                setError('Failed to fetch PDF');
            } finally {
                setLoading(false);
            }
        };

        fetchPdf();

        // Cleanup function to revoke object URL
        return () => {
            if (pdfUrl) {
                URL.revokeObjectURL(pdfUrl);
            }
        };
    }, []);

    if (loading) return <div>Loading PDF...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div style={{ height: '100vh', width: '100%' }}>
            {pdfUrl ? (
                <Viewer url={pdfUrl} />
            ) : (
                <div>No PDF to display</div>
            )}
        </div>
    );
};

export default PdfViewerBlob;
