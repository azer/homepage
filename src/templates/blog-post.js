import React, { Component } from 'react'
import SimpleLayout from "../components/simple-layout"
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import "./blog-post.css"

export default class BlogPostTemplate extends Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const title = `${post.frontmatter.title} - ${siteTitle}'s Journal`
    const url = `http://azer.bike/journal${post.frontmatter.path}`

    return (
      <SimpleLayout name="blog-post" location={this.props.location}>
        <Helmet title={title}>
          <meta property="og:type" content="article" />
	        <meta property="og:title" content={title} />
	        <meta property="og:url" content={url} />
	        <meta property="og:description" content={post.frontmatter.desc} />
	        <meta property="og:image" content={post.frontmatter.image} />
          <link rel="canonical" href={url} />
        </Helmet>

        <h1>{post.frontmatter.title}</h1>
        <h2>
          {post.frontmatter.desc ? <span>{post.frontmatter.desc}</span> : null}
          <span className="date">{post.frontmatter.date}</span>
        </h2>

        {this.renderImage()}
        <div className="post" dangerouslySetInnerHTML={{ __html: post.html }} />
      </SimpleLayout>
    )
  }

  renderImage() {
    const post = this.props.data.markdownRemark.frontmatter
    if (!post.image) return

    const css = {
      backgroundImage: `url(${post.image})`
    }

    if (post.imageHeight) {
      css.height = post.imageHeight
    }

    return (
      <div className="post-image" style={css}>
      </div>
    )
  }
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      id
      html
      frontmatter {
        title
        desc
        image
        imageHeight
        path
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
