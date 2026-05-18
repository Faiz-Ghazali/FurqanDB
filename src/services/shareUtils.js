// Share utility functions untuk WhatsApp, Instagram, dan Discord

// Fungsi untuk membagikan ke WhatsApp
export const shareToWhatsApp = (surahName, ayatNumber, ayatText, translation) => {
  const text = `Surat ${surahName} Ayat ${ayatNumber}\n\n📖 ${ayatText}\n\n🇮🇩 ${translation}\n\nDibaca dari Quran App`;
  const encodedText = encodeURIComponent(text);
  const whatsappUrl = `https://wa.me/?text=${encodedText}`;
  window.open(whatsappUrl, '_blank');
};

// Fungsi untuk membagikan ke Instagram (copy ke clipboard)
export const shareToInstagram = (surahName, ayatNumber, ayatText, translation) => {
  const text = `Surat ${surahName} Ayat ${ayatNumber}\n\n📖 ${ayatText}\n\n🇮🇩 ${translation}\n\n#Quran #Islam #AlQuran #Doa #Ayat`;
  copyToClipboard(text);
  alert('Teks telah disalin ke clipboard! Buka Instagram dan bagikan di status/caption Anda 💬');
};

// Fungsi untuk membagikan ke Discord (copy ke clipboard atau webhook)
export const shareToDiscord = (surahName, ayatNumber, ayatText, translation) => {
  const text = `**Surat ${surahName} Ayat ${ayatNumber}**\n\n📖 ${ayatText}\n\n🇮🇩 ${translation}\n\n*Dibaca dari Quran App*`;
  copyToClipboard(text);
  alert('Teks telah disalin ke clipboard! Paste di server Discord Anda 🎮');
};

// Fungsi helper untuk copy ke clipboard
const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text).then(() => {
    // Copy berhasil
    console.log('Text copied to clipboard');
  }).catch((err) => {
    // Fallback untuk browser lama
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  });
};

// Fungsi untuk membagikan full surat ke WhatsApp
export const shareFullSurahToWhatsApp = (surahName, jumlahAyat) => {
  const text = `Check out Surat ${surahName} (${jumlahAyat} Ayat) di Quran App! 📖✨`;
  const encodedText = encodeURIComponent(text);
  const whatsappUrl = `https://wa.me/?text=${encodedText}`;
  window.open(whatsappUrl, '_blank');
};

// Fungsi untuk membagikan dengan invitasi komunitas Discord
export const inviteDiscordServer = () => {
  const discordUrl = 'https://discord.gg/your-server-invite'; // Ganti dengan link server Anda
  window.open(discordUrl, '_blank');
};
