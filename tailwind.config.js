const colors = require("tailwindcss/colors");
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,ts}"],
  safelist:[
    'border-gray-800'
  ],
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
        "black-.2": "rgba(0,0,0,.2)",
      },
      backgroundImage: {
        cooldown: "url('/images/cooldown.png')",
        rare: "url('/images/rare.png')",
        epic: "url('/images/epic.png')",
        legendary: "url('/images/legendary.png')",
      },
    },
    textOutlineWidth: {
      1: "1px",
      2: "2px",
    },
    screens: {
      sm: "400px",
      md: "800px",
      lg: "1200px",
      xl: "1600px",
      "2xl": "2000px",
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "text-outline": (value) => ({
            "text-shadow": `0 0 ${value} black, 0 0 ${value} black, 0 0 ${value} black, 0 0 ${value} black`,
          }),
        },
        {
          values: theme("textOutlineWidth"),
        }
      );
    }),
  ],
};
