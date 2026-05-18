import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSurah, loadBookmarks } from '../features/quranSlices.js';
import { Link } from 'react-router-dom';
import { SkeletonCard } from '../components/Skeleton';

const Bookmarks = () => {
  const dispatch = useDispatch();
  const { surahList, loading, bookmarks } = useSelector((state) => state.quran);

  useEffect(() => {
    if (surahList.length === 0) {
      dispatch(getAllSurah());
    }
    dispatch(loadBookmarks());
  }, [dispatch, surahList.length]);

  // Filter surah yang di-bookmark
  const bookmarkedSurah = surahList.filter((surah) => bookmarks.includes(surah.nomor));

  return (
    <div className="container mx-auto p-3 sm:p-4 max-w-6xl">
      {/* HEADER */}
      <header className="text-center my-6 sm:my-8">
        <h1 className="text-2xl sm:text-4xl font-bold text-emerald-600">
          Bookmarks
        </h1>
        <Link to="/" className="text-emerald-600 hover:underline mt-2 inline-block text-xs sm:text-base hover:text-emerald-700 transition-colors">
          ← Kembali ke Home
        </Link>
      </header>

      {/* GRID SURAH BOOKMARK */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
        {loading ? (
          [...Array(9)].map((_, i) => <SkeletonCard key={i} />)
        ) : bookmarkedSurah.length > 0 ? (
          bookmarkedSurah.map((surah) => (
            <Link to={`/surat/${surah.nomor}`} key={surah.nomor}>
              <div className="p-3 sm:p-5 bg-white border border-gray-200 rounded-lg sm:rounded-xl hover:shadow-lg transition-all hover:border-emerald-500 dark:bg-slate-900 dark:border-slate-700 group active:scale-95 sm:active:scale-100">
                <div className="flex justify-between items-center gap-2">
                  {/* Bagian Kiri: Nomor & Nama Latin */}
                  <div className="flex items-center gap-2 sm:gap-4 min-w-0">
                    <span className="bg-emerald-100 text-emerald-700 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full font-bold text-xs sm:text-sm shrink-0">
                      {surah.nomor}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-sm sm:text-lg group-hover:text-emerald-600 truncate">
                        {surah.namaLatin}
                      </h3>
                      <p className="text-sm text-gray-500">{surah.arti}</p>
                    </div>
                  </div>
                  
                  {/* Bagian Kanan: Nama Arab & Jumlah Ayat */}
                  <div className="text-right">
                    <h3 className="text-2xl font-arabic font-bold text-emerald-700">
                      {surah.nama}
                    </h3>
                    <p className="text-xs text-gray-400">{surah.jumlahAyat} Ayat</p>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 text-lg dark:text-slate-300">Belum ada surah yang di-bookmark.</p>
            <Link to="/" className="text-emerald-600 hover:underline mt-4 inline-block">
              Cari surah untuk di-bookmark
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;