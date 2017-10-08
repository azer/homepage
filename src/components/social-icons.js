import React, { Component } from 'react'
import "./social-icons.css"

const icons = [
  // Github
  {
    title: 'Github',
    link: 'https://github.com/azer',
    svg: '<svg viewBox="0 0 800 800"><path d="M400 139c144 0 260 116 260 260 0 115-75 213-178 247-9 3-17-2-17-13v-71c0-35-18-48-18-48 57-6 119-28 119-128 0-44-27-70-27-70s14-29-2-69c0 0-22-7-72 27-42-12-88-12-130 0-50-34-72-27-72-27-16 40-2 69-2 69s-27 26-27 70c0 100 62 122 119 128 0 0-14 10-17 35-15 7-53 18-76-22 0 0-13-25-39-27 0 0-26 0-2 16 0 0 17 8 29 38 0 0 16 51 88 35v44c0 11-9 16-18 13-103-34-178-132-178-247 0-144 116-260 260-260z"/></svg>'
  },
  // Instagram
  {
    title: 'Instagram',
    link: 'https://instagram.com/afrikaradyo',
    svg: '<svg viewBox="0 0 800 800"><path d="M150 400c0-119 0-166 42-208s88-42 208-42 166 0 208 42 42 89 42 208 0 166-42 208-88 42-208 42-166 0-208-42-42-89-42-208zm455 0c0-114 0-148-29-176-29-29-62-29-176-29s-148 0-176 29c-29 29-29 62-29 176s0 148 29 176c29 29 62 29 176 29s148 0 176-29c29-29 29-62 29-176zM400 272a128 128 0 1 1 0 256 128 128 0 0 1 0-256zm0 211c46 0 83-37 83-83s-37-83-83-83-83 37-83 83 37 83 83 83zm163-216c0 16-13 30-30 30-16 0-30-14-30-30 0-17 14-30 30-30 17 0 30 13 30 30z"/></svg>'
  },
  // Twitter
  {
    title: 'Twitter',
    link: 'https://twitter.com/afrikaradyo',
    svg: '<svg viewBox="0 0 800 800"><path d="M679 239s-21 34-55 57c7 156-107 329-314 329-103 0-169-50-169-50s81 17 163-45c-83-5-103-77-103-77s23 6 50-2c-93-23-89-110-89-110s23 14 50 14c-84-65-34-148-34-148s76 107 228 116c-22-121 117-177 188-101 37-6 71-27 71-27s-12 41-49 61c30-2 63-17 63-17z"/></svg>'
  },
  // Youtube
  {
    title: 'Youtube',
    link: 'https://www.youtube.com/channel/UCPZsk0_jd3GuKjeIPilL4qA/videos',
    svg: '<svg viewBox="0 0 800 800"><path d="M400 224c144 0 201 2 224 25 17 17 26 52.125 26 151s-9 134-26 151c-23 23-80 25-224 25s-201-2-224-25c-17-17-26-52.125-26-151s9-134 26-151c23-23 80-25 224-25zm-52 100v141l135-70z"/></svg>'
  }
]

export default class SocialIcons extends Component {
  render() {
    return (
      <div className="social-icons">
        {icons.map(i => this.renderIcon(i))}
      </div>
    )
  }

  renderIcon(icon) {
    return (
      <a title={icon.title} href={icon.link} target="_blank" dangerouslySetInnerHTML={{ __html: icon.svg }}></a>
    )
  }
}
