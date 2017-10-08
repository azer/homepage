import React, { Component } from "react"
import "./newsletter.css"

export default class Newsletter extends Component {
  render() {
    const hidden = {
      position: 'absolute',
      left: '-9999px'
    }

    return (
      <div className="newsletter">
        {this.props.title ? <h1>{this.props.title}</h1> : <h1>Every week, I share inspiration, <br /> knowledge and some updates via e-mail.</h1>}
        <form action="//roadbeats.us14.list-manage.com/subscribe/post?u=9fe3d3623b0c1f52fa42d45f3&amp;id=bdb32a67af" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank" novalidate>
          <div id="mc_embed_signup_scroll">
	          <input type="email" name="EMAIL" className="email" id="mce-EMAIL" placeholder="your@email.com" required />
            <div style={hidden} aria-hidden="true">
              <input type="text" name="b_9fe3d3623b0c1f52fa42d45f3_bdb32a67af" tabindex="-1" value="" />
            </div>
            <div>
              <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" className="button" />
            </div>
          </div>
        </form>
      </div>
    )
  }
}
