import React from 'react';
import { ChurchLogoConfig } from '../types/church';

interface GMAHKLogoProps {
  config?: ChurchLogoConfig;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark' | 'color';
  className?: string;
  showText?: boolean;
}

export const GMAHKLogo: React.FC<GMAHKLogoProps> = ({
  config,
  size = 'md',
  variant = 'color',
  className = '',
  showText,
}) => {
  const isCustom = config?.activeType === 'custom' && Boolean(config.customLogoUrl);
  const shouldShowText = showText !== undefined ? showText : config?.showText ?? true;

  const sizeDimensions = {
    sm: { icon: 32, box: 'h-8', text: 'text-sm font-bold', subText: 'text-[10px]' },
    md: { icon: 44, box: 'h-11', text: 'text-base font-bold', subText: 'text-xs' },
    lg: { icon: 56, box: 'h-14', text: 'text-lg font-bold', subText: 'text-xs' },
    xl: { icon: 80, box: 'h-20', text: 'text-2xl font-extrabold', subText: 'text-sm' },
  }[size];

  // SVG flame and open bible colors
  const flameGradientId = `gmahk-flame-${variant}`;

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {isCustom ? (
        <img
          src={config?.customLogoUrl}
          alt={config?.logoText || 'Logo Gereja'}
          className={`${sizeDimensions.box} aspect-square object-contain rounded-lg shadow-sm`}
          referrerPolicy="no-referrer"
          onError={(e) => {
            // fallback to SVG if image fails
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
      ) : (
        <div className={`relative flex items-center justify-center shrink-0 ${sizeDimensions.box} aspect-square`}>
          <svg
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full drop-shadow-sm transition-transform duration-300 hover:scale-105"
          >
            <defs>
              <linearGradient id={flameGradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2563eb" />
                <stop offset="50%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#60a5fa" />
              </linearGradient>
              <linearGradient id="gold-flame" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#d97706" />
              </linearGradient>
              <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.15" />
              </filter>
            </defs>

            {/* Background Shield/Circle glow */}
            <circle cx="60" cy="60" r="56" fill="url(#gmahk-flame-color)" fillOpacity="0.08" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="3 3" />

            {/* Flame Right Wing (Outer Flame) */}
            <path
              d="M60 22 C78 35 96 55 92 82 C89 98 72 100 64 94 C76 88 82 72 74 58 C68 47 62 36 60 22 Z"
              fill={variant === 'light' ? '#ffffff' : '#1d4ed8'}
              fillOpacity={variant === 'light' ? '0.9' : '0.88'}
            />

            {/* Flame Left Wing (Outer Flame) */}
            <path
              d="M60 22 C42 35 24 55 28 82 C31 98 48 100 56 94 C44 88 38 72 46 58 C52 47 58 36 60 22 Z"
              fill={variant === 'light' ? '#ffffff' : '#2563eb'}
              fillOpacity={variant === 'light' ? '0.9' : '0.88'}
            />

            {/* Center Ascending Flame */}
            <path
              d="M60 12 C65 26 71 42 66 58 C63 68 57 68 54 58 C49 42 55 26 60 12 Z"
              fill={variant === 'light' ? '#fde68a' : '#f59e0b'}
            />

            {/* The Open Bible (Base Foundation) */}
            <path
              d="M26 86 C40 82 54 84 60 88 C66 84 80 82 94 86 C94 92 80 90 60 94 C40 90 26 92 26 86 Z"
              fill={variant === 'light' ? '#ffffff' : '#1e3a8a'}
            />
            <path
              d="M26 89 C40 85 54 87 60 91 C66 87 80 85 94 89 C94 94 80 92 60 96 C40 92 26 94 26 89 Z"
              fill={variant === 'light' ? '#cbd5e1' : '#0f172a'}
            />

            {/* The Central Cross (Redemption in Christ) */}
            <g filter="url(#shadow)">
              {/* Vertical beam */}
              <rect
                x="56.5"
                y="36"
                width="7"
                height="48"
                rx="1.5"
                fill={variant === 'light' ? '#ffffff' : '#ffffff'}
                stroke={variant === 'light' ? '#1d4ed8' : '#1e3a8a'}
                strokeWidth="1"
              />
              {/* Horizontal beam */}
              <rect
                x="44"
                y="48"
                width="32"
                height="7"
                rx="1.5"
                fill={variant === 'light' ? '#ffffff' : '#ffffff'}
                stroke={variant === 'light' ? '#1d4ed8' : '#1e3a8a'}
                strokeWidth="1"
              />
            </g>

            {/* Tiny accent spark at top */}
            <circle cx="60" cy="11" r="2" fill="#fbbf24" />
          </svg>
        </div>
      )}

      {shouldShowText && (
        <div className="flex flex-col justify-center">
          <span
            className={`font-display tracking-tight leading-tight uppercase ${sizeDimensions.text} ${
              variant === 'light' ? 'text-white' : 'text-slate-900'
            }`}
          >
            {config?.logoText || 'GMAHK SALILI'}
          </span>
          <span
            className={`font-semibold tracking-wider uppercase leading-none ${sizeDimensions.subText} ${
              variant === 'light' ? 'text-blue-200' : 'text-blue-600'
            }`}
          >
            {config?.logoSubtitle || 'SIAU TENGAH - SITARO'}
          </span>
        </div>
      )}
    </div>
  );
};
