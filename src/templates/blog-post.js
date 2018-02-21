import React, { Component } from 'react'
import SimpleLayout from "../components/simple-layout"
import Newsletter from '../components/newsletter'
import Link from 'gatsby-link'
import { icons } from '../components/social-icons'
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
        <h1>{post.frontmatter.title}</h1>
        <h2>
          {post.frontmatter.desc ? <span>{post.frontmatter.desc}</span> : null}
          <span className="date">{post.frontmatter.date}</span>
        </h2>

        {this.renderImage()}
        <div className="post" dangerouslySetInnerHTML={{ __html: post.html }} />
        <div className="share-buttons">
          <a title="Share on Twitter" target="_blank" href={`https://twitter.com/intent/tweet?text=${encodeURI(post.frontmatter.title + '\nhttp://azer.bike' + post.frontmatter.path)}`} dangerouslySetInnerHTML={{ __html: icons[2].svg }}></a>
          <a className="fb" title="Share on Facebook" target="_blank" href={`https://www.facebook.com/sharer/sharer.php?u=${'http://azer.bike' + post.frontmatter.path}`} dangerouslySetInnerHTML={{ __html: icons[4].svg }}></a>
        </div>

        <div className="inline-newsletter">
          <div className="zigzag"></div>
          <Newsletter title="Did you like this article? Subscribe for new posts:" />
        </div>
      </SimpleLayout>
    )
  }

  renderImage() {
    const post = this.props.data.markdownRemark.frontmatter
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
        path
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
