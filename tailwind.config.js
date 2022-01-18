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
  },
  plugins: [],
};
