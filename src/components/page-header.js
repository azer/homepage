import React from "react"
import "./page-header.css"

export default function header(props) {
  const bg = {
    backgroundImage: `url(${props.image})`
  }

  return (
    <div className="page-header x-serif">
      <div className="page-header-inner relative">
        <div className="absolute page-header-image br-100 w4" style={bg} />
        {props.children}
      </div>
    </div>
  )
}
