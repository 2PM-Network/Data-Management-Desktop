import React, { useState } from 'react';
import Papa from 'papaparse';

const LocalEncryption = () => {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setDescription('');
      setPreview(null);
    }
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handlePreview = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (file.type === 'application/json') {
          const jsonData = JSON.parse(reader.result);
          setPreview(jsonData);
        } else {
          Papa.parse(file, {
            complete: (results) => {
              setPreview(results.data);
            },
            preview: 5,
          });
        }
      };
      reader.readAsText(file);
    }
  };

  const handleEncryption = () => {
    if (file && description) {
      // 执行加密操作
      console.log('文件加密中...', file, description);
      // 加密完成后的操作,如显示成功消息或导航到其他页面
    }
  };

  return (
    <div className="h-screen overflow-auto">
      <div className="max-w-full pr-32 mt-14 bg-white rounded-md p-6">
        <h1 className="text-3xl font-bold mb-6 text-left font-sans">
          🔒 Local Encryption
        </h1>
        <div className="mb-4">
          <label htmlFor="fileInput" className="block mb-2 font-semibold">
            Select File:
          </label>
          <input
            type="file"
            id="fileInput"
            accept=".csv,.xlsx,.xls,.json"
            onChange={handleFileChange}
            className="border border-gray-300 rounded-md px-4 py-2 w-full"
          />
        </div>
        {file && (
          <div className="mb-4">
            <p className="font-semibold">File Information:</p>
            <p>Name: {file.name}</p>
            <p>Size: {file.size} bytes</p>
            <p>Type: {file.type}</p>
            <button
              onClick={handlePreview}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mt-2"
            >
              Preview File
            </button>
          </div>
        )}
        {preview && (
          <div className="mb-4">
            <p className="font-semibold">File Preview:</p>
            <table className="border-collapse border border-gray-300">
              <thead>
                <tr>
                  {preview[0].map((header, index) => (
                    <th
                      key={index}
                      className="border border-gray-300 px-4 py-2"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {preview.slice(1, 6).map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className="border border-gray-300 px-4 py-2"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              onClick={() => setPreview(null)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded-md mt-2"
            >
              Hide Preview
            </button>
          </div>
        )}
        <div className="mb-4">
          <label
            htmlFor="descriptionInput"
            className="block mb-2 font-semibold"
          >
            File Description:
          </label>
          <textarea
            id="descriptionInput"
            value={description}
            onChange={handleDescriptionChange}
            className="border border-gray-300 rounded-md px-4 py-2 w-full"
            rows={4}
          />
        </div>
        <button
          onClick={handleEncryption}
          disabled={!file || !description}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Encrypt File
        </button>
      </div>
    </div>
  );
};

export default LocalEncryption;
