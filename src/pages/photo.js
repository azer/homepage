import React, { Component } from 'react'
import SimpleLayout from '../components/simple-layout'
import Link from 'gatsby-link'
import img from "img"
import photos from '../photos.json'
import "./photo.css"

export default class Slideshow extends Component {
  constructor(props) {
    super(props)
    this.onKeyPress = this.onKeyPress.bind(this)
  }

  componentWillMount() {
    if (typeof document !== 'undefined') {
      document.body.addEventListener('keydown', this.onKeyPress)
    }

    const match = this.props.location.search.match(/p\=(\w+)/)
    const id = match ? match[1] : photos[0].id

    this.select(id)
  }

  componentWillUnmount() {
    document.body.removeEventListener('keypress', this.onKeyPress)
  }

  load(photo) {
    let done = false

    this.setState({
      loading: true,
      thumbnailLoaded: false,
      error: null
    })

    if (typeof window === 'undefined') return

    img(photo.sizes.small.url, err => {
      if (err || done) return

      this.setState({
        thumbnailLoaded: true
      })
    })

    img(photo.sizes[this.size()].url, error => {
      done = true

      if (error) return this.setState({ error })

      this.setState({
        error: null,
        loading: false
      })
    })
  }

  onKeyPress(event) {
    if (event.keyCode === 37) {
      this.select(this.state.previous.id)
    } else if (event.keyCode === 39) {
      this.select(this.state.next.id)
    }
  }

  select(id) {
    let photo

    let i = photos.length
    while (i--) {
      if (photos[i].id === id) {
        photo = photos[i]
        break;
      }
    }

    this.setState({
      previous: photos[i === 0 ? photos.length - 1 : i-1],
      next: photos[(i+1) % photos.length],
      photo
    })

    this.load(photo)

    if (typeof history !== 'undefined') {
      history.pushState({ urlPath: '/photo?p=' + photo.id }, "", '/photo?p=' + photo.id)
    }
  }

  size() {
    if (typeof window === 'undefined') return 'medium'

    const width = window.innerWidth

    if (width < 800) return 'medium'
    if (width < 1100) return 'large'
    if (width < 1700) return 'xlarge'

    return 'xxlarge'
  }

  render() {
    return (
      <SimpleLayout name="slideshow" location={this.props.location}>
        {this.state.loading ? this.renderLoading() : this.renderPhoto() }
        <div className="head">
          <div className="caption">{this.state.photo.title}</div>
          {this.renderButtons()}
          <div className="clear"></div>
      </div>

      </SimpleLayout>
    )
  }

  renderPhoto() {
    const css = {
      backgroundImage: `url(${this.state.photo.sizes[this.size()].url})`
    }

    return (
      <div className="photo" style={css}>
      </div>
    )
  }

  renderButtons() {
    return (
      <div className="buttons">
        <div onClick={() => this.select(this.state.previous.id)} className="prev-button button">
          <svg width="24px" height="11px"><polygon points="18.4,0.5 17.6,1.2 21.5,5 0.5,5 0.5,6 21.5,6 17.6,9.8 18.4,10.5 23.4,5.5 "></polygon></svg>
        </div>
        <div onClick={() => this.select(this.state.next.id)} className="next-button button">
          <svg width="24px" height="11px"><polygon points="18.4,0.5 17.6,1.2 21.5,5 0.5,5 0.5,6 21.5,6 17.6,9.8 18.4,10.5 23.4,5.5 "></polygon></svg>
        </div>
      </div>
    )
  }

  renderLoading() {
    const thumbnailCSS = {
      backgroundImage: `url(${this.state.photo.sizes.small.url})`
    }

    return (
      <div className={`loading center ${this.state.thumbnailLoaded ? "has-thumbnail" : ""}`}>
        {this.state.thumbnailLoaded ? <div className="thumbnail" style={thumbnailCSS}></div> : null}
        <span>Loading</span>
      </div>
    )
  }
}
