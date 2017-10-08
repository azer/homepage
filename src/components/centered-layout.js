import React, { Component }  from 'react'
import SimpleLayout from './simple-layout'
import Center from './center'
import './centered-layout.css'

export default class CenteredLayout extends Component {
  render() {
    return (
      <SimpleLayout {...this.props} name={`centered-layout ${this.props.name}`}>
        <Center>
          {this.props.children}
        </Center>
      </SimpleLayout>
    )
  }
}
