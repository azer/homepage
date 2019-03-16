import React, { Component } from "react"
import SimpleLayout from "../components/simple-layout"
import Newsletter from "../components/Newsletter"
import Link from "gatsby-link"
import ShareButtons from "../components/share-buttons"
import PatreonButton from "../components/patreon-button"
import "./blog-post.css"

import "prismjs/themes/prism-solarizedlight.css"

export default class BlogPostTemplate extends Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title

    return (
      <SimpleLayout
        name="blog-post"
        location={this.props.location}
        type="article"
        title={`${post.frontmatter.title} - ${siteTitle}'s Journal`}
        url={`http://azer.bike${post.frontmatter.path}`}
        desc={post.frontmatter.desc}
        image={post.frontmatter.image}
      >
        {this.renderTitle()}
        {this.renderImage()}
        <div
          className="post x-serif"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
        <Newsletter title="Did you like this article? Subscribe for new posts:" />
      </SimpleLayout>
    )
  }

  renderTitle() {
    const post = this.props.data.markdownRemark.frontmatter

    if (post.presentation) {
      return this.renderPresentationTitle()
    }

    return [
      <h1 className="x-headline center fw7 tc f1 near-black mb3">
        {post.title}
      </h1>,
      <h2 className="x-sans center fw4 tc f4 mid-gray mv2">
        {post.desc ? <span>{post.desc}</span> : null}
      </h2>,
      <h2 className="x-sans center fw4 tc f4 mid-gray mv0">{post.date}</h2>
    ]
  }

  renderPresentationTitle() {
    const post = this.props.data.markdownRemark.frontmatter

    return (
      <div className="presentation-title">
        <section>
          <h1 className="x-headline f-subheadline fw6">{post.title}</h1>
        </section>
      </div>
    )
  }

  renderImage() {
    const post = this.props.data.markdownRemark.frontmatter

    if (post.presentation) return null
    if (!post.image || post.hideImage || !post.image.trim())
      return <div className="post-image-space" />

    const css = {
      backgroundImage: `url(${post.image})`
    }

    if (post.imageHeight) {
      css.height = post.imageHeight
    }

    if (post.imageWidth) {
      css.width = post.imageWidth
    }

    if (post.imageMaxWidth) {
      css.maxWidth = post.imageMaxWidth
    }

    if (post.imageSize) {
      css.backgroundSize = post.imageSize
    }

    return (
      <div
        className={"post-image " + (post.imageCaption ? "has-caption" : "")}
        style={css}
      >
        {post.imageCaption ? (
          <div className="post-image-caption">{post.imageCaption}</div>
        ) : null}
      </div>
    )
  }
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    site {
      siteMetadata {
        title
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
        imageSize
        imageCaption
        imageMaxWidth
        hideImage
        presentation
        patreonButtonUnderTitle
        path
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
