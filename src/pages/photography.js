import React, { Component } from 'react'
import SimpleLayout from '../components/simple-layout'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import Newsletter from '../components/newsletter'
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
    let i = -1;
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
      thumbnailSize: this.findThumbnailSize(),
      columns: this.createColumns()
    })
  }

  render() {
    const title = `Photography - ${this.props.data.site.siteMetadata.title}`

    return (
      <SimpleLayout name="photography"
                    location={this.props.location}
                    type="photos"
                    title={title}
                    desc="Selection of some photos I shot."
                    url="http://azer.bike/photography"
                    image="https://cldup.com/qCL_0FsLkP.jpg">

        <h1>Photography</h1>
        <h2>
          An apple with bird bites or some bug holes excites me; a real,
          romantic relationship is beautiful.
          I've been seeking incomplete and imperfect beauty.
        </h2>
        <div className="photos">
          {this.renderGrid()}
        </div>
        <div className="inline-newsletter">
          <div className="zigzag"></div>
          <Newsletter title="This is what I got for now. Join my newsletter to hear when there is new photos." />
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
        <Link className="caption center" to={p.path}>
          <h1>{p.title}</h1>
        </Link>
        <Link to={p.path}>
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

    allPhotosJson {
      edges {
        node {
          path
          title
          sizes {
            small {
              url
              height
            }
            medium {
              url
              height
            }
          }
        }
      }
    }
  }
`
