export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/private/', '/admin/'],
      },
    ],
    sitemap: 'https://heintz-nordic-frezzen.dk/sitemap.xml',
    host: 'https://heintz-nordic-frezzen.dk',
  };
} 