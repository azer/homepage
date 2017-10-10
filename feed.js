module.exports = {
  resolve: "gatsby-plugin-feed",
  options: {
    setup(ref) {
      const ret = ref.query.site.siteMetadata.rssMetadata;
      ret.allMarkdownRemark = ref.query.allMarkdownRemark;
      ret.generator = "GatsbyJS Material Starter";
      return ret;
    },
    query: `
        {
          site {
            siteMetadata {
              rssMetadata {
                site_url
                feed_url
                title
                description
                image_url
                author
                copyright
              }
            }
          }
        }
      `,
    feeds: [
      {
        serialize(ctx) {
          const rssMetadata = ctx.query.site.siteMetadata.rssMetadata;
          return ctx.query.allMarkdownRemark.edges.map(edge => ({
            categories: edge.node.frontmatter.tags,
            date: edge.node.frontmatter.date,
            title: edge.node.frontmatter.title,
            description: edge.node.excerpt,
            author: rssMetadata.author,
            url: rssMetadata.site_url + edge.node.fields.slug,
            guid: rssMetadata.site_url + edge.node.fields.slug,
            custom_elements: [{ "content:encoded": edge.node.html }]
          }));
        },
        query: `
            {
              allMarkdownRemark(
                limit: 1000,
                sort: { order: DESC, fields: [frontmatter___date] },
              ) {
                edges {
                  node {
                    excerpt
                    html
                    timeToRead
                    fields { slug }
                    frontmatter {
                      title
                      cover
                      date
                      category
                      tags
                    }
                  }
                }
              }
            }
          `,
        output: '/rss.xml'
      }
    ]
  }
}
