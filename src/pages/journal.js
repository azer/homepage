import React, { Component } from "react"
import Link from "gatsby-link"
import Helmet from "react-helmet"

import readingTime from "reading-time"
import Newsletter from "../components/Newsletter"
import PageHeader from "../components/page-header"
import SimpleLayout from "../components/simple-layout"
import Title from "../components/page-title"
import "./journal.css"

export default class Journal extends Component {
  componentWillMount() {
    this.years = {}
  }

  render() {
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
        <PageHeader image="https://cldup.com/D2xxKswINR.png">
          Notes on building software in modern times. Searching for healthier
          digital culture. Design, Linux, Emacs and infrequent travels.
        </PageHeader>

        {this.renderRecentlyPosted(
          this.props.data.allMarkdownRemark.edges.slice(0, 3)
        )}
        {this.renderArchive(this.props.data.allMarkdownRemark.edges.slice(3))}
        <Newsletter />
      </SimpleLayout>
    )
  }

  renderArchive(posts) {
    const years = {}

    return (
      <section className="section archive x-auto">
        <ul className="list pl0">
          {posts.map(post => {
            return [
              <li className="x-sans mid-gray mv4">
                <Link
                  className="x-sans no-underline dark-gray hover-near-black f4 lh-copy"
                  to={post.node.frontmatter.path}
                >
                  <aside className="silver x-mono">
                    {new Date(post.node.frontmatter.date).getFullYear()}
                  </aside>
                  <main>{post.node.frontmatter.title}</main>
                  <aside className="silver x-sans tr">
                    {readingTime(post.node.html).text}
                  </aside>
                </Link>
              </li>
            ]
          })}
        </ul>
      </section>
    )
  }

  renderRecentlyPosted(posts) {
    return (
      <div className="featured pv4">
        <Title>Recently Posted</Title>
        <div className="x-grid-3 featured-grid mt4">
          {posts.map(post => {
            const bg = {
              backgroundImage: `url(${post.node.frontmatter.image})`
            }

            return (
              <Link
                to={post.node.frontmatter.path}
                className="no-underline dark-gray hover-near-black"
              >
                <header style={bg} className="cover br3 bg-center" />
                <h2 className="x-sans f3 fw5 tc mb0">
                  {post.node.frontmatter.title}
                </h2>
                <h3 className="x-serif f5 tc mt2 mid-gray lh-copy">
                  {post.node.frontmatter.desc}
                </h3>
              </Link>
            )
          })}
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
          html
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
