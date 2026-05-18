import { useState } from 'react';
import { shareToWhatsApp, shareToInstagram, shareToDiscord } from '../services/shareUtils';

// Komponen Share Button yang reusable
export const ShareButton = ({ surahName, ayatNumber = null, ayatText, translation, variant = 'inline' }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleShare = (platform) => {
    switch (platform) {
      case 'whatsapp':
        shareToWhatsApp(surahName, ayatNumber || '—', ayatText, translation);
        break;
      case 'instagram':
        shareToInstagram(surahName, ayatNumber || '—', ayatText, translation);
        break;
      case 'discord':
        shareToDiscord(surahName, ayatNumber || '—', ayatText, translation);
        break;
      default:
        break;
    }
    setIsOpen(false);
  };

  const handleCopy = () => {
    const text = `${ayatText}\n\n${translation}\n\n- ${surahName} ${ayatNumber ? `Ayat ${ayatNumber}` : ''}`;
    navigator.clipboard.writeText(text);
    alert('Teks disalin ke clipboard! 📋');
    setIsOpen(false);
  };

  if (variant === 'header') {
    return (
      <div className="flex justify-center gap-3 mt-6 flex-wrap">
        <button
          onClick={() => handleShare('whatsapp')}
          className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-semibold transition-all backdrop-blur text-white"
          title="Bagikan ke WhatsApp"
        >
          <span>💚</span>
          <span>WhatsApp</span>
        </button>
        
        <button
          onClick={() => handleShare('instagram')}
          className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-semibold transition-all backdrop-blur text-white"
          title="Bagikan ke Instagram"
        >
          <span>📸</span>
          <span>Instagram</span>
        </button>

        <button
          onClick={() => handleShare('discord')}
          className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-semibold transition-all backdrop-blur text-white"
          title="Bagikan ke Discord"
        >
          <span>🎮</span>
          <span>Discord</span>
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-3 py-1 rounded-lg text-sm font-semibold bg-blue-100 text-blue-600 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200 transition-all"
        title="Bagikan ke Media Sosial"
      >
        <span>📤</span>
        Bagikan
      </button>

      {/* Share Menu Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl shadow-lg z-10 py-2 w-48">
          {/* WhatsApp */}
          <button
            onClick={() => handleShare('whatsapp')}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors flex items-center gap-3 text-gray-700 dark:text-gray-200"
          >
            <span className="text-lg">💚</span>
            <span className="font-medium">WhatsApp</span>
          </button>

          {/* Instagram */}
          <button
            onClick={() => handleShare('instagram')}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors flex items-center gap-3 text-gray-700 dark:text-gray-200"
          >
            <span className="text-lg">📸</span>
            <span className="font-medium">Instagram</span>
          </button>

          {/* Discord */}
          <button
            onClick={() => handleShare('discord')}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors flex items-center gap-3 text-gray-700 dark:text-gray-200"
          >
            <span className="text-lg">🎮</span>
            <span className="font-medium">Discord</span>
          </button>

          {/* Divider */}
          <div className="my-2 border-t border-gray-200 dark:border-slate-700"></div>

          {/* Copy Text */}
          <button
            onClick={handleCopy}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors flex items-center gap-3 text-gray-700 dark:text-gray-200"
          >
            <span className="text-lg">📋</span>
            <span className="font-medium">Salin Teks</span>
          </button>
        </div>
      )}
    </div>
  );
};
