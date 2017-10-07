import React, { Component } from 'react'
import SimpleLayout from '../components/simple-layout'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import photos from '../photos.json'
import debounce from 'debounce-fn'
import "./photography.css"

export default class Photography extends Component {
  constructor(props) {
    super(props)
    this.onResize = debounce(this.onResize.bind(this), 500)
  }

  componentWillMount() {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.onResize)
    }

    this.setState({
      selected: null,
      all: photos,
      thumbnailSize: this.findThumbnailSize(),
      columns: this.createColumns(photos)
    })
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.onResize)
    }
  }

  createColumns(photos) {
    const count = this.findColumnCount()
    const thumbnailSize = this.findThumbnailSize()
    const columns = []

    let c = count
    while (c--) {
      columns.push({ height: 0, photos: [] })
    }

    const len = photos.length
    let i = -1;
    while (++i < len) {
      let column = columns[0]

      // Add next photo to the column with lowest height
      let c = 0
      while (++c < count) {
        if (columns[c].height < column.height) column = columns[c]
      }

      column.photos.push(photos[i])
      column.height += photos[i].sizes[thumbnailSize].height
    }

    return columns
  }

  findColumnCount() {
    if (typeof window === 'undefined') return 3

    const width = window.innerWidth

    if (width < 900) return 2
    if (width < 1700) return 3
    return 4
  }

  findThumbnailSize() {
    if (typeof window === 'undefined') return 'small'

    const width = window.innerWidth

    if (width < 500) return 'small'
    return 'medium'
  }

  onResize() {
    this.setState({
      selected: null,
      all: photos,
      thumbnailSize: this.findThumbnailSize(),
      columns: this.createColumns(photos)
    })
  }

  render() {
    return (
      <SimpleLayout name="photography" location={this.props.location}>
        <Helmet title={`Photography - ${this.props.data.site.siteMetadata.title}`} />
        <h1>Photography</h1>
        <h2>The kind of beauty I seek is incomplete and imperfect. An apple with bird bites or some bug holes excites me; a real, romantic relationship is essential for beauty.</h2>
        <div className="photos">
          {this.renderGrid()}
        </div>
      </SimpleLayout>
    )
  }

  renderGrid() {
    return (
      <div className="grid">
        {this.state.columns.map(c => this.renderColumn(c))}
        <div className="clear"></div>
      </div>
    )
  }

  renderColumn(column) {
    const css = {
      width: (100 / this.state.columns.length) + '%'
    }

    return (
      <div className="column" style={css}>
        {column.photos.map(p => this.renderThumbnail(p))}
      </div>
    )
  }

  renderThumbnail(p) {
    return (
      <div className="thumbnail">
        <Link className="caption center" to={`/photo?p=${p.id}`}>
          <h1>{p.title}</h1>
        </Link>
        <Link to={`/photo?p=${p.id}`}>
          <img src={p.sizes[this.state.thumbnailSize].url} />
        </Link>
      </div>
    )
  }
}

export const query = graphql`
  query PhotographyQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
