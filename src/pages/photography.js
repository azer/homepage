import React, { Component } from 'react'
import SimpleLayout from '../components/simple-layout'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'

import Newsletter from '../components/Newsletter'
import PageHeader from '../components/page-header'
import Title from '../components/page-title'
import debounce from 'debounce-fn'
import './photography.css'

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
      thumbnailSize: this.findThumbnailSize(),
      columns: this.createColumns()
    })
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.onResize)
    }
  }

  createColumns() {
    const photos = this.props.data.allPhotosJson.edges
    const count = this.findColumnCount()
    const thumbnailSize = this.findThumbnailSize()
    const columns = []

    let c = count
    while (c--) {
      columns.push({ height: 0, photos: [] })
    }

    const len = photos.length
    let i = -1
    while (++i < len) {
      let column = columns[0]

      // Add next photo to the column with lowest height
      let c = 0
      while (++c < count) {
        if (columns[c].height < column.height) column = columns[c]
      }

      let p = photos[i].node
      column.photos.push(p)
      column.height += p.sizes[thumbnailSize].height
    }

    return columns
  }

  findColumnCount() {
    if (typeof window === 'undefined') return 3

    const width = window.innerWidth

    if (width < 900) return 2
    return 3
  }

  findThumbnailSize() {
    if (typeof window === 'undefined') return 'medium'

    const width = window.innerWidth

    if (width < 500) return 'small'
    return 'medium'
  }

  onResize() {
    this.setState({
      selected: null,
      thumbnailSize: this.findThumbnailSize(),
      columns: this.createColumns()
    })
  }

  render() {
    const title = `Photography - ${this.props.data.site.siteMetadata.title}`

    return (
      <SimpleLayout
        name="photography"
        location={this.props.location}
        type="photos"
        title={title}
        desc="Selection of some photos I shot."
        url="https://kodfabrik.com/photography"
        image="https://cldup.com/qCL_0FsLkP.jpg"
      >
        <PageHeader image="https://66.media.tumblr.com/a804e1890a6ffd343f2f4ffe6729a333/tumblr_mjk2xfELh61qccnhoo1_540.jpg">
          Bird bites and bug holes on apples excites me. I've been seeking
          incomplete and imperfect beauty. Real and romantic relationships.
        </PageHeader>
        <div className="photos">{this.renderGrid()}</div>
        <Newsletter />
      </SimpleLayout>
    )
  }

  renderGrid() {
    /* const photos = this.props.data.allPhotosJson.edges
    const columns = [[], []]

    const len = photos.length
    let i = -1

    while (++i < len) {
      columns[i % columns.length].push(photos[i].node)
    }

    return (
      <div className="grid">
        {columns.map(c => this.renderColumn(c))}
        <div className="x-clear" />
      </div>
      )*/

    const photos = this.props.data.allPhotosJson.edges

    return (
      <div className="x-grid-2 x-centered grid">
        {photos.map(p => this.renderThumbnail(p.node))}
        <div className="x-clear" />
      </div>
    )
  }

  renderColumn(column) {
    return (
      <div className="column">{column.map(p => this.renderThumbnail(p))}</div>
    )
  }

  renderThumbnail(p) {
    console.log(p.sizes)

    return (
      <div className={`thumbnail x-sans${p.highlight ? ' highlight' : ''}`}>
        <Link className="caption center" to={p.path}>
          <h1>{p.title}</h1>
        </Link>
        <Link to={p.path}>
          <img src={p.sizes[p.highlight ? 'xlarge' : 'large'].url} />
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

    allPhotosJson {
      edges {
        node {
          path
          title
          highlight
          sizes {
            large {
              url
              height
            }
            medium {
              url
              height
            }
            xlarge {
              url
              height
            }
          }
        }
      }
    }
  }
`
