import { useEffect } from 'react';

export default function FavIcon() {
  useEffect(() => {
    // Remove all existing favicons
    document.querySelectorAll("link[rel*='icon']").forEach(el => el.remove());

    // Try loading from public folder first
    const publicFavicon = document.createElement('link');
    publicFavicon.type = 'image/svg+xml';
    publicFavicon.rel = 'icon';
    publicFavicon.href = '/favicon.svg?v=' + Date.now();
    document.head.appendChild(publicFavicon);

    // Fallback to data URL
    const svgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="#ffffff" rx="12"/><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#3B82F6"/><stop offset="100%" stop-color="#2563EB"/></linearGradient></defs><path d="M32 14c0 0-12 12-12 22 0 6.6 5.4 12 12 12s12-5.4 12-12c0-10-12-22-12-22z" fill="url(#g)"/><path d="M32 22c0 0-6 6-6 10 0 3.3 2.7 6 6 6s6-2.7 6-6c0-4-6-10-6-10z" fill="#60A5FA" opacity="0.5"/><circle cx="28" cy="30" r="3" fill="#93C5FD" opacity="0.7"/></svg>`;
    
    const svgBase64 = btoa(svgString);
    const dataUrl = `data:image/svg+xml;base64,${svgBase64}`;

    // Add fallback data URL favicon
    const fallbackLink = document.createElement('link');
    fallbackLink.type = 'image/svg+xml';
    fallbackLink.rel = 'shortcut icon';
    fallbackLink.href = dataUrl;
    document.head.appendChild(fallbackLink);

    // Update page title with emoji
    document.title = '💧 AquaOpt AI - Wastewater Optimization';
  }, []);

  return null;
}