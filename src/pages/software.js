import React, { Component } from 'react'
import SimpleLayout from '../components/simple-layout'
import Helmet from 'react-helmet'
import Newsletter from '../components/newsletter'
import projects from '../projects.json'
import "./software.css"

export default class Software extends Component {
  render() {
    const title = `Software Projects - ${this.props.data.site.siteMetadata.title}`

    return (
      <SimpleLayout name='software' location={this.props.location}>
        <Helmet title={title}>
          <meta property="og:type" content="website" />
	        <meta property="og:title" content={title} />
	        <meta property="og:url" content="http://azer.bike/software" />
	        <meta property="og:description" content="List of my personal projects." />
	        <meta property="og:image" content="https://cldup.com/go95bqT7sK.jpg" />
          <link rel="canonical" href="http://azer.bike/software" />
        </Helmet>
        <h1>Software<br />Projects</h1>
        <h2>The software I make is mirror of my personal life. I imagined, taught and planned them when I was hiking in a mountain or washing dishes at home. </h2>

        <div className="recent">
          <h3>
            Actively working on
          </h3>

          {projects.recent.map(p => this.renderRecentProject(p))}
        </div>

        <div className="opensource">
          <h3>
            Open Source
          </h3>

          {projects.opensource.map(p => this.renderRecentProject(p))}

          <a href="https://github.com/azer" className="github">More on Github &#10230;</a>
        </div>

        <div className="tea">
          <div className="triangle"></div>
          <img src="https://c1.staticflickr.com/5/4464/37192502570_f88f06f162_z.jpg" />
          <div className="circle"></div>
          <div className="caption">
            This is my home-office in Keliki Village near Ubud, where I turn tea into software.
          </div>
        </div>

        <div className="clear"></div>

        <div className="websites">
          <h3>
          Websites
          </h3>

          {projects.websites.map(p => this.renderRecentProject(p))}
        </div>

        <div className="old">
          <h3>
            Old / dead
          </h3>

          {projects.old.map(p => this.renderRecentProject(p))}
        </div>

        <div className="inline-newsletter">
          <div className="zigzag"></div>
          <Newsletter title="That's about it. You can subscribe my personal newsletter to get updates about my projects." />
        </div>
      </SimpleLayout>
    )
  }

  renderRecentProject(project) {
    return (
      <div className="recent-project">
        {project.logo ? this.renderLogo(project) : null}
        {project.screenshot ? this.renderScreenshot(project) : null}

        <a href={project.link}>{project.title}</a>
        —{project.description}
      </div>
    )
  }

  renderLogo(project) {
    return (
      <div className="logo">
        <img src={project.logo} />
      </div>
    )
  }

  renderScreenshot(project) {
    const css = {
      'backgroundImage': `url(${project.screenshot})`
    }

    return (
      <div className="screenshot">
        <div className="screenshot-img" style={css}></div>
      </div>
    )
  }
}

export const pageQuery = graphql`
  query SoftwareQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
