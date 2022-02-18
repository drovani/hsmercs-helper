const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,ts}"],
  theme: {
    extend: {
      colors: {
        protector: colors.red[800],
        fighter: colors.green[800],
        caster: colors.blue[800],
        arcane: colors.sky[100],
        fel: colors.violet[100],
        fire: colors.red[100],
        frost: colors.blue[100],
        holy: colors.amber[100],
        nature: colors.green[100],
        shadow: colors.zinc[100],
        'black-.2': 'rgba(0,0,0,.2)'
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
