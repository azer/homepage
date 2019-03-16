import * as React from "react"
import "./style.css"

export default props => {
  return (
    <button className="c-button" {...props}>
      {props.children}
    </button>
  )
}
