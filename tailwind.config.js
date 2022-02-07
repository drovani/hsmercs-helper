const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,ts}"],
  theme: {
    extend: {
      colors: {
        protector: colors.red[800],
        fighter: colors.green[800],
        caster: colors.blue[800],
      },
    },
    screens: {
      sm: "400px",
      md: "800px",
      lg: "1200px",
      xl: "1600px",
    },
  },
  plugins: [],
};
