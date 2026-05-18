import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSurah, setSearchTerm, toggleBookmark, loadBookmarks, loadLastRead, loadFavoriteAyat } from '../features/quranSlices.js';
import { Link, useNavigate } from 'react-router-dom';
import { SkeletonCard } from '../components/Skeleton';
import { FaArrowLeft, FaCog, FaBookmark, FaHeart, FaPlay, FaSearch } from 'react-icons/fa';

const Home = () => {
  // ============ HOOKS ============
  // useDispatch: untuk mengirim action ke Redux
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // useSelector: untuk membaca state dari Redux
  const { surahList, loading, searchTerm, bookmarks, lastRead, favoriteAyat } = useSelector((state) => state.quran);

  // ============ SIDE EFFECTS ============
  // useEffect: menjalankan kode saat komponen pertama kali dimuat
  useEffect(() => {
    dispatch(getAllSurah());  // Ambil data surat dari API
    dispatch(loadBookmarks()); // Load bookmarks dari localStorage
    dispatch(loadLastRead());  // Load last read dari localStorage
    dispatch(loadFavoriteAyat()); // Load favorite ayat dari localStorage
  }, [dispatch]);  // Dependency array: hanya jalan sekali

  // ============ FILTERING ============
  // Filter surat berdasarkan kata kunci pencarian
  const filteredSurah = surahList.filter((s) =>
    s.namaLatin.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-3 sm:p-4 max-w-6xl">
      {/* NAVIGATION BAR */}
      <nav className="flex justify-between items-center mb-6 sm:mb-8 pb-3 sm:pb-4 border-b border-gray-200 dark:border-slate-700 gap-2">
        <button
          onClick={() => navigate('/')}
          className="text-emerald-600 font-bold text-sm sm:text-base hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors shrink-0 flex items-center gap-1"
          title="Kembali ke Home"
        >
          <FaArrowLeft /> <span className="hidden sm:inline">Kembali</span>
        </button>
        <h1 className="text-lg sm:text-2xl font-bold text-emerald-600 truncate">Al-FurqanDB</h1>
        <button
          onClick={() => navigate('/settings')}
          className="text-emerald-600 font-bold text-lg sm:text-xl hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors shrink-0"
          title="Pengaturan"
        >
          <FaCog />
        </button>
      </nav>

      {/* HEADER */}
      <header className="text-center my-6 sm:my-8">
        <h1 className="text-2xl sm:text-4xl font-bold text-emerald-600">
        Al-FurqanDB
        </h1>
        
        {/* QUICK STATS */}
        <div className="flex justify-center gap-2 sm:gap-6 mt-4 sm:mt-6 flex-wrap text-xs sm:text-base">
          <Link to="/bookmarks" className="text-emerald-600 hover:underline inline-flex items-center gap-1 sm:gap-2 px-2 py-1 hover:bg-emerald-50 dark:hover:bg-slate-800 rounded transition-colors">
            <FaBookmark /> Bookmarks ({bookmarks.length})
          </Link>
          <Link to="/favorite-ayat" className="text-emerald-600 hover:underline inline-flex items-center gap-1 sm:gap-2 px-2 py-1 hover:bg-emerald-50 dark:hover:bg-slate-800 rounded transition-colors">
            <FaHeart /> Favorit ({favoriteAyat.length})
          </Link>
          {lastRead && (
            <button 
              onClick={() => navigate(`/surat/${lastRead.surahNumber}`)}
              className="text-emerald-600 hover:underline inline-flex items-center gap-1 sm:gap-2 px-2 py-1 hover:bg-emerald-50 dark:hover:bg-slate-800 rounded transition-colors"
              title="Lanjut membaca"
            >
              <FaPlay /> Lanjut
            </button>
          )}
        </div>
      </header>

      {/* SEARCH INPUT */}
      <div className="mb-6 sm:mb-8 max-w-md mx-auto px-1">
        <input
          type="text"
          placeholder="Cari Surah..."
          className="w-full p-2 sm:p-3 border-2 border-emerald-500 rounded-lg bg-white text-slate-900 outline-none transition-colors duration-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-300 dark:bg-slate-900 dark:text-slate-100 dark:border-slate-700 text-sm sm:text-base"
          onChange={(e) => dispatch(setSearchTerm(e.target.value))}
          // Setiap kali user mengetik, update searchTerm di Redux
        />
      </div>

      {/* GRID SURAH */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
        {loading ? (
          // Tampilkan skeleton saat loading
          [...Array(9)].map((_, i) => <SkeletonCard key={i} />)
        ) : (
          // Tampilkan data surat yang sudah difilter
          filteredSurah.map((surah) => (
            <div 
              key={surah.nomor} 
              onClick={() => navigate(`/surat/${surah.nomor}`)}
              className="bg-white border border-gray-200 rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg sm:hover:shadow-2xl hover:scale-100 sm:hover:scale-105 transition-all duration-300 hover:border-emerald-500 dark:bg-slate-900 dark:border-slate-700 overflow-hidden group cursor-pointer active:scale-95 sm:active:scale-100"
            >
              {/* INFO SURAH */}
              <div className="p-3 sm:p-6 bg-linear-to-br from-emerald-50 to-white dark:from-slate-800 dark:to-slate-900">
                <div className="flex justify-between items-start mb-2 gap-2">
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <span className="bg-emerald-500 text-white w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full font-bold text-xs sm:text-sm shrink-0">
                      {surah.nomor}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-sm sm:text-lg text-slate-900 dark:text-slate-100 truncate">
                        {surah.namaLatin}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-slate-400 line-clamp-1">{surah.arti}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <h3 className="text-lg sm:text-xl font-arabic font-bold text-emerald-600 dark:text-emerald-400">
                      {surah.nama}
                    </h3>
                  </div>
                </div>
                <p className="text-xs text-gray-400 dark:text-slate-500">{surah.jumlahAyat} Ayat</p>
              </div>

              {/* BUTTONS */}
              <div className="grid grid-cols-3 gap-2 p-4 bg-gray-50 dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700">
                {/* TOMBOL BOOKMARK */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(toggleBookmark(surah.nomor));
                  }}
                  className={`flex flex-col items-center justify-center gap-1 py-2 px-2 rounded-lg text-xs font-semibold transition-all ${
                    bookmarks.includes(surah.nomor)
                      ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-200'
                      : 'bg-gray-200 text-gray-600 dark:bg-slate-700 dark:text-slate-300 hover:bg-yellow-100'
                  }`}
                  title={bookmarks.includes(surah.nomor) ? 'Hapus Bookmark' : 'Tambah Bookmark'}
                >
                  <span className="text-lg">{bookmarks.includes(surah.nomor) ? '⭐' : '☆'}</span>
                  <span>Bookmark</span>
                </button>

                {/* TOMBOL OPEN QURAN */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/surat/${surah.nomor}`);
                  }}
                  className="flex flex-col items-center justify-center gap-1 py-2 px-2 rounded-lg text-xs font-semibold bg-emerald-100 text-emerald-600 hover:bg-emerald-200 dark:bg-emerald-900 dark:text-emerald-200 transition-all"
                  title="Buka Quran"
                >
                  <span className="text-lg">📖</span>
                  <span>Buka</span>
                </button>

                {/* TOMBOL LAST READ / BACA TERAKHIR */}
                {lastRead && lastRead.surahNumber === surah.nomor ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/surat/${surah.nomor}`);
                    }}
                    className="flex flex-col items-center justify-center gap-1 py-2 px-2 rounded-lg text-xs font-semibold bg-blue-100 text-blue-600 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200 transition-all"
                    title={`Lanjut Ayat ${lastRead.ayatNumber}`}
                  >
                    <span className="text-lg">▶️</span>
                    <span>Lanjut</span>
                  </button>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-1 py-2 px-2 rounded-lg text-xs font-semibold bg-gray-100 text-gray-400 dark:bg-slate-700 dark:text-slate-500">
                    <span className="text-lg">-</span>
                    <span>Kosong</span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
