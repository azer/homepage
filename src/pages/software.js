import React, { Component } from "react"
import SimpleLayout from "../components/simple-layout"
import Helmet from "react-helmet"
import Newsletter from "../components/newsletter"
import projects from "../projects.json"
import "./software.css"

export default class Software extends Component {
  render() {
    const title = `Software Projects - ${
      this.props.data.site.siteMetadata.title
    }`

    return (
      <SimpleLayout
        name="software"
        location={this.props.location}
        type="website"
        title={title}
        desc="List of my personal projects."
        image="https://c1.staticflickr.com/5/4464/37192502570_f88f06f162_z.jpg"
      >
        <h1>
          Software
          <br />
          Projects
        </h1>
        <h2>I enjoy building high-performance, user-friendly applications.</h2>

        <div className="recent">
          <h3>Actively working on</h3>

          {projects.recent.map(p => this.renderRecentProject(p))}
        </div>

        <div className="clients">
          <h3>My most recent client was superhuman:</h3>
          <div className="superhuman">
            <img src="https://cldup.com/Wj7n50mV13.png" />
            <span className="quote">&#x201c;</span>
            <p>
              Azer is a phenomenal problem solver, and a great asset on any
              engineering team. He worked with us on a very high risk project,
              and it's now in production for all of our users.
              <strong>
                Conrad Irwin
                <br />
                CTO of Superhuman
              </strong>
            </p>
            <div className="x-clear" />
          </div>
        </div>

        <div className="opensource">
          <h3>Open Source</h3>

          {projects.opensource.map(p => this.renderRecentProject(p))}

          <a href="https://github.com/azer" className="github">
            More on Github &#10230;
          </a>
        </div>

        <div className="tea">
          <div className="triangle" />
          <img src="https://c1.staticflickr.com/5/4464/37192502570_f88f06f162_z.jpg" />
          <div className="circle" />
          <div className="caption">
            This is my home-office in Berlin, where I turn tea into software.
          </div>
        </div>

        <div className="x-clear" />

        <div className="websites">
          <h3>Websites</h3>

          {projects.websites.map(p => this.renderRecentProject(p))}
        </div>

        <div className="old">
          <h3>Old / dead</h3>

          {projects.old.map(p => this.renderRecentProject(p))}
        </div>

        <div className="inline-newsletter">
          <div className="zigzag" />
          <Newsletter title="That's about it. You can subscribe my personal newsletter to hear updates on my projects." />
        </div>
      </SimpleLayout>
    )
  }

  renderRecentProject(project) {
    return (
      <div className="recent-project">
        {project.logo ? this.renderLogo(project) : null}
        {project.screenshot ? this.renderScreenshot(project) : null}
        <a href={project.link}>{project.title}</a>—{project.description}
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
      backgroundImage: `url(${project.screenshot})`
    }

    return (
      <div className="screenshot">
        <div className="screenshot-img" style={css} />
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
