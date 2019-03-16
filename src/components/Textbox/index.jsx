import * as React from "react"
import "./style.css"

export default props => {
  return (
    <div className="c-textbox">
      <input
        name={props.name}
        type={props.type || "text"}
        autoFocus={props.autoFocus}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
      />
      {props.label ? <label {...props}>{props.label}</label> : null}
    </div>
  )
}
