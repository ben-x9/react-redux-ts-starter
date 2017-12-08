import * as React from "react"
import { Action, Type, increment, incrementAgain } from "actions"
import { DispatchComponent } from "helpers"
import Hello from "hello"

export type State = typeof state
export const state = {
  count: 0,
  countAgain: 0
}

export const update = (state: State, action: Action): State => {
  switch (action.type) {
    case Type.Increment:
      action.dispatch(incrementAgain(3))
      return { ...state, count: state.count + action.by }
    case Type.IncrementAgain:
      return { ...state, countAgain: state.countAgain + action.by }
    default:
      return state
  }
}

require("./root.scss")

export default class Root extends DispatchComponent<State> {
  interval: number

  componentWillMount() {
    this.interval = window.setInterval(() => {
      this.props.dispatch(increment(1))
    }, 1000)
  }

  componentWillUnmount() {
    window.clearInterval(this.interval)
  }

  render() {
    return (
      <Hello n1={this.props.count} n2={this.props.countAgain} />
    )
  }
}
