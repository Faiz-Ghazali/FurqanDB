import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadLastRead, loadBookmarks, loadFavoriteAyat } from '../features/quranSlices.js';
import { FaBook, FaMapMarker, FaPlay, FaTrash, FaStar } from 'react-icons/fa';

const Landing = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { lastRead } = useSelector((state) => state.quran);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  useEffect(() => {
    // Load semua data saat landing page muncul
    dispatch(loadLastRead());
    dispatch(loadBookmarks());
    dispatch(loadFavoriteAyat());
  }, [dispatch]);

  const handleLastRead = () => {
    if (lastRead) {
      navigate(`/surat/${lastRead.surahNumber}`);
    } else {
      alert('Belum ada riwayat bacaan. Silahkan mulai baca dari awal!');
    }
  };

  const handleClearLastRead = () => {
    localStorage.removeItem('quranLastRead');
    dispatch(loadLastRead());
    setShowClearConfirm(false);
  };

  const handleNewRead = () => {
    navigate('/quran');
  };

  const handleSettings = () => {
    navigate('/settings');
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-emerald-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center p-3 sm:p-4 transition-colors duration-300">
      {/* CONTAINER */}
      <div className="text-center max-w-md w-full">
        {/* LOGO / TITLE */}
        <div className="mb-8 sm:mb-12">
          <div className="inline-block mb-4 sm:mb-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-600 rounded-full flex items-center justify-center shadow-lg">
              <FaBook className="text-3xl sm:text-4xl text-white" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-emerald-600 mb-2">
            Al-Furqan
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-slate-400 font-medium">
            Baca Al-Quran dengan Mudah
          </p>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-500 mt-2">
            Bookmark • Favorit • Lanjut Baca
          </p>
        </div>

        {/* BUTTONS */}
        <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
          {/* LAST READ CARD */}
          {lastRead && (
            <div className="bg-linear-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 border-2 border-blue-200 dark:border-blue-700 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 animate-pulse">
              <p className="text-xs text-blue-600 dark:text-blue-300 font-semibold uppercase tracking-wide mb-2 flex items-center gap-2">
                <FaMapMarker className="text-sm" /> Terakhir dibaca
              </p>
              <p className="text-lg sm:text-2xl font-bold text-blue-700 dark:text-blue-200">
                {lastRead.namaLatin}
              </p>
              <p className="text-xs sm:text-sm text-blue-600 dark:text-blue-300 mt-1">
                Ayat {lastRead.ayatNumber}
              </p>
            </div>
          )}

          {/* LAST READ BUTTON */}
          <button
            onClick={handleLastRead}
            className={`w-full py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl font-bold text-sm sm:text-lg transition-all duration-200 shadow-lg transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 ${
              lastRead
                ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-xl'
                : 'bg-gray-300 text-gray-500 dark:bg-slate-700 dark:text-slate-500 cursor-not-allowed'
            }`}
            disabled={!lastRead}
          >
            <FaPlay className="text-lg sm:text-xl" />
            {lastRead ? `Lanjut Baca` : 'Belum Ada Riwayat'}
          </button>

          {/* NEW READ BUTTON */}
          <button
            onClick={handleNewRead}
            className="w-full py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl bg-emerald-600 text-white font-bold text-sm sm:text-lg transition-all duration-200 shadow-lg hover:bg-emerald-700 hover:shadow-xl active:scale-95 transform hover:scale-105 flex items-center justify-center gap-2"
          >
            <FaBook className="text-lg sm:text-xl" />
            Jelajahi Surah
          </button>

          {/* CLEAR LAST READ BUTTON */}
          {lastRead && (
            <div>
              {!showClearConfirm ? (
                <button
                  onClick={() => setShowClearConfirm(true)}
                  className="w-full py-2 px-4 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
                >
                  <FaTrash className="text-sm" /> Hapus Riwayat
                </button>
              ) : (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 space-y-2">
                  <p className="text-sm text-red-700 dark:text-red-300 font-semibold">
                    Hapus riwayat bacaan?
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={handleClearLastRead}
                      className="flex-1 py-1 px-3 bg-red-600 text-white text-sm font-semibold rounded hover:bg-red-700 transition-all"
                    >
                      Ya, Hapus
                    </button>
                    <button
                      onClick={() => setShowClearConfirm(false)}
                      className="flex-1 py-1 px-3 bg-gray-300 dark:bg-slate-700 text-gray-700 dark:text-gray-300 text-sm font-semibold rounded hover:bg-gray-400 dark:hover:bg-slate-600 transition-all"
                    >
                      Batal
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* NEW READ BUTTON */}
          <button
            onClick={handleNewRead}
            className="w-full py-4 px-6 rounded-xl font-bold text-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center gap-2"
          >
            <FaStar className="text-xl" />
            Mulai Baca Baru
          </button>

          {/* SETTINGS BUTTON */}
          <button
            onClick={handleSettings}
            className="w-full py-4 px-6 rounded-xl font-bold text-lg bg-gray-600 text-white hover:bg-gray-700 dark:bg-slate-700 dark:hover:bg-slate-600 transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95"
          >
            <span className="text-2xl mr-2">⚙️</span>
            Pengaturan
          </button>
        </div>

        {/* STATS FOOTER */}
        <div className="pt-8 border-t border-gray-200 dark:border-slate-700">
          <p className="text-xs text-gray-500 dark:text-slate-500">
            114 Surah • 6,236 Ayat
          </p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
