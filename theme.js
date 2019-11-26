

const baseTheme = require('gatsby-theme-octahedroid/theme');

const myTheme = {
  ...baseTheme,
  colors: {
    ...baseTheme.colors,
    primary: '#D92121',
    secondary: '#542c85',
    accent: '#E8DA8B',
    darkShade: '#37375B',
    lightShade: '#F7F7F7'
  },
  height:{
    ...baseTheme.height,
    hero: '700px'
  },
  styles: {
    ...baseTheme.styles,
    h1: {
      ...baseTheme.heading,
      fontSize: "4rem",
    },
    h2: {
      ...baseTheme.heading,
      fontSize: "2.5rem",
    },
    h3: {
      ...baseTheme.heading,
      fontSize: "2rem",
    },
    h4: {
      ...baseTheme.heading,
      fontSize: "1.5rem",
    },
    h5: {
      ...baseTheme.heading,
      fontSize: "1.25rem",
      fontWeight: 'body',
    },
    h6: {
      ...baseTheme.heading,
      fontSize: "1rem",
    },
  }
}
// console.log(myTheme);
module.exports = myTheme;