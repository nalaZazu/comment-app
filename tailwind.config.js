/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary:'#324152',
        replyBtn: "#5457b6",
        heading: "#324152",
      },
      backgroundColor: {
        replyBtn: "#5457b6",
      },
      variants: {
        fill: ["hover", "focus"], // this line does the trick
      },
      width:{
        40:'40.333333%',
        468:'468px',
        // 40 :'40rem'
      },
      height:{
        116:'116px'
      }
    },
  },
  plugins: [],
};
