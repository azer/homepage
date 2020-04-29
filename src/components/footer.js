import React, { Component } from "react"
import SocialIcons from "./social-icons"

import "./footer.css"

export default class Footer extends Component {
  render() {
    return (
      <footer className="pv5 bg-near-whited x-sans f4 mid-gray bg-near-white footer">
        <div className="x-viewport">
          Made in Berlin
          <i />
          <a href="/rss.xml">RSS</a>
          <i />
          <a href="mailto:azer@roadbeats.com">E-mail</a>
          <i />
          <a href="https://github.com/azer">Github</a>
          <i />
          <a href="https://goodreads.com/azer">GoodReads</a>
          <i />
          <a href="https://www.youtube.com/channel/UCPZsk0_jd3GuKjeIPilL4qA/videos">
            Youtube
          </a>
          <a href="#" className="top">
            ↑
          </a>
        </div>
      </footer>
    )
  }
}
