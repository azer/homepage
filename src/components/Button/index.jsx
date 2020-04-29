import * as React from "react"
import "./style.css"

export default props => {
  if (props.href) {
    return (
      <a className="c-button" {...props}>
        {props.children}
      </a>
    )
  }

  return (
    <button className="c-button" {...props}>
      {props.children}
    </button>
  )
}
