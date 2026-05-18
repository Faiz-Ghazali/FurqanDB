// Skeleton adalah placeholder yang tampil saat loading
// Memberikan pengalaman pengguna yang lebih baik

// CSS untuk animasi loading circle
const skeletonStyles = `
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes fadeInOut {
    0%, 100% {
      opacity: 0.3;
    }
    50% {
      opacity: 1;
    }
  }

  .spinner-circle {
    animation: spin 1.5s linear infinite;
  }

  .pulse-bg {
    animation: fadeInOut 2s ease-in-out infinite;
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = skeletonStyles;
  document.head.appendChild(styleSheet);
}

// Skeleton untuk card surat di halaman Home dengan loading circle
export const SkeletonCard = () => (
  <div className="bg-white border border-gray-200 rounded-2xl shadow-md dark:bg-slate-900 dark:border-slate-700 p-6 h-32 flex items-center justify-center">
    <div className="relative w-8 h-8">
      <svg
        className="spinner-circle"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
          style={{ color: '#10b981' }}
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          style={{ color: '#10b981' }}
        ></path>
      </svg>
    </div>
  </div>
);

// Skeleton untuk detail ayat di halaman Detail
export const SkeletonAyat = () => (
  <div className="space-y-6">
    {[...Array(3)].map((_, i) => (
      <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-gray-200 dark:border-slate-700 space-y-4">
        <div className="flex items-center justify-center">
          <div className="relative w-8 h-8">
            <svg
              className="spinner-circle"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                style={{ color: '#10b981' }}
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                style={{ color: '#10b981' }}
              ></path>
            </svg>
          </div>
        </div>
        <div className="pulse-bg h-4 bg-gray-200 dark:bg-slate-700 rounded w-3/4 mx-auto"></div>
        <div className="pulse-bg h-4 bg-gray-200 dark:bg-slate-700 rounded w-full"></div>
      </div>
    ))}
  </div>
);
