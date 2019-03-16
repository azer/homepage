import React, { Component } from "react"
import Helmet from "react-helmet"
import Menu from "./menu"
import Footer from "./footer"
import BurgerMenu from "./burger-menu"
import "./simple-layout.css"

export default class SimpleLayout extends Component {
  render() {
    const classes = ["simple-layout", this.props.name || ""]

    return (
      <div className={classes.join(" ")}>
        <Helmet title={this.props.title}>
          <meta name="description" content={this.props.desc} />
          <meta property="og:type" content={this.props.type} />
          <meta property="og:title" content={this.props.title} />
          <meta
            property="og:url"
            content={this.props.url || "https://kodfabrik.com"}
          />
          <meta property="og:description" content={this.props.desc} />
          <meta property="og:image" content={this.props.image} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@afrikaradyo" />
          <meta name="twitter:creator" content="@afrikaradyo" />
          <meta name="twitter:title" content={this.props.title} />
          <meta name="twitter:description" content={this.props.desc} />
          <meta name="twitter:image" content={this.props.image} />
          <link
            rel="canonical"
            href={this.props.url || "https://kodfabrik.com"}
          />
          <link
            rel="icon"
            type="image/png"
            href="https://c1.staticflickr.com/5/4353/37319896181_52a796bcc7_s.jpg"
          />
          <link
            rel="alternate"
            type="application/rss+xml"
            href="https://kodfabrik.com/rss.xml"
          />
        </Helmet>

        <BurgerMenu location={this.props.location} />
        <Menu location={this.props.location} />
        <div
          className={`x-viewport x-auto pt4 ${
            this.props.fullwidth ? "x-fullwidth" : ""
          }`}
        >
          {this.props.children}
        </div>
        <Footer />
      </div>
    )
  }
}
