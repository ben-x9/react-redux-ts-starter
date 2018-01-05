import * as React from "react"
import { Dispatcher, DispatchComponent } from "helpers"
import * as Apples from "apples"
import { home, nextPage, toUri, fromUri } from "route"
import { goto } from "frame"

// STATE

export interface State {
  count: number,
  countAgain: number,
  apples: Apples.State
}
export const init = {
  count: 0,
  countAgain: 0,
  apples: Apples.init
}

// UPDATE
export type Action =
  Increment |
  IncrementAgain

export enum ActionType {
  Increment = "Increment",
  IncrementAgain = "IncrementAgain"
}

interface Increment {
  type: ActionType.Increment
  by: number
}
const increment = (by: number): Increment => ({
  type: ActionType.Increment,
  by
})

interface IncrementAgain {
  type: ActionType.IncrementAgain
  by: number
}
const incrementAgain = (by: number): IncrementAgain => ({
  type: ActionType.IncrementAgain,
  by
})


export const update = (state: State = init, action: Action & Dispatcher): State => {
  switch (action.type) {
    case ActionType.Increment:
      action.dispatch(incrementAgain(3))
      return { ...state, count: state.count + action.by }
    case ActionType.IncrementAgain:
      return { ...state, countAgain: state.countAgain + action.by }
    default:
      const apples = Apples.update(state.apples, action)
      if (apples !== state.apples) return { ...state, apples }
      return state
  }
}

// VIEW

require("./root.scss")

class Home extends DispatchComponent<State> {
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
      <div className="root">
        <h1>Hello world!</h1>
        <p>
          Welcome to hot-reloading React written in TypeScript! {this.props.count} {this.props.countAgain}
        </p>
        <Apples.view {...this.props.apples} dispatch={this.props.dispatch} />
        <br />
        <button onClick={() => this.props.dispatch(goto(nextPage))}>
          Next Page
        </button>
      </div>
    )
  }
}

export const view = Home
