import React, { Component } from "react"
import SimpleLayout from "../components/simple-layout"
import Helmet from "react-helmet"
import Newsletter from "../components/Newsletter"
import PageHeader from "../components/page-header"
import projects from "../projects.json"
import Title from "../components/page-title"
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
        desc="Kodfabrik Software"
        image="https://c1.staticflickr.com/5/4464/37192502570_f88f06f162_z.jpg"
      >
        <PageHeader
          image="https://66.media.tumblr.com/4202cff356bea5f618ea60e819ec45ab/tumblr_n55gs2ZGTi1tb0c1mo1_500.jpg"
          //image="https://66.media.tumblr.com/9957322c3ffecf4416655d9278e80b23/tumblr_ncc9fvGvsN1tb0c1mo1_500.jpg"
          // image="https://66.media.tumblr.com/ce851407a811648b62ea0cc1223d9474/tumblr_pmwckcfwME1tb0c1mo1_500.gif"
        >
          It all began with a spreadsheets app, fast and user-friendly one. That
          took me to a new city, new ideas, and new people.
        </PageHeader>

        {this.renderProjects()}
        <Newsletter />
      </SimpleLayout>
    )
  }

  renderProjects() {
    return (
      <main className="projects pv4 x-sans">
        <Title>Software Projects</Title>

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
              <br />
              <br />
              Conrad Irwin
              <br />
              CTO of Superhuman
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
      </main>
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
