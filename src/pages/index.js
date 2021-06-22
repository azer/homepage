import React, { Component } from 'react'
import Link from 'gatsby-link'
import Intro from '../components/intro'
import Helmet from 'react-helmet'
import SimpleLayout from '../components/simple-layout'
import Button from '../components/Button'
import Textbox from '../components/Textbox'
import Newsletter from '../components/Newsletter'
import PageHeader from '../components/page-header'

import './index.css'

export default class Homepage extends Component {
  highlightedPosts() {
    return this.props.data.allMarkdownRemark.edges.filter(e => {
      return e.node.frontmatter.highlighted
    })
  }

  recentPosts() {
    return this.props.data.allMarkdownRemark.edges.slice(0, 5)
  }

  render() {
    return (
      <SimpleLayout
        name="index"
        location={this.props.location}
        title={this.props.data.site.siteMetadata.title}
        desc="My name is Azer Koçulu. I build software, also shoot photos."
        type="website"
        image="https://cldup.com/bI32PuTskq.jpg"
      >
        <PageHeader image="https://cldup.com/bI32PuTskq.jpg">
          <strong>Azer Koçulu</strong> is a Software Engineer based in Berlin.
          Lover of fast, minimalist experiences. Chief Technology Officer at
          HiPeople.
        </PageHeader>
        <div className="pt4 highlights-wrapper">
          <h1 className="x-sans fw3 tc pv0 mid-gray">Journal Highlights</h1>
          <section className="x-grid-4 mt4 highlights">
            {this.highlightedPosts()
              .slice(0, 4)
              .map((post, ind) => this.renderHighlightedPost(post, ind))}
          </section>
        </div>
        <Newsletter />
      </SimpleLayout>
    )
  }

  renderHighlightedPost(post, color) {
    const img = {
      backgroundImage: `url(${post.node.frontmatter.highlightImage ||
        post.node.frontmatter.image})`,
      backgroundPosition: `${post.node.frontmatter.highlightImagePosition ||
        'center center'}`,
      backgroundSize: `${post.node.frontmatter.highlightImageSize || 'cover'}`
    }

    return (
      <a
        href={post.node.frontmatter.path}
        className="highlighted-post x-noborder relative"
      >
        <header className="absolute top-0 tc bg-near-white w-100">
          <h4 className="x-mono silver mt0 mb1">
            {new Date(post.node.frontmatter.date).getFullYear()}
          </h4>

          <h2 className="f5 lh-copy ph3 mid-gray w-95">
            {post.node.frontmatter.title}
          </h2>
        </header>
        <div className="w-100 x-color-overlay image">
          <div className="w-100 h-100 x-grayscale" style={img} />
        </div>
      </a>
    )
  }
}

export const query = graphql`
  query HomepageQuery {
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
            highlighted
            highlightImage
            highlightImagePosition
            highlightImageSize
          }
          frontmatter {
            title
            image
          }
        }
      }
    }
  }
`
