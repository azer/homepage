import React, { Component } from "react"
import Link from "gatsby-link"
import Helmet from "react-helmet"
import formatDate from "format-date"
import Newsletter from "../components/newsletter"

import SimpleLayout from "../components/simple-layout"
import "./journal.css"

export default class Journal extends Component {
  componentWillMount() {
    this.years = {}
  }

  render() {
    const featured = this.props.data.allMarkdownRemark.edges[0]
    const posts = this.props.data.allMarkdownRemark.edges.slice(1)

    return (
      <SimpleLayout
        name="journal"
        location={this.props.location}
        type="website"
        title={`Journal - ${this.props.data.site.siteMetadata.title}`}
        desc="Technology, software engineering and nomadic life."
        url="https://kodfabrik.com/journal"
        image="https://cldup.com/go95bqT7sK.jpg"
      >
        <h1>Journal</h1>
        <h2>Technology, software engineering and nomadic life.</h2>

        {this.renderFeatured(featured.node.frontmatter)}
        {this.renderArchive(posts)}

        <div className="inline-newsletter">
          <div className="zigzag" />
          <Newsletter title="That's about it. Would you like to subscribe to new posts?" />
        </div>
      </SimpleLayout>
    )
  }

  renderFeatured(post) {
    const css = {
      backgroundImage: `url(${post.image})`
    }

    return (
      <div className="featured post">
        <div className="image" style={css} />

        <div className="title">
          <h4>{post.date}</h4>
          <h1>
            <Link to={post.path}>{post.title}</Link>
          </h1>
          <h2>{post.desc}</h2>
          <Link className="arrow" to={post.path}>
            <svg
              width="24px"
              height="12px"
              viewBox="0 0 24 12"
              data-reactid="819"
            >
              <polygon
                points="5.6,12 7,10.6 3.7,6.9 3.7,6.9 24,6.9 24,4.9 3.7,4.9 3.7,4.9 7,1.4 5.6,0 0,5.9 "
                data-reactid="820"
              />
            </svg>
          </Link>
        </div>
      </div>
    )
  }

  renderArchive(posts) {
    return (
      <div className="posts">
        {posts.map((post, i) =>
          this.renderArchiveLink(post.node.frontmatter, i)
        )}
      </div>
    )
  }

  renderArchiveLink(post, index) {
    return (
      <div className="post">
        {this.renderArchiveYear(post)}
        <div className="post-inner">
          <div className="date">
            {formatDate("{month-name} {day}", new Date(post.date))}
          </div>
          <div className="title">
            <Link to={post.path}>{post.title}</Link>
          </div>
        </div>
      </div>
    )
  }

  renderArchiveYear(post) {
    const year = new Date(post.date).getFullYear()
    if (this.years[year]) return null
    this.years[year] = true

    return (
      <div className="year">
        {year === new Date().getFullYear() ? "read more:" : year}
      </div>
    )
  }
}

export const query = graphql`
  query JournalQuery {
    site {
      siteMetadata {
        title
      }
    }

    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          frontmatter {
            path
            date(formatString: "DD MMMM, YYYY")
          }
          frontmatter {
            title
            desc
            image
            imageHeight
            presentation
          }
        }
      }
    }
  }
`
