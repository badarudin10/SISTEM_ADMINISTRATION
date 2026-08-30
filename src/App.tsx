import React, { useState } from 'react';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen p-6 transition-colors duration-200 ${darkMode ? 'dark' : ''}`}>
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <header className="flex justify-between items-center pb-6 border-b border-gray-300 dark:border-gray-700">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-sky-600 dark:text-sky-400">
              Asisten LPT Distribusi Obat
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Sistem Pengelolaan Laporan Pemakaian dan Permintaan Obat
            </p>
          </div>
          <button
            onClick={toggleTheme}
            className="px-4 py-2 text-sm font-semibold rounded-lg bg-sky-600 text-white hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-400 transition"
          >
            {darkMode ? '☀️ Mode Terang' : '🌙 Mode Gelap'}
          </button>
        </header>

        {/* Status Card */}
        <main className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-800 shadow-sm">
            <h2 className="text-lg font-bold mb-2">Status Sistem</h2>
            <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
              ● Berhasil terhubung & siap digunakan
            </p>
          </div>

          <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-800 shadow-sm">
            <h2 className="text-lg font-bold mb-2">Informasi Akses</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Repository: <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">SISTEM_ADMINISTRATION</code>
            </p>
          </div>
        </main>

      </div>
    </div>
  );
}
