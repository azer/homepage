import React, { Component } from 'react'
import "./share-buttons.css"

export default class ShareButtons extends Component {
  render() {
    return (
      <div className="share-buttons">
        <div className="inner">
        <a title="Share on Twitter" target="_blank" href={`https://twitter.com/intent/tweet?text=${encodeURI(this.props.title + '\nhttp://azer.bike' + this.props.path)}`}>
          <svg fill="currentColor" height="32" width="32" viewBox="0 0 512 512">
            <path d="M492,109.5c-17.4,7.7-36,12.9-55.6,15.3c20-12,35.4-31,42.6-53.6c-18.7,11.1-39.4,19.2-61.5,23.5
	                   C399.8,75.8,374.6,64,346.8,64c-53.5,0-96.8,43.4-96.8,96.9c0,7.6,0.8,15,2.5,22.1c-80.5-4-151.9-42.6-199.6-101.3
	                   c-8.3,14.3-13.1,31-13.1,48.7c0,33.6,17.2,63.3,43.2,80.7C67,210.7,52,206.3,39,199c0,0.4,0,0.8,0,1.2c0,47,33.4,86.1,77.7,95
	                   c-8.1,2.2-16.7,3.4-25.5,3.4c-6.2,0-12.3-0.6-18.2-1.8c12.3,38.5,48.1,66.5,90.5,67.3c-33.1,26-74.9,41.5-120.3,41.5
	                   c-7.8,0-15.5-0.5-23.1-1.4C62.8,432,113.7,448,168.3,448C346.6,448,444,300.3,444,172.2c0-4.2-0.1-8.4-0.3-12.5
	                   C462.6,146,479,129,492,109.5z"></path>
          </svg>
        </a>

        <a title="Share on Facebook" target="_blank" href={`https://www.facebook.com/sharer/sharer.php?u=${'http://azer.bike' + this.props.path}`}>
          <svg fill="currentColor" height="32" width="32" viewBox="0 0 512 512">
            <path d="M288,192v-38.1c0-17.2,3.8-25.9,30.5-25.9H352V64h-55.9c-68.5,0-91.1,31.4-91.1,85.3V192h-45v64h45v192h83V256h56.4l7.6-64
	                   H288z" data-reactid="75"></path>
          </svg>
        </a>
        </div>
      </div>
    )
  }
}
