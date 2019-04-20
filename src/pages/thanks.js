import React, { Component } from "react"
import SimpleLayout from "../components/simple-layout"
import Helmet from "react-helmet"
import Newsletter from "../components/Newsletter"
import PageHeader from "../components/page-header"
import projects from "../projects.json"
import Title from "../components/page-title"

export default class Software extends Component {
  render() {
    const title = `Thanks - ${this.props.data.site.siteMetadata.title}`

    return (
      <SimpleLayout
        name="software"
        location={this.props.location}
        type="website"
        title={title}
        desc="Kodfabrik Software"
        image="https://c1.staticflickr.com/5/4464/37192502570_f88f06f162_z.jpg"
      >
        <div className="x-fill-screen">
          <div className="b--light-gray">
            <h1 className="x-sans fw3 tc pv0 near-black">Thanks</h1>
            <h2 className="x-sans f4 tc mid-gray">
              You've subscribed to our newsletter. We'll ping you when there is
              some new stuff to share!
            </h2>
          </div>
        </div>
      </SimpleLayout>
    )
  }
}

export const pageQuery = graphql`
  query ThanksQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
