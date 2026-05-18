# 🧪 Testing Guide - Last Read Feature

Panduan lengkap untuk test fitur Last Read secara menyeluruh.

## ✅ Pre-requisites

- Browser modern (Chrome, Firefox, Edge, Safari)
- Dev server running: `npm run dev`
- Access ke http://localhost:5173/

## 🧬 Test Scenarios

### Test 1: Basic Last Read Tracking
**Tujuan**: Pastikan last read ter-track saat user klik ayat

**Steps**:
1. Buka http://localhost:5173/ (Landing Page)
2. Klik "Mulai Baca Baru"
3. Pilih surah (misal: Al-Fatihah)
4. Klik ayat nomor 7
5. Buka DevTools → Application → LocalStorage
6. Cari `quranLastRead`
7. Verify data:
   ```javascript
   {
     surahNumber: 1,
     ayatNumber: 7,
     namaLatin: "Al-Fatihah",
     timestamp: "..."
   }
   ```

**Expected Result**: ✅ Data tersimpan di localStorage

---

### Test 2: Landing Page Last Read Display
**Tujuan**: Pastikan landing page menampilkan last read info dengan benar

**Steps**:
1. Setelah Test 1, refresh halaman (Ctrl+R)
2. Landing page harus menampilkan:
   - Blue card dengan "📍 Terakhir dibaca"
   - Nama surah: "Al-Fatihah"
   - Nomor ayat: "7"
3. Tombol "Lanjut Baca - Al-Fatihah" harus **ENABLED** (biru)
4. Tombol "✕ Hapus Riwayat" harus visible

**Expected Result**: ✅ Semua info display dengan benar

---

### Test 3: Last Read Navigation
**Tujuan**: Pastikan user bisa navigate dari landing ke last read ayat

**Steps**:
1. Di Landing Page, klik "Lanjut Baca - Al-Fatihah"
2. Browser harus navigate ke `/surat/1` (Al-Fatihah)
3. Page harus auto-scroll ke ayat 7
4. Ayat 7 akan mendapat:
   - Badge "▶️ Terakhir dibaca"
   - Blue border highlight
   - Ring animation selama 2 detik

**Expected Result**: ✅ Auto-scroll bekerja, highlight visible

---

### Test 4: Update Last Read Position
**Tujuan**: Pastikan last read ter-update saat user klik ayat berbeda

**Steps**:
1. Di halaman detail (masih di Al-Fatihah), klik ayat 5
2. Klik ayat 3
3. Buka DevTools → Application → LocalStorage → `quranLastRead`
4. Verify `ayatNumber` sudah berubah menjadi 3

**Expected Result**: ✅ Data ter-update dengan ayat terbaru yang diklik

---

### Test 5: Landing Page with Updated Position
**Tujuan**: Pastikan landing page update saat last read berubah

**Steps**:
1. Dari Test 4, kembali ke landing (klik "Kembali")
2. Landing page harus update menampilkan:
   - "Ayat 3" bukan "Ayat 7"
   - Tombol "Lanjut Baca - Al-Fatihah" sama
3. Klik "Lanjut Baca" lagi
4. Page harus scroll ke ayat 3

**Expected Result**: ✅ Landing page ter-update, navigate ke ayat 3

---

### Test 6: Multiple Surat Switching
**Tujuan**: Pastikan last read bekerja saat switching antar surat

**Steps**:
1. Buka surat Al-Baqarah (nomor 2)
2. Klik ayat 10
3. Buka surat Al-Imran (nomor 3)
4. Klik ayat 5
5. Kembali ke landing
6. Verify: Last read harus menunjukkan "Al-Imran Ayat 5"
7. Klik "Lanjut Baca"
8. Browser harus ke `/surat/3` dan scroll ke ayat 5

**Expected Result**: ✅ Last read track surat terakhir yang diklik

---

### Test 7: Clear Last Read
**Tujuan**: Pastikan user bisa clear riwayat bacaan

**Steps**:
1. Di Landing Page, ada data last read
2. Klik "✕ Hapus Riwayat"
3. Confirmation dialog muncul:
   - Isi: "Hapus riwayat bacaan?"
   - Tombol: "Ya, Hapus" & "Batal"
4. Klik "Ya, Hapus"
5. Dialog hilang
6. Card "Terakhir dibaca" hilang dari view
7. Tombol "Lanjut Baca" jadi **DISABLED** (abu-abu)
8. DevTools → localStorage → `quranLastRead` harus kosong/tidak ada

**Expected Result**: ✅ Last read terhapus sempurna

---

### Test 8: Disable Timestamp Test
**Tujuan**: Pembuktian bahwa timestamp otomatis ditambah

**Steps**:
1. Buka halaman detail surat
2. Klik ayat tanpa payload timestamp
3. DevTools → localStorage → `quranLastRead`
4. Verify ada field `timestamp` dengan format ISO

