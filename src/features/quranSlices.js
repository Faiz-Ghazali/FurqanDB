import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAllSurah, fetchDetailSurah } from '../services/quranApi';

// ============ ASYNC THUNK ============
// Thunk adalah fungsi khusus untuk handle operasi async (seperti fetch data)

// Thunk untuk mengambil semua surah
export const getAllSurah = createAsyncThunk(
  'quran/getAllSurah',  // Nama action type (format: 'namaSlice/namaAction')
  async () => {
    const response = await fetchAllSurah();
    return response.data.data;  // Kita hanya ambil bagian 'data' yang kita butuhkan
  }
);

// Thunk untuk mengambil detail surah
export const getSurahDetail = createAsyncThunk(
  'quran/getDetail',
  async (nomor) => {
    const response = await fetchDetailSurah(nomor);
    return response.data.data;
  }
);

// ============ INITIAL STATE ============
// State awal aplikasi sebelum ada data
const initialState = {
  surahList: [],      // Array untuk menyimpan daftar surat
  detailSurah: null,  // Object untuk detail surat yang dipilih
  loading: false,     // Status loading (true saat mengambil data)
  error: null,        // Menyimpan pesan error jika ada
  searchTerm: '',     // Kata kunci pencarian
  bookmarks: [],      // Array untuk menyimpan nomor surah yang di-bookmark
  favoriteAyat: [],   // Array untuk menyimpan ayat favorit {surahNumber, ayatNumber, ayatText, translation}
  lastRead: null,     // Menyimpan posisi terakhir dibaca {surahNumber, ayatNumber, namaLatin}
};

// ============ SLICE ============
// Slice menggabungkan reducers dan actions dalam satu tempat
const quranSlice = createSlice({
  name: 'quran',  // Nama slice, akan menjadi prefix untuk semua action
  initialState,
  
  // Reducers untuk actions yang sinkron (bukan async)
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;  // Update kata kunci pencarian
    },
    toggleBookmark: (state, action) => {
      const nomor = action.payload;
      const index = state.bookmarks.indexOf(nomor);
      if (index > -1) {
        // Jika sudah ada, hapus
        state.bookmarks.splice(index, 1);
      } else {
        // Jika belum ada, tambah
        state.bookmarks.push(nomor);
      }
      // Simpan ke localStorage
      localStorage.setItem('quranBookmarks', JSON.stringify(state.bookmarks));
    },
    loadBookmarks: (state) => {
      const saved = localStorage.getItem('quranBookmarks');
      if (saved) {
        state.bookmarks = JSON.parse(saved);
      }
    },
    toggleFavoriteAyat: (state, action) => {
      const { surahNumber, ayatNumber, surahName, ayatText, translation } = action.payload;
      const index = state.favoriteAyat.findIndex(
        (fav) => fav.surahNumber === surahNumber && fav.ayatNumber === ayatNumber
      );
      if (index > -1) {
        // Jika sudah ada, hapus
        state.favoriteAyat.splice(index, 1);
      } else {
        // Jika belum ada, tambah
        state.favoriteAyat.push({
          surahNumber,
          ayatNumber,
          surahName,
          ayatText,
          translation,
          timestamp: new Date().toISOString(),
        });
      }
      // Simpan ke localStorage
      localStorage.setItem('quranFavoriteAyat', JSON.stringify(state.favoriteAyat));
    },
    loadFavoriteAyat: (state) => {
      const saved = localStorage.getItem('quranFavoriteAyat');
      if (saved) {
        state.favoriteAyat = JSON.parse(saved);
      }
    },
    setLastRead: (state, action) => {
      const { surahNumber, ayatNumber, namaLatin, timestamp } = action.payload;
      state.lastRead = { 
        surahNumber, 
        ayatNumber, 
        namaLatin,
        timestamp: timestamp || new Date().toISOString()
      };
      // Simpan ke localStorage
      localStorage.setItem('quranLastRead', JSON.stringify(state.lastRead));
    },
    loadLastRead: (state) => {
      const saved = localStorage.getItem('quranLastRead');
      if (saved) {
        try {
          state.lastRead = JSON.parse(saved);
        } catch (error) {
          console.error('Error parsing lastRead:', error);
          state.lastRead = null;
          localStorage.removeItem('quranLastRead');
        }
      }
    },
    clearLastRead: (state) => {
      state.lastRead = null;
      try {
        localStorage.removeItem('quranLastRead');
      } catch (error) {
        console.error('Error clearing lastRead from localStorage:', error);
      }
    },
  },
  
  // ExtraReducers untuk actions async (dari createAsyncThunk)
  extraReducers: (builder) => {
    builder
      // ============ HANDLE GET ALL SURAH ============
      .addCase(getAllSurah.pending, (state) => {
        state.loading = true;      // Mulai loading
        state.error = null;        // Reset error
      })
      .addCase(getAllSurah.fulfilled, (state, action) => {
        state.loading = false;     // Selesai loading
        state.surahList = action.payload;  // Simpan data ke state
      })
      .addCase(getAllSurah.rejected, (state, action) => {
        state.loading = false;     // Selesai loading
        state.error = action.error.message;  // Simpan pesan error
      })
      
      // ============ HANDLE GET SURAH DETAIL ============
      .addCase(getSurahDetail.pending, (state) => {
        state.loading = true;
        state.detailSurah = null;  // Reset detail saat loading
      })
      .addCase(getSurahDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.detailSurah = action.payload;
      })
      .addCase(getSurahDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export actions (untuk digunakan di komponen)
export const { 
  setSearchTerm,
  clearLastRead, 
  toggleBookmark, 
  loadBookmarks,
  toggleFavoriteAyat,
  loadFavoriteAyat,
  setLastRead,
  loadLastRead,
} = quranSlice.actions;

// Export reducer (untuk didaftarkan ke store)
export default quranSlice.reducer;
