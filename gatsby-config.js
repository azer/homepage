module.exports = {
  siteMetadata: {
    title: `Azer Koçulu`,
    author: `Azer Koçulu`
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    "gatsby-transformer-remark",
    "gatsby-transformer-json",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-64576199-4'
      }
    }
  ]
}
