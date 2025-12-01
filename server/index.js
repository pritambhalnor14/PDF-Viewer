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
            res.json({ base64: base64Data });
        } else {
            res.status(404).json({ error: 'File not found' });
        }
    } catch (error) {
        console.error('Error reading file:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
