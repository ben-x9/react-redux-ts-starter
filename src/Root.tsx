import * as React from "react"
import { Dispatcher, DispatchComponent } from "helpers"
import * as Hello from "hello"

// STATE

export type State = typeof init
export const init = {
  count: 0,
  countAgain: 0,
  hello: Hello.init
}

// UPDATE

enum Type {
  Increment = "Increment",
  IncrementAgain = "IncrementAgain"
}

type Action = Dispatcher & (
  Increment |
  IncrementAgain
)

interface Increment {
  type: Type.Increment
  by: number
}
const increment = (by: number): Increment => ({
  type: Type.Increment,
  by
})

interface IncrementAgain {
  type: Type.IncrementAgain
  by: number
}
const incrementAgain = (by: number): IncrementAgain => ({
  type: Type.IncrementAgain,
  by
})


export const update = (state: State = init, action: Action): State => {
  switch (action.type) {
    case Type.Increment:
      action.dispatch(incrementAgain(3))
      return { ...state, count: state.count + action.by }
    case Type.IncrementAgain:
      return { ...state, countAgain: state.countAgain + action.by }
    default:
      const hello = Hello.update(state.hello, action)
      if (hello !== state.hello) return { ...state, hello }
      return state
  }
}

// VIEW

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
      <Hello.view
        n1={this.props.count}
        n2={this.props.countAgain}
        state={this.props.hello}
        dispatch={this.props.dispatch} />
    )
  }
}
