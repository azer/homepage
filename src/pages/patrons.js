import React, { Component } from "react"
import SimpleLayout from "../components/simple-layout"
import Helmet from "react-helmet"
import PageHeader from "../components/page-header"
import projects from "../projects.json"
import Title from "../components/page-title"
import Button from "../components/Button"
import "./patrons.css"

const patrons = [
  {
    name: "Robert Edwards",
    plan: "Coffee Sponsor",
    amount: "$5",
    since: "11.2018"
  },
  {
    name: "Razzi Abuissa",
    plan: "Tea Sponsor",
    amount: "$2",
    since: "12.2018"
  },
  {
    name: "Jan Peteler",
    plan: "Lunch Sponsor",
    amount: "$10",
    since: "10.2019"
  }
]

export default class Patrons extends Component {
  render() {
    const title = `Patrons - ${this.props.data.site.siteMetadata.title}`

    return (
      <SimpleLayout
        name="software"
        location={this.props.location}
        type="website"
        title={title}
        desc="Kodfabrik Software"
        image="https://cldup.com/gHZhiEuCEP.jpg"
      >
        <PageHeader
          image="https://cldup.com/gHZhiEuCEP.jpg"
          // image="https://66.media.tumblr.com/4202cff356bea5f618ea60e819ec45ab/tumblr_n55gs2ZGTi1tb0c1mo1_500.jpg"
          //image="https://66.media.tumblr.com/9957322c3ffecf4416655d9278e80b23/tumblr_ncc9fvGvsN1tb0c1mo1_500.jpg"
          // image="https://66.media.tumblr.com/ce851407a811648b62ea0cc1223d9474/tumblr_pmwckcfwME1tb0c1mo1_500.gif"
        >
          Support for my projects come from{" "}
          <a href="https://patreon.com/azerkoculu">Patreon</a>. Your support
          will help me deliver more open source software and documentation.
        </PageHeader>
        <main className="projects patrons pv4 x-sans">
          <Title>Current Patrons</Title>
          <div className="patrons-list">
            I'm thankful for receiving support from following people;
            <ul>{patrons.map(renderPatron)}</ul>
            <Button href="https://www.patreon.com/join/azerkoculu?">
              Become a patron
            </Button>
          </div>
        </main>
      </SimpleLayout>
    )
  }
}

function renderPatron(patron) {
  return (
    <li>
      <label>{patron.name}</label>—{patron.plan} since {patron.since}
    </li>
  )
}

export const pageQuery = graphql`
  query PatronsQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
