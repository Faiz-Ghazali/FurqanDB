# 📤 Fitur Share Quran App

Fitur share telah berhasil ditambahkan ke Quran App! Anda sekarang dapat berbagi ayat-ayat Al-Quran melalui berbagai platform media sosial.

## 🎯 Platform yang Didukung

### 1. **WhatsApp** 💚
- Bagikan ayat langsung ke kontak atau grup WhatsApp
- Teks akan terformat otomatis dengan nama surat, nomor ayat, dan terjemahan

### 2. **Instagram** 📸
- Teks ayat disalin ke clipboard
- Gunakan untuk caption atau story Instagram dengan hashtag #Quran #Islam #AlQuran
- Pop-up akan memberitahu bahwa teks sudah siap dipaste

### 3. **Discord** 🎮
- Teks ayat disalin ke clipboard dengan format Markdown
- Sempurna untuk server Discord agama atau studi Islam
- Formatted dengan bold untuk nama surat

## 📍 Lokasi Fitur Share

### Share di Header Surah
Tombol share untuk seluruh surat terletak di bagian header (bawah audio player):
- **💚 WhatsApp** - Bagikan surat ke WhatsApp
- **📸 Instagram** - Copy text untuk Instagram
- **🎮 Discord** - Copy text untuk Discord

### Share per Ayat
Setiap ayat memiliki tombol share dengan dropdown menu:
- Klik tombol **📤 Bagikan** untuk membuka menu
- Pilih platform yang diinginkan
- Ada opsi **📋 Salin Teks** untuk copy manual

## 📋 Format Teks Share

### WhatsApp
```
[Teks Arab]
[Teks Latin]
[Teks Indonesia]
- [Nama Surat] Ayat [Nomor]
Dibaca dari Quran App
```

### Instagram
```
[Format Text]#Quran #Islam #AlQuran #Doa #Ayat
```

### Discord
```
**[Nama Surat] Ayat [Nomor]**
[Teks Arab]
[Teks Indonesia]
*Dibaca dari Quran App*
```

## 🛠️ File yang Ditambahkan

### 1. `services/shareUtils.js`
File utility yang berisi fungsi-fungsi untuk share:
- `shareToWhatsApp()` - Membuka WhatsApp dengan teks yang sudah diformat
- `shareToInstagram()` - Copy text ke clipboard untuk Instagram
- `shareToDiscord()` - Copy text ke clipboard untuk Discord

### 2. `components/ShareButton.jsx`
Komponen Share Button yang reusable dengan 2 variant:
- `variant="inline"` - Inline button dengan dropdown menu (default)
- `variant="header"` - Header buttons untuk tampilan di bagian atas

### 3. Modified `pages/Detail.jsx`
- Menambahkan state `shareOpen` untuk manage dropdown menu
- Menambahkan tombol share di header surat
- Menambahkan dropdown menu share untuk setiap ayat

## 🚀 Cara Menggunakan Fitur Share

### Share Surat Lengkap
1. Buka halaman detail surat
2. Lihat tombol share di bawah audio player
3. Klik tombol platform yang diinginkan
4. Pesan akan terbuka di aplikasi yang sesuai

### Share Ayat Spesifik
1. Scroll ke ayat yang ingin dibagikan
2. Klik tombol **📤 Bagikan** pada ayat tersebut
3. Pilih platform dari dropdown menu
4. Untuk Instagram/Discord, teks sudah siap di clipboard

## 💡 Tips

- **Salin Teks**: Gunakan opsi "Salin Teks" jika ingin membagikan ke platform lain
- **Customize Share**: Edit teks di `shareUtils.js` untuk menambahkan hastag atau format custom
- **Mobile Friendly**: Semua fitur share bekerja sempurna di mobile

## 📦 Dependensi

Tidak ada dependensi tambahan yang diperlukan! Fitur share menggunakan:
- Native Web APIs (`navigator.clipboard`)
- WhatsApp Web API
- Tailwind CSS untuk styling

## 🔮 Fitur Masa Depan

Beberapa ide untuk pengembangan lebih lanjut:
- [ ] Share ke Telegram
- [ ] Share ke Facebook
- [ ] Generate gambar quote ayat
- [ ] Share ke TikTok
- [ ] Webhook untuk server Discord custom
- [ ] Analytics tracking

---

**Updated**: April 16, 2026
**Status**: ✅ Aktif & Siap Digunakan
