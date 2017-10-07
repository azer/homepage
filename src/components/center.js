import React, { Component } from 'react'
import "./center.css"

export default class Center extends Component {
  render() {
    return (
      <div className="center">
        {this.props.children}
      </div>
    )
  }
}
