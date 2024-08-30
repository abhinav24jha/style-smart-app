/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}", 
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        text_color:"#100F0F",
        bg_color: "#FEFFF5",
        red_one: "#BA142F",
        red_two: "#ED3352",
        cloth_bg: "#6F4A4A",
        insight_color: "#F3E8D2",
        pop_box_color: "#F7F8EF"
      },
      fontFamily: {
        b_bold: ["BalooBhai2-Bold", "sans-serif"],
        b_extrabold: ["BalooBhai2-ExtraBold", "sans-serif"],
        b_medium: ["BalooBhai2-Medium", "sans-serif"],
        b_regular: ["BalooBhai2-Regular", "sans-serif"],
        b_semibold: ["BalooBhai2-SemiBold", "sans-serif"],
      },
    },
  },
  plugins: [],
};
