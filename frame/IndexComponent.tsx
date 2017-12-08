import * as React from "react"
import { connect } from "react-redux"
import Root, { State } from "Root"
import { DispatchComponent } from "./helpers"

export class Index extends DispatchComponent<State> {
  render() {
    return (
      <Root {...this.props} />
    )
  }
}

export default connect((s: State) => s)(Index)
