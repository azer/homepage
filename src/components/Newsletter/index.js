import React, { Component } from "react"
import Button from "../Button"
import Textbox from "../Textbox"

export default () => {
  return (
    <div className="bt pt4 b--light-gray mt5">
      <h1 className="x-sans fw3 tc pv0 mid-gray">Join My Newsletter</h1>
      <h2 className="x-sans f4 tc dark-gray">
        Once a month or so I send out a letter — on technology, photography,
        travel, and books.
      </h2>
      <div className="mw6 x-auto pa2">
        <form
          action="https://buttondown.email/api/emails/embed-subscribe/azer"
          method="post"
          target="popupwindow"
          onsubmit="window.open('https://buttondown.email/azer', 'popupwindow')"
        >
          <input type="hidden" value="1" name="embed" />
          <Textbox name="email" placeholder="Your e-mail" />
          <Button>Subscribe</Button>
        </form>
      </div>
    </div>
  )
}
