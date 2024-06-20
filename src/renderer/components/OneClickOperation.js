import React, { useState, useCallback } from 'react';

const OneClickOperation = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [downloadLink, setDownloadLink] = useState('');
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');

  const handleFileChange = useCallback((e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  }, []);

  const handleClick = async () => {
    setLoading(true);

    try {
      const formData = new FormData();
      if (file) {
        formData.append('file', file);
      } else {
        setLoading(false);
        setSuccess(false);
        alert('Please select a file to upload.');
        return;
      }
      formData.append('chain_option', '0G');

      const response = await fetch('http://3.81.203.116:8000/v1/file', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        const filename = data.file_name;

        const downloadResponse = await fetch(
          `http://3.81.203.116:8000/v1/file/${filename}`,
          {
            method: 'GET',
          },
        );

        if (downloadResponse.ok) {
          const blob = await downloadResponse.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          setDownloadLink(url);
          a.download = `encrypted-${filename}`;
          a.click();
          window.URL.revokeObjectURL(url);
        } else {
          console.error('Error downloading file:', downloadResponse.status);
        }
      } else {
        console.error('Error uploading file:', response.status);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setLoading(false);
      setSuccess(true);
    }
  };

  return (
    <div className="max-w-full pr-32 mt-14 bg-white rounded-md">
      <h1 className="text-3xl font-bold mb-6 text-left font-sans">
        One Click Operation
      </h1>

      <div className="max-w-lg mx-auto p-8 bg-white rounded-md shadow-md">
        <p className="text-gray-600 mb-6 text-center">
          There is a risk during data transfer from local to server. We ensure
          the reliability of data privacy during the encryption process, but we
          cannot guarantee no data leakage during transfer.
        </p>
        <div className="flex justify-center mb-4">
          <div className="text-center">
            <label
              htmlFor="fileImport"
              className="btn border py-2 px-32 rounded-full hover:bg-gray-100 hover:cursor-pointer font-cursive"
            >
              Choose Data File
            </label>
            <input
              type="file"
              id="fileImport"
              accept=".csv, .xls, .xlsx, .json"
              style={{ visibility: 'hidden' }}
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
              onChange={handleFileChange}
            />
            {file && <p className="mt-2">{fileName}</p>}
          </div>
        </div>
        <div className="flex justify-center mb-4">
          <button
            onClick={handleClick}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {loading ? 'Loading...' : 'Encrypt and Upload'}
          </button>
        </div>
        {loading && (
          <div className="flex justify-center mb-6">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
            <p>Encrypted data uploaded successfully!</p>
            <p>
              <a
                href={downloadLink}
                className="text-blue-500 hover:text-blue-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download Encrypted Data
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OneClickOperation;
