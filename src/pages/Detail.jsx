import { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getSurahDetail, toggleFavoriteAyat, setLastRead, loadFavoriteAyat, loadLastRead } from '../features/quranSlices.js';
import { SkeletonAyat } from '../components/Skeleton';
import { shareToWhatsApp, shareToInstagram, shareToDiscord } from '../services/shareUtils';
import { FaArrowLeft, FaShare, FaWhatsapp, FaInstagram, FaDiscord, FaCopy, FaHeart, FaRegHeart, FaPlay } from 'react-icons/fa';
import { CiInstagram } from 'react-icons/ci';
import { IoLogoDiscord } from "react-icons/io5";


const Detail = () => {
  // ============ HOOKS ============
  // useParams: mengambil parameter dari URL (contoh: /surat/1 -> nomor = 1)
  const { nomor } = useParams();
  const dispatch = useDispatch();
  const { detailSurah, loading, favoriteAyat, lastRead } = useSelector((state) => state.quran);
  
  // State untuk share menu
  const [shareOpen, setShareOpen] = useState(null); // null atau ayat number
  
  // Refs untuk auto-scroll
  const ayatRefsMap = useRef({});

  // ============ SIDE EFFECTS ============
  useEffect(() => {
    dispatch(getSurahDetail(nomor));
    dispatch(loadFavoriteAyat());
    dispatch(loadLastRead());
    // Setiap nomor berubah, ambil detail surat yang baru
  }, [dispatch, nomor]);

  // Auto-scroll ke ayat terakhir dibaca jika user kembali ke surat yang sama
  useEffect(() => {
    if (detailSurah && lastRead && parseInt(nomor) === lastRead.surahNumber && lastRead.ayatNumber) {
      const element = ayatRefsMap.current[lastRead.ayatNumber];
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element.classList.add('ring-2', 'ring-blue-400');
          setTimeout(() => {
            element.classList.remove('ring-2', 'ring-blue-400');
          }, 2000);
        }, 300);
      }
    }
  }, [detailSurah, lastRead, nomor]);

  const handleAyatClick = (ayatNumber) => {
    // Track last read position dengan timestamp
    if (detailSurah) {
      dispatch(setLastRead({
        surahNumber: detailSurah.nomor,
        ayatNumber: ayatNumber,
        namaLatin: detailSurah.namaLatin,
        timestamp: new Date().toISOString(),
      }));
    }
  };

  // ============ CONDITIONAL RENDERING ============
  if (loading) {
    return (
      <div className="container mx-auto p-10 space-y-8">
        <SkeletonAyat />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-3 sm:p-4 max-w-4xl">
      {/* TOMBOL KEMBALI */}
      <Link to="/" className="text-emerald-600 font-bold mb-3 sm:mb-4 inline-block text-sm sm:text-base hover:text-emerald-700 transition-colors items-center gap-1">
        <FaArrowLeft /> Kembali
      </Link>

      {/* HANYA TAMPILKAN JIKA detailSurah TIDAK NULL */}
      {detailSurah && (
        <>
          {/* HEADER SURAH - Background Hijau */}
          <div className="bg-emerald-600 text-white p-4 sm:p-6 lg:p-8 rounded-lg sm:rounded-2xl text-center mb-6 sm:mb-8 shadow-lg sm:shadow-xl">
            <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2">{detailSurah.namaLatin}</h1>
            <p className="italic mb-3 sm:mb-4 text-xs sm:text-base">
              {detailSurah.arti} • {detailSurah.jumlahAyat} Ayat
            </p>
            
            {/* AUDIO MURATTAL */}
            <audio controls className="mx-auto w-full max-w-xs sm:max-w-md mb-3 sm:mb-4 h-8 sm:h-10">
              <source src={detailSurah.audioFull['05']} type="audio/mpeg" />
              {/* '05' adalah kode untuk qari (pembaca) tertentu */}
            </audio>

            {/* TOMBOL SHARE SURAH */}
            <div className="flex justify-center gap-2 sm:gap-3 mt-4 sm:mt-6 flex-wrap">
              <button
                onClick={() => shareToWhatsApp(detailSurah.namaLatin, '—', `Baca Surat ${detailSurah.namaLatin}`, detailSurah.arti)}
                className="flex items-center gap-1 px-2 sm:px-4 py-1 sm:py-2 bg-white/20 hover:bg-white/30 rounded text-xs sm:text-sm sm:rounded-lg font-semibold transition-all backdrop-blur"
                title="Bagikan ke WhatsApp"
              >
                <span className="text-lg"><FaWhatsapp /></span>
                <span className="hidden sm:inline">WhatsApp</span>
              </button>
              
              <button
                onClick={() => shareToInstagram(detailSurah.namaLatin, '—', `Baca Surat ${detailSurah.namaLatin}`, detailSurah.arti)}
                className="flex items-center gap-1 px-2 sm:px-4 py-1 sm:py-2 bg-white/20 hover:bg-white/30 rounded text-xs sm:text-sm sm:rounded-lg font-semibold transition-all backdrop-blur"
                title="Bagikan ke Instagram"
              >
                <span className="text-lg"><FaInstagram /></span>
                <span className="hidden sm:inline">Instagram</span>
              </button>

              <button
                onClick={() => shareToDiscord(detailSurah.namaLatin, '—', `Baca Surat ${detailSurah.namaLatin}`, detailSurah.arti)}
                className="flex items-center gap-1 px-2 sm:px-4 py-1 sm:py-2 bg-white/20 hover:bg-white/30 rounded text-xs sm:text-sm sm:rounded-lg font-semibold transition-all backdrop-blur"
                title="Bagikan ke Discord"
              >
                <span className="text-lg"><FaDiscord /></span>
                <span className="hidden sm:inline">Discord</span>
              </button>
            </div>
          </div>

          {/* DAFTAR AYAT */}
          <div className="space-y-3 sm:space-y-6 pb-4">
            {detailSurah.ayat.map((ayat) => {
              const isFavorite = favoriteAyat.some(
                (fav) => fav.surahNumber === detailSurah.nomor && fav.ayatNumber === ayat.nomorAyat
              );
              
              return (
              <div 
                key={ayat.nomorAyat}
                ref={(el) => {
                  if (el) ayatRefsMap.current[ayat.nomorAyat] = el;
                }}
                onClick={() => handleAyatClick(ayat.nomorAyat)}
                className={`bg-white p-3 sm:p-6 rounded-lg sm:rounded-xl border border-gray-100 shadow-sm dark:bg-slate-900 dark:border-slate-700 hover:shadow-lg hover:border-emerald-300 transition-all duration-200 cursor-pointer active:scale-95 ${
                  lastRead?.ayatNumber === ayat.nomorAyat && parseInt(nomor) === lastRead.surahNumber
                    ? 'border-blue-300 bg-blue-50 dark:bg-blue-900/20'
                    : ''
                }`}
              >
                {/* HIGHLIGHT BADGE UNTUK AYAT TERAKHIR DIBACA */}
                {lastRead?.ayatNumber === ayat.nomorAyat && parseInt(nomor) === lastRead.surahNumber && (
                  <div className="flex items-center gap-1 mb-2 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded-full w-fit">
                    <span>▶️</span>
                    <span>Terakhir dibaca</span>
                  </div>
                )}

                {/* NOMOR AYAT & TEKS ARAB */}
                <div className="flex justify-between items-start mb-3 sm:mb-6 gap-2">
                  <span className="bg-emerald-500 text-white w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded-full text-xs sm:text-sm shrink-0 font-bold">
                    {ayat.nomorAyat}
                  </span>
                  <h2 className="text-xl sm:text-3xl font-bold text-right leading-relaxed sm:leading-loose flex-1 px-2 sm:px-4" dir="rtl">
                    {ayat.teksArab}
                  </h2>
                </div>
                
                {/* TEKS LATIN */}
                <p className="text-emerald-700 font-medium mb-2 sm:mb-3 text-right italic text-xs sm:text-base dark:text-emerald-400">
                  {ayat.teksLatin}
                </p>
                
                {/* TERJEMAHAN INDONESIA */}
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 dark:text-slate-300">
                  {ayat.teksIndonesia}
                </p>

                {/* TOMBOL BOOKMARK & SHARE */}
                <div className="flex gap-2 pt-3 sm:pt-4 border-t border-gray-200 dark:border-slate-700 flex-wrap">
                  {/* Tombol Bookmark Ayat */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(toggleFavoriteAyat({
                        surahNumber: detailSurah.nomor,
                        ayatNumber: ayat.nomorAyat,
                        surahName: detailSurah.namaLatin,
                        ayatText: ayat.teksArab,
                        translation: ayat.teksIndonesia,
                      }));
                    }}
                    className={`flex items-center gap-1 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm sm:rounded-lg font-semibold transition-all active:scale-95 ${
                      isFavorite
                        ? 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-200'
                        : 'bg-gray-100 text-gray-600 dark:bg-slate-800 dark:text-slate-300 hover:bg-red-50 dark:hover:bg-red-900'
                    }`}
                    title={isFavorite ? 'Hapus dari Favorit' : 'Tambah ke Favorit'}
                  >
                    {isFavorite ? <FaHeart className="text-base" /> : <FaRegHeart className="text-base" />}
                    <span className="hidden sm:inline">{isFavorite ? 'Favorit' : 'Favorit'}</span>
                  </button>

                  {/* Tombol Share dengan Menu Dropdown */}
                  <div className="relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShareOpen(shareOpen === ayat.nomorAyat ? null : ayat.nomorAyat);
                      }}
                      className="flex items-center gap-1 px-3 py-1 rounded-lg text-sm font-semibold bg-blue-100 text-blue-600 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200 transition-all"
                      title="Bagikan ke Media Sosial"
                    >
                      <span>📤</span>
                      Bagikan
                    </button>

                    {/* Share Menu Dropdown */}
                    {shareOpen === ayat.nomorAyat && (
                      <div className="absolute top-full left-0 mt-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl shadow-lg z-10 py-2 w-48">
                        {/* WhatsApp */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            shareToWhatsApp(
                              detailSurah.namaLatin,
                              ayat.nomorAyat,
                              ayat.teksArab,
                              ayat.teksIndonesia
                            );
                            setShareOpen(null);
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors flex items-center gap-3 text-gray-700 dark:text-gray-200 text-xs sm:text-base"
                        >
                          <FaWhatsapp className="text-lg" />
                          <span className="font-medium">WhatsApp</span>
                        </button>

                        {/* Instagram */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            shareToInstagram(
                              detailSurah.namaLatin,
                              ayat.nomorAyat,
                              ayat.teksArab,
                              ayat.teksIndonesia
                            );
                            setShareOpen(null);
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors flex items-center gap-3 text-gray-700 dark:text-gray-200"
                        >
                          <FaInstagram className="text-lg" />
                          <span className="font-medium">Instagram</span>
                        </button>

                        {/* Discord */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            shareToDiscord(
                              detailSurah.namaLatin,
                              ayat.nomorAyat,
                              ayat.teksArab,
                              ayat.teksIndonesia
                            );
                            setShareOpen(null);
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors flex items-center gap-3 text-gray-700 dark:text-gray-200 text-xs sm:text-base"
                        >
                          <FaDiscord className="text-lg" />
                          <span className="font-medium">Discord</span>
                        </button>

                        {/* Divider */}
                        <div className="my-2 border-t border-gray-200 dark:border-slate-700"></div>

                        {/* Copy Text */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const text = `${ayat.teksArab}\n\n${ayat.teksLatin}\n\n${ayat.teksIndonesia}\n\n- ${detailSurah.namaLatin} Ayat ${ayat.nomorAyat}`;
                            navigator.clipboard.writeText(text);
                            alert('Teks disalin ke clipboard! 📋');
                            setShareOpen(null);
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors flex items-center gap-3 text-gray-700 dark:text-gray-200 text-xs sm:text-base"
                        >
                          <FaCopy className="text-lg" />
                          <span className="font-medium">Salin Teks</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Detail;
