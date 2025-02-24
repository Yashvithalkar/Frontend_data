
import React, { useState } from 'react';
import { FaUpload, FaDownload, FaTrash, FaFileAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const App = () => {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [status, setStatus] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');

  const handleFile1Change = (e) => setFile1(e.target.files[0]);
  const handleFile2Change = (e) => setFile2(e.target.files[0]);

  const handleFileUpload = async () => {
    if (!file1 || !file2) {
      setStatus('Please select both files.');
      return;
    }

    const formData = new FormData();
    formData.append('file1', file1);
    formData.append('file2', file2);

    try {
      setStatus('Uploading files...');
      const response = await fetch('http://localhost:8080/api/files/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setStatus('Files uploaded successfully!');
        setDownloadUrl('http://localhost:8080/api/files/download');
      } else {
        setStatus('Error uploading files.');
      }
    } catch (error) {
      setStatus('Error uploading files: ' + error.message);
    }
  };

  const handleDeleteFiles = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/files/delete', {
        method: 'GET',
      });

      if (response.ok) {
        setStatus('Files deleted successfully!');
      } else {
        setStatus('Error deleting files.');
      }
    } catch (error) {
      setStatus('Error deleting files: ' + error.message);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-64 bg-gray-900 text-white p-5">
        <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>
        <ul>
          <li className="mb-4 flex items-center space-x-2">
            <FaFileAlt /> <span>Upload Files</span>
          </li>
        </ul>
      </div>

      <div className="flex-1 p-10">
        <motion.div
          className="bg-white p-6 rounded-lg shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-semibold text-gray-800 mb-6">Upload Files</h1>
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700 mb-2">Select File 1:</label>
            <input type="file" onChange={handleFile1Change} className="p-2 border w-full rounded" />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700 mb-2">Select File 2:</label>
            <input type="file" onChange={handleFile2Change} className="p-2 border w-full rounded" />
          </div>
          <div className="mb-4">
            <motion.button
              onClick={handleFileUpload}
              className="bg-blue-500 text-white px-4 py-2 rounded flex items-center space-x-2"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaUpload /> <span>Generate Unique File</span>
            </motion.button>
          </div>

          {status && <p className="text-gray-600 mb-4">{status}</p>}

          {downloadUrl && (
            <div className="mb-4">
              <motion.a
                href={downloadUrl}
                download
                className="bg-green-500 text-white px-4 py-2 rounded flex items-center space-x-2"
                whileHover={{ scale: 1.1 }}
              >
                <FaDownload /> <span>Download File 🤩</span>
              </motion.a>
            </div>
          )}

          <div>
            <motion.button
              onClick={handleDeleteFiles}
              className="bg-red-500 text-white px-4 py-2 rounded flex items-center space-x-2"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaTrash /> <span>Delete Files</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default App;
