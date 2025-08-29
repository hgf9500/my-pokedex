/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",// src 폴더 내의 모든 파일에서 Tailwind 클래스를 사용하도록 설정
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

