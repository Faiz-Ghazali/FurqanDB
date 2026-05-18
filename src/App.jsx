import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Bookmarks from './pages/Bookmarks';
import FavoriteAyat from './pages/FavoriteAyat';
import Settings from './pages/Settings';

function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || savedTheme === 'light') {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    // BrowserRouter: Membungkus seluruh aplikasi untuk routing
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
        <button
          onClick={toggleTheme}
          className="fixed top-3 right-3 sm:top-4 sm:right-4 z-50 inline-flex items-center gap-1 sm:gap-2 rounded-full border border-slate-200 bg-white px-2 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-slate-900 shadow-lg shadow-slate-900/10 transition-all duration-200 hover:border-emerald-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 active:scale-95"
          aria-label="Toggle dark mode"
        >
          {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
        </button>

        {/* Routes: Container untuk semua Route */}
        <Routes>
          {/* Route: Menghubungkan URL dengan komponen */}
          <Route path="/" element={<Landing />} />
          <Route path="/quran" element={<Home />} />
          <Route path="/surat/:nomor" element={<Detail />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/favorite-ayat" element={<FavoriteAyat />} />
          <Route path="/settings" element={<Settings />} />
          {/* :nomor adalah parameter dinamis */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
