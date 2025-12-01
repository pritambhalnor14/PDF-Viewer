import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PdfViewer = () => {
    const [pdfData, setPdfData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPdf = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/pdf');
                if (response.data.base64) {
                    setPdfData(`data:application/pdf;base64,${response.data.base64}`);
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
    }, []);

    if (loading) return <div>Loading PDF...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div style={{ height: '100vh', width: '100%' }}>
            {pdfData ? (
                <object
                    data={pdfData}
                    type="application/pdf"
                    width="100%"
                    height="100%"
                >
                    <p>Alternative text - include a link <a href={pdfData}>to the PDF!</a></p>
                </object>
            ) : (
                <div>No PDF to display</div>
            )}
        </div>
    );
};

export default PdfViewer;
