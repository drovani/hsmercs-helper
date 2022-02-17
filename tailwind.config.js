const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,ts}"],
  theme: {
    extend: {
      colors: {
        protector: colors.red[800],
        "protector-light": colors.red[400],
        fighter: colors.green[800],
        "fighter-light": colors.green[400],
        caster: colors.blue[800],
        "caster-light": colors.blue[400],
        arcane: colors.sky[100],
        fel: colors.violet[100],
        fire: colors.red[100],
        frost: colors.blue[100],
        holy: colors.amber[100],
        nature: colors.green[100],
        shadow: colors.zinc[100],
      },
    },
    screens: {
      sm: "400px",
      md: "800px",
      lg: "1200px",
      xl: "1600px",
      "2xl": "2000px",
    },
  },
  plugins: [],
};
