import { useEffect } from 'react';

export default function FavIcon() {
  useEffect(() => {
    // Create SVG favicon with Droplets icon matching the login page logo
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <rect width="100" height="100" fill="#ffffff" rx="20"/>
        <path d="M50 20 C50 20, 35 35, 35 50 C35 58.284, 41.716 65, 50 65 C58.284 65, 65 58.284, 65 50 C65 35, 50 20, 50 20 Z" fill="#2563eb"/>
        <path d="M50 35 C50 35, 42 43, 42 50 C42 54.418, 45.582 58, 50 58 C54.418 58, 58 54.418, 58 50 C58 43, 50 35, 50 35 Z" fill="#60a5fa"/>
      </svg>
    `;

    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);

    // Remove existing favicon
    const existingFavicon = document.querySelector("link[rel*='icon']");
    if (existingFavicon) {
      existingFavicon.remove();
    }

    // Create new favicon link
    const link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/svg+xml';
    link.href = url;
    document.head.appendChild(link);

    // Update title
    document.title = 'AquaOpt AI - Wastewater Optimization';

    return () => {
      URL.revokeObjectURL(url);
    };
  }, []);

  return null;
}
