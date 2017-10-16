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
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: 'language-'
            }
          }
        ]
      }
    },
    "gatsby-transformer-json",
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: config.analytics
      }
    }

  ]
}