**Expected Result**: ✅ Timestamp otomatis ter-generate

---

### Test 9: Persistence After Browser Close
**Tujuan**: Pastikan data persist setelah close browser

**Steps**:
1. Selama test, pastikan ada data last read
2. Close browser sepenuhnya (close tab & window)
3. Buka browser lagi
4. Buka http://localhost:5173/
5. Landing page harus masih menampilkan last read sebelumnya
6. Klik "Lanjut Baca" harus work normal

**Expected Result**: ✅ Data persist setelah browser close

---

### Test 10: Home Page Quick Access
**Tujuan**: Test last read quick access di Home page

**Steps**:
1. Dari Landing, klik "Mulai Baca Baru"
2. Buka halaman Home (/quran)
3. Di bagian header, ada stats row
4. Last read harus tampil: "📖 Lanjut: [Nama Surah]"
5. Klik link tersebut
6. Browser harus navigate ke halaman detail surat

**Expected Result**: ✅ Quick access bekerja dari Home page

---

### Test 11: FavoriteAyat with Last Read Update
**Tujuan**: Pastikan share dari favorit juga update last read

**Steps**:
1. Buka halaman detail
2. Klik beberapa ayat untuk favorit
3. Buka /favorite-ayat
4. Klik Share pada ayat favorit
5. Kembali ke detail surat (via tombol "Baca Surah")
6. Cek localStorage
7. Verify last read ter-update ke ayat dari favorit yang di-share

**Expected Result**: ✅ Last read ter-update saat navigate dari favorit

---

### Test 12: Dark Mode Compatibility
**Tujuan**: Pastikan fitur last read berfungsi di dark mode

**Steps**:
1. Toggle dark mode (tombol di corner)
2. Halaman jadi dark theme
3. Landing page card "Terakhir dibaca" harus visible dengan warna dark mode
4. Semua styling harus tetap konsisten
5. Navigation & button colors harus readable

**Expected Result**: ✅ Dark mode styling sempurna

---

### Test 13: Mobile Responsiveness
**Tujuan**: Pastikan fitur work di mobile

**Steps**:
1. Open DevTools → Device Emulation (F12)
2. Set ke mobile view (iPhone 12, etc)
3. Test semua steps dari Test 1-12
4. Verify:
   - Touch buttons besar dan mudah diklik
   - Card layout responsive
   - No horizontal scroll
   - Text readable tanpa zoom

**Expected Result**: ✅ Mobile UI sempurna

---

## 🐛 Quick Failure Checklist

| Issue | Check |
|-------|-------|
| Last read tidak ter-track | - Pastikan ayat diklik, bukan scroll<br>- Check console untuk error<br>- Verify Redux dispatch berfungsi |
| Data tidak ter-persist | - Check localhost/domain (localStorage per-domain)<br>- Verify privacy mode off<br>- Check storage quota |
| Auto-scroll tidak work | - Verify nomor surat sama dengan last read<br>- Check ref mapping correct<br>- Verify smooth scroll support |
| UI tidak update | - Force refresh (Ctrl+Shift+R)<br>- Clear browser cache<br>- Check Redux store |

---

## 🔍 DevTools Inspection

### Check Last Read State:
```javascript
// Di console:
JSON.parse(localStorage.getItem('quranLastRead'))
```

### Expected Output:
```json
{
  "surahNumber": 1,
  "ayatNumber": 7,
  "namaLatin": "Al-Fatihah",
  "timestamp": "2026-04-16T09:30:00.000Z"
}
```

### Check Redux State:
```javascript
// Di React DevTools:
store.getState().quran.lastRead
```

---

## 📊 Test Results Template

```
Test Date: ___________
Tester: ___________
Browser: ___________
OS: ___________

Test 1 (Basic Tracking): PASS / FAIL
Test 2 (Landing Display): PASS / FAIL
Test 3 (Navigation): PASS / FAIL
Test 4 (Update Position): PASS / FAIL
Test 5 (Landing Update): PASS / FAIL
Test 6 (Multiple Surat): PASS / FAIL
Test 7 (Clear): PASS / FAIL
Test 8 (Timestamp): PASS / FAIL
Test 9 (Persistence): PASS / FAIL
Test 10 (Home Access): PASS / FAIL
Test 11 (FavoriteAyat): PASS / FAIL
Test 12 (Dark Mode): PASS / FAIL
Test 13 (Mobile): PASS / FAIL

Overall Status: ✅ PASS / ❌ FAIL

Notes:
_________________________________
_________________________________
```

---

## 🚀 Performance Tests

### Load Time Test:
- Navigation to detail page: < 1s
- Auto-scroll animation: ~500ms
- Last read load from localStorage: < 10ms

### Memory Test:
- Last read storage: ~100 bytes
- No memory leaks on page switch
- Ref cleanup on unmount

---

**Last Updated**: April 16, 2026
**Status**: Ready for QA
