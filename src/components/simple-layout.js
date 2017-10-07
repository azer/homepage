import React, { Component }  from 'react'
import Menu from './menu'
import Footer from './footer'
import BurgerMenu from './burger-menu'
import "./simple-layout.css"

export default class SimpleLayout extends Component {
  render() {
    const classes = ['simple-layout', this.props.name || '']

    return (
      <div className={classes.join(' ')}>
        <BurgerMenu location={this.props.location} />
        <Menu location={this.props.location} />
        <div className="content">
          {this.props.children}
        </div>
        <Footer location={this.props.location} />
      </div>
    )
  }
}
