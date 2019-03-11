import React, { Component } from "react"
import Menu from "./menu"
import SocialIcons from "./social-icons"
import Newsletter from "./newsletter"

import "./footer.css"

export default class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <div className="inner">
          {this.props.newsletter ? <Newsletter /> : null}
          <div className="footer-left">
            <Menu location={this.props.location} footer />
          </div>
          <div className="footer-right">
            <div className="quote">
              Where there is ruin, there is hope for a treasure. <br /> —
              Jalaladdin Rumi
            </div>
            <SocialIcons />
          </div>
          <div className="x-clear" />
        </div>
      </div>
    )
  }
}
