import React, { Component } from 'react'
import Link from 'gatsby-link'
import Intro from '../components/intro'
import Helmet from 'react-helmet'
import CenteredLayout from '../components/centered-layout'
import "./index.css"

export default class Homepage extends Component {
  render() {
    return (
      <CenteredLayout name="index" location={this.props.location}>
        <Helmet title={this.props.data.site.siteMetadata.title} />
        <div className="columns">
          {this.renderIntro()}
          {this.renderPhoto()}
        </div>
     </CenteredLayout>
    )
  }

  renderIntro() {
    return (
      <div className="left column">
        <h1 className="title">
          I build software.
        </h1>
        <h2>
          My name is <strong>Azer Koçulu</strong>. I recently founded <a href="http://getkozmos.com">Kozmos</a>, a better bookmarking service for everyone.
        </h2>
        <Intro />
        <a href="mailto:azer@roadbeats.com" className="lets-work-together">Let's work together</a>
      </div>
    )
  }

  renderPhoto() {
    return (
      <div className="right column">
        <img className="profile-picture" src="https://c1.staticflickr.com/5/4353/37319896181_52a796bcc7.jpg" />
      </div>
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
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
