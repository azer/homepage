import React, { Component } from 'react'
import Link from 'gatsby-link'
import SocialIcons from './social-icons'
import links from './menu-links.json'
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
    const classes = ['burger-menu']
    if (this.state && this.state.open) classes.push('open')

    return (
      <div className={classes.join(' ')}>
        <div className="hamburger" onClick={() => this.toggle()}></div>
          <div className="header">
            <h1>
              <img src="https://c1.staticflickr.com/5/4353/37319896181_52a796bcc7.jpg" />
              <a href="/">Azer Koçulu</a>
            </h1>
          </div>

        <div className="burger-content">
          <h2>Menu</h2>
          {links.map(l => this.renderLink(l))}

          <h2 className="social-media">links</h2>
          <SocialIcons />
        </div>
      </div>
    )
  }

  renderLink(l) {
    if (l.className === 'footer-link') return

    return (
      <a className="button" href={l.to}>
        {l.title}
      </a>
    )
  }
}
