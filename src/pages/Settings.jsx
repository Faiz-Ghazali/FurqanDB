import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Settings = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || savedTheme === 'light') {
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
  };

  const handleClearAll = () => {
    if (window.confirm('Apakah Anda yakin ingin menghapus semua data (bookmarks, favorit, last read)?')) {
      localStorage.removeItem('quranBookmarks');
      localStorage.removeItem('quranFavoriteAyat');
      localStorage.removeItem('quranLastRead');
      alert('Semua data telah dihapus!');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* HEADER */}
      <div className="bg-emerald-600 text-white p-4 sm:p-6 text-center sticky top-0 z-40 shadow-lg">
        <button
          onClick={() => navigate('/')}
          className="absolute left-2 sm:left-4 top-4 sm:top-6 text-lg sm:text-xl hover:opacity-80 transition-opacity"
        >
          ← Kembali
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold">Pengaturan</h1>
      </div>

      {/* CONTENT */}
      <div className="container mx-auto max-w-md p-3 sm:p-4 my-6 sm:my-8 space-y-3 sm:space-y-4">
        {/* DARK MODE SECTION */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm mb-4 border border-gray-200 dark:border-slate-700">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-1">
                Mode Gelap
              </h2>
              <p className="text-sm text-gray-600 dark:text-slate-400">
                {theme === 'dark' ? 'Mode gelap aktif' : 'Mode terang aktif'}
              </p>
            </div>
            <button
              onClick={toggleTheme}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                theme === 'dark' ? 'bg-emerald-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                  theme === 'dark' ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* ABOUT SECTION */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm mb-4 border border-gray-200 dark:border-slate-700">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">
            Tentang Aplikasi
          </h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-slate-400">Nama:</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100">Al-FurqanDB</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-slate-400">Versi:</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100">1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-slate-400">Total Surah:</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100">114</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-slate-400">Total Ayat:</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100">6,236</span>
            </div>
          </div>
        </div>

        {/* FEATURES SECTION */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm mb-4 border border-gray-200 dark:border-slate-700">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">
            Fitur
          </h2>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-slate-400">
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">✓</span>
              <span>Bookmark Surah</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">✓</span>
              <span>Favorit Ayat Individual</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">✓</span>
              <span>Lanjut Baca (Last Read)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">✓</span>
              <span>Share Ayat ke WhatsApp</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">✓</span>
              <span>Mode Gelap</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">✓</span>
              <span>Audio Murattal</span>
            </li>
          </ul>
        </div>

        {/* DANGER ZONE */}
        <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 border border-red-200 dark:border-red-900">
          <h2 className="text-lg font-bold text-red-600 dark:text-red-400 mb-4">
            Zona Berbahaya
          </h2>
          <button
            onClick={handleClearAll}
            className="w-full py-3 px-4 rounded-lg font-bold bg-red-600 text-white hover:bg-red-700 transition-all active:scale-95"
          >
            🗑️ Hapus Semua Data
          </button>
          <p className="text-xs text-red-600 dark:text-red-400 mt-2">
            Tindakan ini akan menghapus semua bookmarks, favorit ayat, dan riwayat baca secara permanen.
          </p>
        </div>

        {/* FOOTER */}
        <div className="text-center mt-8 text-sm text-gray-500 dark:text-slate-500">
          <p>Al-FurqanDB © 2026</p>
          <p className="mt-1">Dibuat dengan ❤️ untuk kemudahan membaca Al-Quran</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
