import React, { useState } from 'react';

const OneClickOperation = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [downloadLink, setDownloadLink] = useState('');

  const handleClick = () => {
    setLoading(true);
    // Simulate encryption and data transfer
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setDownloadLink('https://example.com/encrypted_data.zip');
    }, 2000);
  };

  return (
    <div className="max-w-full pr-32 mt-14 bg-white rounded-md">
      <h1 className="text-3xl font-bold mb-6 text-left font-sans">
        Upload Encrypted Data
      </h1>

      <div className="max-w-lg mx-auto p-6 bg-white rounded-md shadow-md">
        <p className="text-gray-600 mb-6">
          There is a risk during data transfer from local to server. We ensure
          the reliability of data privacy during the encryption process, but we
          cannot guarantee no data leakage during transfer.
        </p>
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
