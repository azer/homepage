import React, { Component } from "react"
import Link from "gatsby-link"
import SocialIcons from "./social-icons"
import links from "./menu-links.json"
import "./burger-menu.css"

const emojiStyle = {
  width: 20,
  height: 20
}

export default class BurgerMenu extends Component {
  toggle() {
    this.setState({
      open: !(this.state && this.state.open)
    })
  }

  render() {
    const classes = ["burger-menu", "x-sans"]
    if (this.state && this.state.open) classes.push("open")

    return (
      <div className={classes.join(" ")}>
        <div className="hamburger" onClick={() => this.toggle()} />
        <div className="header">
          <h1>
            <a href="/">Azer Koçulu</a>
          </h1>
        </div>

        <div className="burger-content">
          <h2 className="x-mono">Menu</h2>
          {links.map(l => this.renderLink(l))}

          <h2 className="social-media x-mono">links</h2>
          <SocialIcons />
        </div>
      </div>
    )
  }

  renderLink(l) {
    if (l.className === "footer-link") return

    return (
      <a className="button x-sans" href={l.to}>
        {l.title}
      </a>
    )
  }
}
