import React, { Component } from 'react'
import "./intro.css"

const blocks = [
  `I spend most of my time thinking, reading and working on <a href="/software">my projects</a> in Ubud, Indonesia.
   <a href="https://github.com/azer/notebook">My public notebook</a> documents where I find inspiration and information for living.`,
  `Previously, I was working for numerous startups in San Francisco while living in Oakland. This was one of the most important experiences of my life, as I learnt a lot about the tech industry.`,
  `I've been actively contributing to open source projects since 2007. You can see some of my open source work on <a href="https://github.com/azer">Github</a>.
   I'm grateful for the progress open source has made over the years.`,
  `Interested in working on a project together ? I love building high-performance, user-friendly applications. Get in touch with me to learn more!`
]

export default class Info extends Component {
  render() {
    return (
      <div className="intro">
        <div className="blocks">
          {blocks.map(b => this.renderBlock(b))}
        </div>
      </div>
    )
  }

  renderBlock(html) {
    return (
      <div className="block" dangerouslySetInnerHTML={{__html: html}}></div>
    )
  }
}
