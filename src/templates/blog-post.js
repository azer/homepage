import React, { Component } from 'react'
import SimpleLayout from "../components/simple-layout"
import Newsletter from '../components/newsletter'
import Link from 'gatsby-link'
import ShareButtons from '../components/share-buttons'
import "./blog-post.css"

import "prismjs/themes/prism-solarizedlight.css"

export default class BlogPostTemplate extends Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title

    return (
      <SimpleLayout name="blog-post"
                    location={this.props.location}
                    type="article"
                    title={`${post.frontmatter.title} - ${siteTitle}'s Journal`}
                    url={`http://azer.bike${post.frontmatter.path}`}
                    desc={post.frontmatter.desc}
                    image={post.frontmatter.image}>
        {this.renderTitle()}
        {this.renderImage()}
        <div className="post" dangerouslySetInnerHTML={{ __html: post.html }} />
        <ShareButtons title={post.frontmatter.title} path={post.frontmatter.path} />
        <div className="inline-newsletter">
          <div className="zigzag"></div>
          <Newsletter title="Did you like this article? Subscribe for new posts:" />
        </div>
      </SimpleLayout>
    )
  }

  renderTitle() {
    const post = this.props.data.markdownRemark.frontmatter

    if (post.presentation) {
      return this.renderPresentationTitle()
    }

    return [
      (<h1>{post.title}</h1>),
      (<h2>{post.desc ? <span>{post.desc}</span> : null} <span className="date">{post.date}</span> </h2>)
    ]
  }

  renderPresentationTitle() {
    const post = this.props.data.markdownRemark.frontmatter

    return (
      <div className="presentation-title">
        <section>
          <h1>{post.title}</h1>
          <h2><span className="date">Last Update: {post.date}</span> </h2>
        </section>
      </div>
    )
  }

  renderImage() {
    const post = this.props.data.markdownRemark.frontmatter

    if (post.presentation) return null
    if (!post.image || post.hideImage || !post.image.trim()) return <div className="post-image-space"></div>

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
      <div className={"post-image " + (post.imageCaption ? "has-caption" : "")} style={css}>
        {post.imageCaption ? <div className="post-image-caption">{post.imageCaption}</div> : null}
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
        path
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
