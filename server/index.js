const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 4000;

app.use(cors());

app.get('/api/pdf', (req, res) => {
    // const filePath = 'd:\\samta\\workspace\\projects\\pdf\\DocumentViewer\\public\\compressed.tracemonkey-pldi-09.pdf';

    const filePath = 'd:\\samta\\workspace\\projects\\Node-pdf-viewer\\server\\pkpadmin17411241CE.pdf';

    try {
        if (fs.existsSync(filePath)) {
            const fileBuffer = fs.readFileSync(filePath);
            const base64Data = fileBuffer.toString('base64');
            const fileName = path.basename(filePath);
            res.json({ base64: base64Data, fileName: fileName });
        } else {
            res.status(404).json({ error: 'File not found' });
        }
    } catch (error) {
        console.error('Error reading file:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Helper function to parse size string (e.g., "4m", "10kb")
const parseSize = (sizeStr) => {
    if (!sizeStr) return 0;
    const units = {
        'b': 1,
        'kb': 1024,
        'mb': 1024 * 1024,
        'gb': 1024 * 1024 * 1024,
        'k': 1024,
        'm': 1024 * 1024,
        'g': 1024 * 1024 * 1024
    };
    const match = sizeStr.toString().toLowerCase().match(/^(\d+(?:\.\d+)?)([a-z]+)?$/);
    if (!match) return 0;
    const value = parseFloat(match[1]);
    const unit = match[2] || 'b';
    return Math.floor(value * (units[unit] || 1));
};

app.get('/api/generate-file', (req, res) => {
    const { size } = req.query;
    if (!size) {
        return res.status(400).json({ error: 'Size query parameter is required (e.g., ?size=4m)' });
    }

    const bytes = parseSize(size);
    if (bytes <= 0) {
        return res.status(400).json({ error: 'Invalid size format' });
    }

    // Limit max size to avoid crashing server (e.g., 100MB)
    const MAX_SIZE = 100 * 1024 * 1024;
    if (bytes > MAX_SIZE) {
        return res.status(400).json({ error: 'Size too large. Max limit is 100MB' });
    }

    const fileName = `generated_${size}.txt`;

    // Set headers for download
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Length', bytes);

    // Stream data to client to avoid high memory usage for larger files
    // But for simplicity and the requested "4m", a buffer is fine. 
    // For very large files, a stream is better. 
    // Let's use a stream-like approach or just write chunks if it were huge, 
    // but for 4MB, Buffer.alloc is perfectly fine and fast.
    try {
        const buffer = Buffer.alloc(bytes, 'A');
        res.send(buffer);
    } catch (err) {
        console.error('Error generating file:', err);
        res.status(500).json({ error: 'Failed to generate file' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
