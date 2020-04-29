import React, { Component } from "react"
import Link from "gatsby-link"
import links from "./menu-links.json"
import "./menu.css"

const emojiStyle = {
  width: 20,
  height: 20
}

export default class Menu extends Component {
  render() {
    return (
      <header className="menu x-sans f4 fw4">
        <div className="inner pb4 relative x-viewport">
          <a className="absolute x-inherit no-underline gray" href="/">
            Azer Koçulu
          </a>
          <a
            className="support-link absolute right-0 x-inherit no-underline gray br-pill bg-near-white hover-bg-light-gray hover-near-black"
            href="/patrons"
          >
            Patrons
          </a>
          <div className="links tc">
            {this.props.footer
              ? this.renderLink({ to: "/", title: "Homepage" })
              : null}
            {links.map((l, i) => this.renderLink(l, i))}
          </div>
          <div className="x-clear" />
        </div>
      </header>
    )
  }

  renderLink(l, i) {
    const location = this.props.location && this.props.location.pathname

    if (l.className === "footer-link" && !this.props.footer) return
    if (l.onlymobile) return

    const render = /^\w+:/.test(l.to)
      ? this.renderGlobalLink
      : this.renderLocalLink

    return [
      render.call(
        this,
        l.to,
        l.title,
        location === l.to || location === l.to + "/"
      )
    ]
  }

  renderLocalLink(to, title, selected) {
    return (
      <Link className={this.renderLinkClass(selected)} to={to}>
        {title}
      </Link>
    )
  }

  renderGlobalLink(to, title, selected) {
    return (
      <a className={this.renderLinkClass(selected)} href={to} target="_blank">
        {title}
      </a>
    )
  }

  renderLinkClass(selected) {
    const classes = ["x-inherit", "mh3", "no-underline"]

    if (selected) {
      classes.push("near-black", "x-default-cursor")
    } else {
      classes.push("hover-near-black", "gray", "x-inherit")
    }

    return classes.join(" ")
  }
}
