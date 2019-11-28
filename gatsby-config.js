
const dotenv = require('dotenv')

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
})

console.info(process.env.CLIENT_ID)
console.info(process.env.CLIENT_SECRET)
console.info(process.env.DRUPAL_AUTH)

module.exports = {
  siteMetadata: {
    title: `Octahedroid`,
    description: `We do JAMstack`,
    author: `@jmolivas`,
    github: `https://github.com/octahedroid`,
    blog: `/#`,
    product: `/#`,
    docs: `/#`,
    siteUrl: 'http://example.com'
  },
  plugins: [
    {
      resolve: `gatsby-theme-octahedroid`,
      options: {
        root: __dirname,
        themePath: `${__dirname}/theme`
      }
    },
    {
      resolve: `gatsby-source-drupal`,
      options: {
        baseUrl: `https://dev-auth-webops.pantheonsite.io/`,
        apiBase: `api`, // optional, defaults to `jsonapi`
      },
    },
  ]
};
