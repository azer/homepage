import React, { Component }  from 'react'
import SimpleLayout from './simple-layout'
import Center from './center'
import './centered-layout.css'

export default class CenteredLayout extends Component {
  render() {
    return (
      <SimpleLayout name={`centered-layout ${this.props.name}`} location={this.props.location}>
        <Center>
          {this.props.children}
        </Center>
      </SimpleLayout>
    )
  }
}
