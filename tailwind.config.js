/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        // 🎨 لوحة الألوان المتفق عليها
        'dark-primary': '#2C2C2C',    // الخلفية الداكنة
        'beige': '#F0E5D8',           // النصوص والعناصر الفاتحة
        'cta': '#FF5722',             // الأزرار والعناصر الحيوية
        'secondary': '#FFD700',       // ذهبي خفيف
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 10px rgba(0,0,0,0.3)',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}