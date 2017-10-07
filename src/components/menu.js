import React, { Component } from 'react'
import Emojify from 'react-emojione'
import Link from 'gatsby-link'
import links from './menu-links.json'
import "./menu.css"

const emojiStyle = {
  width: 20,
  height: 20
}

export default class Menu extends Component {
  render() {
    return (
      <div className="menu">
        <div className="links">
          {this.props.footer ? this.renderLogo('Homepage') : null}
          {links.map((l, i) => this.renderLink(l, i))}
        </div>
      </div>
    )
  }

  renderLink(l, i) {
    const location = this.props.location && this.props.location.pathname

    if (l.className === 'footer-link' && !this.props.footer) return

    const className = location === l.to ? `${l.className || ""} selected` : l.className

    return ([
      <Link className={className} to={l.to}>
        <span className="emoji">
          <Emojify style={emojiStyle}>{l.emoji}</Emojify>
        </span>
        {l.title}
      </Link>,
      i == 1 && !this.props.footer && location !== '/' ? this.renderLogo() : null
    ])
  }

  renderLogo(caption) {
    return (
      <a className="logo" href="/">
        <img src="https://c1.staticflickr.com/5/4353/37319896181_52a796bcc7.jpg" />
        {caption || "Azer Koçulu"}
      </a>
    )
  }
}
