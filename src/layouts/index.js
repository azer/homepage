import React, { Component }  from 'react'
import Menu from '../components/menu'
import './base.css'

const Container = ({ children }) => {
  return (
    children()
  )
}

export default Container
