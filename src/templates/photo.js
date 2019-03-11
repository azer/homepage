import React, { Component } from "react"
import SimpleLayout from "../components/simple-layout"
import Link, { navigateTo } from "gatsby-link"
import Helmet from "react-helmet"
import img from "img"
import "./photo.css"

export default class Slideshow extends Component {
  constructor(props) {
    super(props)
    this.onKeyPress = this.onKeyPress.bind(this)
  }

  componentWillMount() {
    if (typeof document !== "undefined") {
      window.removeEventListener("keyup", this.onKeyPress)
      window.addEventListener("keyup", this.onKeyPress, false)
    }

    this.select()
  }

  componentWillReceiveProps() {
    this.select()
  }

  componentWillUnmount() {
    window.removeEventListener("keyup", this.onKeyPress)
  }

  load(photo) {
    let done = false

    this.setState({
      loading: true,
      thumbnailLoaded: false,
      error: null
    })

    if (typeof window === "undefined") return

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
      navigateTo(this.state.previous)
    } else if (event.keyCode === 39) {
      navigateTo(this.state.next)
    }
  }

  select(id) {
    const all = this.props.data.allPhotosJson.edges
    const selected = this.props.data.photosJson

    let i = all.length
    while (i--) {
      if (all[i].node.path === selected.path) {
        break
      }
    }

    this.setState({
      previous: all[i === 0 ? all.length - 1 : i - 1].node.path,
      next: all[(i + 1) % all.length].node.path,
      photo: selected
    })

    this.load(selected)
  }

  size() {
    if (typeof window === "undefined") return "medium"

    const width = window.innerWidth

    if (width < 800) return "medium"
    if (width < 1100) return "large"
    if (width < 1700) return "xlarge"

    return "xxlarge"
  }

  render() {
    const photo = this.props.data.photosJson
    const title = `${photo.title} - Photography - ${
      this.props.data.site.siteMetadata.title
    }`
    const url = `https://kodfabrik.com${photo.path}`

    return (
      <SimpleLayout
        name="slideshow"
        location={this.props.location}
        title={title}
        desc="Selection of some photos I shot."
        type="photo"
        url={url}
        image={photo.sizes.xlarge.url}
        newsletter
      >
        <Link to="/photography" className="close-button">
          &times;
        </Link>
        {this.state.loading ? this.renderLoading() : this.renderPhoto()}
        <div className="head">
          <div className="caption">{photo.title}</div>
          {this.renderButtons()}
          <div className="clear" />
        </div>
      </SimpleLayout>
    )
  }

  renderPhoto() {
    const css = {
      backgroundImage: `url(${this.state.photo.sizes[this.size()].url})`
    }

    return <div className="photo" style={css} />
  }

  renderButtons() {
    return (
      <div className="buttons">
        <Link to={this.state.previous} className="prev-button button">
          <svg width="24px" height="11px">
            <polygon points="18.4,0.5 17.6,1.2 21.5,5 0.5,5 0.5,6 21.5,6 17.6,9.8 18.4,10.5 23.4,5.5 " />
          </svg>
        </Link>
        <Link to={this.state.next} className="next-button button">
          <svg width="24px" height="11px">
            <polygon points="18.4,0.5 17.6,1.2 21.5,5 0.5,5 0.5,6 21.5,6 17.6,9.8 18.4,10.5 23.4,5.5 " />
          </svg>
        </Link>
      </div>
    )
  }

  renderLoading() {
    const thumbnailCSS = {
      backgroundImage: `url(${this.state.photo.sizes.small.url})`
    }

    return (
      <div
        className={`loading center ${
          this.state.thumbnailLoaded ? "has-thumbnail" : ""
        }`}
      >
        {this.state.thumbnailLoaded ? (
          <div className="thumbnail" style={thumbnailCSS} />
        ) : null}
        <span>Loading</span>
      </div>
    )
  }
}

export const photoQuery = graphql`
  query PhotographById($path: String!) {
    site {
      siteMetadata {
        title
      }
    }

    photosJson(path: { eq: $path }) {
      path
      title
      sizes {
        small {
          url
        }
        medium {
          url
        }
        large {
          url
        }
        xlarge {
          url
        }
        xxlarge {
          url
        }
      }
    }

    allPhotosJson {
      edges {
        node {
          path
        }
      }
    }
  }
`
