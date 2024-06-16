import React, { useState } from 'react';

const UploadEncryptedData = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    setFile(e.dataTransfer.files[0]);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!file) {
      setError('Please select a file to upload.');
      return;
    }

    // Upload the file to the server
    // ...

    // Reset the state after successful upload
    setFile(null);
    setError('');
  };

  return (
    <div className="max-w-full pr-32 mt-14 bg-white rounded-md">
      <h1 className="text-3xl font-bold mb-6 text-left font-sans">
        Upload Encrypted Data
      </h1>
      <form onSubmit={handleSubmit}>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div
          className={`border-2 border-dashed border-gray-400 p-8 mb-4 ${
            isDragOver ? 'bg-gray-200' : ''
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="text-center">
            {file ? (
              <p>{file.name}</p>
            ) : (
              <p>Drag and drop a file here or click to select a file</p>
            )}
          </div>
          <input
            type="file"
            className="hidden"
            id="file-upload"
            onChange={handleFileChange}
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer text-blue-500 hover:underline flex justify-center"
          >
            Browse files
          </label>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Upload
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadEncryptedData;
