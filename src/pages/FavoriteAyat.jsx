import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadFavoriteAyat, toggleFavoriteAyat } from '../features/quranSlices.js';
import { shareToWhatsApp, shareToInstagram, shareToDiscord } from '../services/shareUtils';
import { FaArrowLeft, FaBook, FaShare, FaWhatsapp, FaInstagram, FaDiscord, FaCopy, FaHeart, FaRegHeart, FaTrash, FaSpinner } from 'react-icons/fa';

const FavoriteAyat = () => {
  const dispatch = useDispatch();
  const { favoriteAyat } = useSelector((state) => state.quran);
  
  // State untuk share menu
  const [shareOpen, setShareOpen] = useState(null); // null atau key dari ayat
  // State untuk loading saat delete
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    dispatch(loadFavoriteAyat());
  }, [dispatch]);

  const handleRemoveFavorite = async (surahNumber, ayatNumber) => {
    // Konfirmasi sebelum menghapus
    if (!window.confirm(`Hapus Ayat ${ayatNumber} dari Favorit?`)) {
      return;
    }

    setDeletingId(`${surahNumber}-${ayatNumber}`);
    
    try {
      // Simulasi loading (opsional, bisa dihapus jika tidak perlu)
      await new Promise(resolve => setTimeout(resolve, 300));
      
      dispatch(toggleFavoriteAyat({
        surahNumber,
        ayatNumber,
        surahName: '',
        ayatText: '',
        translation: '',
      }));
    } catch (error) {
      console.error('Error menghapus favorit:', error);
      alert('Gagal menghapus favorit. Silakan coba lagi.');
    } finally {
      setDeletingId(null);
    }
  };

  const handleShare = (ayat) => {
    const text = `${ayat.ayatText}\n${ayat.translation}\n\n- ${ayat.surahName} Ayat ${ayat.ayatNumber}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="container mx-auto p-3 sm:p-4 max-w-4xl">
      {/* TOMBOL KEMBALI */}
      <Link to="/" className="text-emerald-600 font-bold mb-4 inline-block hover:underline text-xs sm:text-base hover:text-emerald-700 transition-colors">
        ← Kembali
      </Link>

      {/* HEADER */}
      <header className="text-center my-6 sm:my-8">
        <h1 className="text-2xl sm:text-4xl font-bold text-emerald-600">
          ❤️ Ayat Favorit
        </h1>
        <p className="text-gray-500 mt-2 dark:text-slate-400 text-xs sm:text-base">
          Total: {favoriteAyat.length} Ayat
        </p>
      </header>

      {/* DAFTAR AYAT FAVORIT */}
      {favoriteAyat.length > 0 ? (
        <div className="space-y-3 sm:space-y-6 pb-4">
          {favoriteAyat.map((ayat, index) => (
            <div 
              key={`${ayat.surahNumber}-${ayat.ayatNumber}`}
              className="bg-white p-3 sm:p-6 rounded-lg sm:rounded-xl border border-red-200 shadow-md dark:bg-slate-900 dark:border-red-900 hover:shadow-lg transition-all active:scale-95 sm:active:scale-100"
            >
              {/* HEADER AYAT */}
              <div className="flex justify-between items-center mb-3 sm:mb-4 pb-3 border-b border-red-100 dark:border-red-900 gap-2">
                <div className="min-w-0 flex-1">
                  <h2 className="text-sm sm:text-lg font-bold text-slate-900 dark:text-slate-100 truncate">
                    {ayat.surahName} - Ayat {ayat.ayatNumber}
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-slate-400">
                    Disimpan: {new Date(ayat.timestamp).toLocaleDateString('id-ID')}
                  </p>
                </div>
                <span className="text-2xl sm:text-3xl shrink-0">❤️</span>
              </div>

              {/* TEKS ARAB */}
              <h3 className="text-lg sm:text-2xl font-bold text-right leading-relaxed sm:leading-loose mb-2 sm:mb-3 dark:text-slate-100" dir="rtl">
                {ayat.ayatText}
              </h3>

              {/* TERJEMAHAN INDONESIA */}
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 dark:text-slate-300">
                {ayat.translation}
              </p>

              {/* TOMBOL AKSI */}
              <div className="flex gap-2 pt-3 sm:pt-4 border-t border-gray-200 dark:border-slate-700 flex-wrap">
                {/* Link ke Surah */}
                <Link
                  to={`/surat/${ayat.surahNumber}`}
                  className="flex items-center gap-1 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm sm:rounded-lg font-semibold bg-emerald-100 text-emerald-600 hover:bg-emerald-200 dark:bg-emerald-900 dark:text-emerald-200 transition-all active:scale-95"
                >
                  <FaBook className="text-base" />
                  <span className="hidden sm:inline">Baca Surah</span>
                </Link>

                {/* Share dengan Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShareOpen(shareOpen === `${ayat.surahNumber}-${ayat.ayatNumber}` ? null : `${ayat.surahNumber}-${ayat.ayatNumber}`)}
                    className="flex items-center gap-2 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm sm:rounded-lg font-semibold bg-blue-100 text-blue-600 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200 transition-all active:scale-95"
                  >
                    <FaShare className="text-base" />
                    <span className="hidden sm:inline">Bagikan</span>
                  </button>

                  {/* Share Menu Dropdown */}
                  {shareOpen === `${ayat.surahNumber}-${ayat.ayatNumber}` && (
                    <div className="absolute top-full left-0 mt-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl shadow-lg z-10 py-2 w-48">
                      {/* WhatsApp */}
                      <button
                        onClick={() => {
                          shareToWhatsApp(ayat.surahName, ayat.ayatNumber, ayat.ayatText, ayat.translation);
                          setShareOpen(null);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors flex items-center gap-3 text-gray-700 dark:text-gray-200"
                      >
                        <FaWhatsapp className="text-lg" />
                        <span className="font-medium">WhatsApp</span>
                      </button>

                      {/* Instagram */}
                      <button
                        onClick={() => {
                          shareToInstagram(ayat.surahName, ayat.ayatNumber, ayat.ayatText, ayat.translation);
                          setShareOpen(null);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors flex items-center gap-3 text-gray-700 dark:text-gray-200"
                      >
                        <FaInstagram className="text-lg" />
                        <span className="font-medium">Instagram</span>
                      </button>

                      {/* Discord */}
                      <button
                        onClick={() => {
                          shareToDiscord(ayat.surahName, ayat.ayatNumber, ayat.ayatText, ayat.translation);
                          setShareOpen(null);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors flex items-center gap-3 text-gray-700 dark:text-gray-200"
                      >
                        <FaDiscord className="text-lg" />
                        <span className="font-medium">Discord</span>
                      </button>

                      {/* Divider */}
                      <div className="my-2 border-t border-gray-200 dark:border-slate-700"></div>

                      {/* Copy Text */}
                      <button
                        onClick={() => {
                          const text = `${ayat.ayatText}\n\n${ayat.translation}\n\n- ${ayat.surahName} Ayat ${ayat.ayatNumber}`;
                          navigator.clipboard.writeText(text);
                          alert('✅ Teks disalin!');
                          setShareOpen(null);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors flex items-center gap-3 text-gray-700 dark:text-gray-200"
                      >
                        <FaCopy className="text-lg" />
                        <span className="font-medium">Salin Teks</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Hapus Favorit */}
                <button
                  onClick={() => handleRemoveFavorite(ayat.surahNumber, ayat.ayatNumber)}
                  disabled={deletingId === `${ayat.surahNumber}-${ayat.ayatNumber}`}
                  className={`flex items-center gap-2 px-2 sm:px-3 py-1 sm:py-2 rounded text-xs sm:text-sm sm:rounded-lg font-semibold transition-all ml-auto active:scale-95 ${
                    deletingId === `${ayat.surahNumber}-${ayat.ayatNumber}`
                      ? 'bg-red-200 text-red-600 cursor-not-allowed dark:bg-red-800 dark:text-red-300'
                      : 'bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900 dark:text-red-200'
                  }`}
                  title="Hapus dari Favorit"
                >
                  {deletingId === `${ayat.surahNumber}-${ayat.ayatNumber}` ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      <span className="hidden sm:inline">Menghapus...</span>
                    </>
                  ) : (
                    <>
                      <FaTrash className="text-base" />
                      <span className="hidden sm:inline">Hapus</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-5xl mb-4">😔</p>
          <p className="text-gray-500 text-lg dark:text-slate-300 mb-6">
            Belum ada ayat favorit.
          </p>
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-all"
          >
            Kembali ke Home
          </Link>
        </div>
      )}
    </div>
  );
};

export default FavoriteAyat;
