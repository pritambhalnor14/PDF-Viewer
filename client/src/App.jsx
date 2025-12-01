import React from 'react';
import PdfViewer from './PdfViewer';
import PdfViewerBlob from './PdfViewerBlob';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>PDF Viewer</h1>
      {/* <PdfViewer /> */}
      <PdfViewerBlob />
    </div>
  );
}

export default App;
