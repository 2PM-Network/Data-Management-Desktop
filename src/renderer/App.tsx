// App.js
import {
  MemoryRouter as Router,
  Route,
  Routes,
  NavLink,
  useNavigate,
} from 'react-router-dom';

import Home from './components/Home';
import KeyManagement from './components/KeyManagement';
import Specification from './components/Specification';
import Choose from './components/Choose';
import LocalEncryption from './components/LocalEncryption';

import './App.css';
import { useState } from 'react';

const sidebarSections = [
  {
    title: 'Account',
    items: [{ path: '/key-management', emoji: '🔑', label: 'Key Management' }],
  },
  {
    title: 'Data',
    items: [
      { path: '/specification', emoji: '📃', label: 'Specification' },
      {
        path: '/choose-encryption',
        emoji: '✅',
        label: 'Choose your Encryption',
      },
      { path: '/local-encryption', emoji: '🔐', label: 'Local Encryption' },
      {
        path: '/upload-encrypted-data',
        emoji: '⏫',
        label: 'Upload Encrypted Data',
      },
      { path: '/one-stop-operation', emoji: '🛠️', label: 'One Stop Operation' },
    ],
  },
  {
    title: 'Documentation',
    items: [
      { path: '/2pm-network', emoji: '📄', label: '2PM.Network' },
      { path: '/zama', emoji: '📄', label: 'ZAMA' },
      { path: '/0g', emoji: '📄', label: '0G' },
    ],
  },
];

function Sidebar() {
  return (
    <nav className="w-64 bg-gray-100 p-4 flex flex-col border-r border-gray-300 h-screen">
      {sidebarSections.map((section, index) => (
        <div key={index}>
          <div className="font-sans font-bold text-xl mb-4 text-gray-600">
            {section.title}
          </div>
          <ul className="space-y-2 pl-4">
            {section.items.map((item, idx) => (
              <li key={idx}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `font-sans text-sm text-gray-700 hover:text-gray-900 flex items-center ${
                      isActive ? 'font-bold' : ''
                    }`
                  }
                >
                  <span className="text-xl mr-2">{item.emoji}</span>{' '}
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          {index < sidebarSections.length - 1 && (
            <div className="mt-8 mb-4 border-t border-gray-300"></div>
          )}
        </div>
      ))}
      <div className="fixed bottom-4 left-4">
        <button className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-full">
          FAQ
        </button>
      </div>
    </nav>
  );
}

function MainContent() {
  return (
    <main>
      <Routes>
        <Route path="/key-management" element={<KeyManagement />} />
        <Route path="/specification" element={<Specification />} />
        <Route path="/choose-encryption" element={<Choose />} />
        <Route path="/local-encryption" element={<LocalEncryption />} />
      </Routes>
    </main>
  );
}

function AppContent() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/key-management');
  };

  return (
    <Routes>
      <Route path="/" element={<Home onGetStarted={handleGetStarted} />} />
      <Route
        path="*"
        element={
          <div className="relative grid grid-cols-10 h-screen">
            <div className="col-span-3">
              <Sidebar />
            </div>
            <div className="col-span-7">
              <MainContent />
            </div>
          </div>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
