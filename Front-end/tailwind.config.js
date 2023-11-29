/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        titre: "League Spartan",
        text: "Montserrat",
      },
      colors: {
        light: {
          White: "#FFFDFD",
          Yellow: "#FFD700",
          LightGray: "#CCCACA",
          TBlack: "#333333",
          TYellow: "#FFD700",
          TBleu: "#05004C",
          VCGray: "#626262",
          VCBlackGray: "#5C5C5C",
          VCYellow: "#DDB900",
          VCWhite: "#F5F3F3",
        },
        dark: {
          Black: "#000000",
          Yellow: "#FFD700",
          BlackGray: "#2C2C2C",
          TWhite: "#FFFFFF",
          TYellow: "#FFD700",
          TBleu: "#05004C",
          VCBlack: "#161616",
          VCYellow: "#DDB900",
          VCLightGray: "#626262",
          VCWhite: "#E0E0E0",
        },
      },
    },
  },
  plugins: [],
}

