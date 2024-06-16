import React, { useState, useCallback } from 'react';

const OneClickOperation = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [downloadLink, setDownloadLink] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = useCallback((e) => {
    setFile(e.target.files[0]);
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
          a.download = `encrypted-${filename}`; // 设置下载文件的名称
          a.click();
          window.URL.revokeObjectURL(url);
          setDownloadLink(url); // 将下载链接存储在状态中
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

      <div className="max-w-lg mx-auto p-6 bg-white rounded-md shadow-md">
        <p className="text-gray-600 mb-6">
          There is a risk during data transfer from local to server. We ensure
          the reliability of data privacy during the encryption process, but we
          cannot guarantee no data leakage during transfer.
        </p>
        <div className="mb-4">
          <label htmlFor="file" className="block font-bold mb-2">
            File to upload:
          </label>
          <input
            type="file"
            id="file"
            className="border border-gray-400 p-2 w-full"
            onChange={handleFileChange}
            accept=".csv, .xls, .xlsx, .json"
          />
        </div>
        <div className="flex justify-center mb-6">
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
