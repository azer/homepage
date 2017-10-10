const config = require("./config")

module.exports = {
  siteMetadata: {
    title: config.title,
    description: config.description
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/posts/`
      }
    },
    'gatsby-plugin-react-helmet',
    "gatsby-transformer-remark",
    "gatsby-transformer-json",
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: config.analytics
      }
    }
  ]
}
