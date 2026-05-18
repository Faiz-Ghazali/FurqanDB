// ============================================================
// CONTOH PENGGUNAAN SHAREBUTTON COMPONENT (REUSABLE)
// ============================================================

// File: pages/ExamplePage.jsx
import { ShareButton } from '../components/ShareButton';

const ExamplePage = () => {
  const surahName = 'Al-Fatihah';
  const ayatNumber = 1;
  const ayatText = 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ';
  const translation = 'Segala puji bagi Allah, Tuhan semesta alam.';

  return (
    <div className="p-4">
      {/* VARIANT 1: INLINE DENGAN DROPDOWN (Default) */}
      <h2>Share Ayat Spesifik</h2>
      <ShareButton 
        surahName={surahName}
        ayatNumber={ayatNumber}
        ayatText={ayatText}
        translation={translation}
      />

      {/* VARIANT 2: HEADER BUTTONS */}
      <h2>Share Seluruh Surat</h2>
      <ShareButton 
        surahName={surahName}
        ayatText={`Baca Surat ${surahName}`}
        translation="Click tombol untuk bagikan"
        variant="header"
      />
    </div>
  );
};

export default ExamplePage;

// ============================================================
// DOKUMENTASI PROPS
// ============================================================

/*
ShareButton Props:
- surahName (string, required): Nama surat (contoh: "Al-Fatihah")
- ayatNumber (number, optional): Nomor ayat (contoh: 1)
- ayatText (string, required): Teks arab ayat
- translation (string, required): Terjemahan Indonesia
- variant (string, optional): 
  * 'inline' (default) - Inline button dengan dropdown menu
  * 'header' - Header buttons dengan styling lebih besar

Output:
- Akan membuka platform share sesuai pilihan user
- Untuk Instagram & Discord, text dicopy ke clipboard
- Untuk WhatsApp, akan membuka WhatsApp Web
*/

// ============================================================
// CONTOH PENGGUNAAN DI DETAIL.JSX
// ============================================================

/*
import { ShareButton } from '../components/ShareButton';

// Di dalam DetailSurah component:
<ShareButton 
  surahName={detailSurah.namaLatin}
  ayatNumber={ayat.nomorAyat}
  ayatText={ayat.teksArab}
  translation={ayat.teksIndonesia}
/>
*/

// ============================================================
// CONTOH PENGGUNAAN DI BOOKMARKS.JSX
// ============================================================

/*
{bookmark.map((item) => (
  <div key={item.id}>
    <ShareButton 
      surahName={item.surahName}
      ayatNumber={item.ayatNumber}
      ayatText={item.ayatText}
      translation={item.translation}
    />
  </div>
))}
*/

// ============================================================
// CUSTOM STYLING (Optional)
// ============================================================

/*
Untuk styling custom, bisa edit file ShareButton.jsx:
- Ubah color scheme dari blue-100 menjadi warna lain
- Tambah custom className
- Modifikasi ukuran button
- Tambah loading state
*/

// ============================================================
// INTEGRASI DENGAN REDUX (Optional)
// ============================================================

/*
Jika ingin tracking share events:

1. Tambah di quranSlices.js:
```javascript
addShareCount: (state, action) => {
  state.shareStats = state.shareStats || {};
  state.shareStats[action.payload.platform] = 
    (state.shareStats[action.payload.platform] || 0) + 1;
}
```

2. Modifikasi shareUtils.js:
```javascript
export const shareToWhatsApp = (surahName, ayatNumber, ayatText, translation, dispatch) => {
  // ... existing code
  dispatch(addShareCount({ platform: 'whatsapp' }));
};
```
*/

// ============================================================
// TROUBLESHOOTING
// ============================================================

/*
1. Teks tidak dicopy ke clipboard:
   - Periksa browser support untuk clipboard API
   - Gunakan HTTPS untuk production
   - Firefox memerlukan permission tambahan

2. WhatsApp tidak terbuka:
   - Pastikan WhatsApp sudah diinstall
   - Gunakan WhatsApp Web di desktop
   - Check console untuk error messages

3. Dropdown tidak muncul:
   - Pastikan onClick handler berfungsi
   - Check CSS z-index conflict
   - Verify state management
*/
