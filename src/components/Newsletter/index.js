import React, { Component } from "react"
import Button from "../Button"
import Textbox from "../Textbox"

export default class Newsletter extends Component {
  constructor(props) {
    super(props)

    this.form = null
    this.state = {
      email: ""
    }
  }

  onSubmit(e) {
    e.preventDefault()
    e.stopPropagation()

    this.form.setAttribute(
      "action",
      "https://buttondown.email/api/emails/embed-subscribe/azer"
    )

    setTimeout(() => this.form.submit(), 100)
  }

  render() {
    return (
      <div className="bt pt4 b--light-gray mt5">
        <h1 className="x-sans fw3 tc pv0 mid-gray">Join My Newsletter</h1>
        <h2 className="x-sans f4 tc dark-gray">
          Once a month or so I send out a letter — on technology, photography,
          travel, and books.
        </h2>
        <div className="mw6 x-auto pa2">
          <form ref={el => (this.form = el)} method="post" target="popupwindow">
            <input type="hidden" value="1" name="embed" />
            <input type="hidden" value={this.state.email} name="email" />
            <Textbox
              onChange={e => this.setState({ email: e.target.value })}
              placeholder="Your e-mail"
              value={this.state.email}
            />
            <Button onClick={e => this.onSubmit(e)}>Subscribe</Button>
          </form>
        </div>
      </div>
    )
  }
}
