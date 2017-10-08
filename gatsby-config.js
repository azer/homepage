module.exports = {
  siteMetadata: {
    title: `Azer Koçulu`,
    author: `Azer Koçulu`
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`
      }
    },
    "gatsby-transformer-remark",
    "gatsby-transformer-json"
  ]
}
