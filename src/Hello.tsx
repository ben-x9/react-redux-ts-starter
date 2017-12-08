import * as React from "react"
import { Dispatcher } from "helpers"
import moize from "moize"

// STATE

export const init = {
  numApples: 0
}
type State = typeof init


// UPDATE

enum Type {
  AddApple = "AddApple"
}

type Action = AddApple

interface AddApple {
  type: Type.AddApple
}
const addApple = (): AddApple => ({
  type: Type.AddApple
})

export const update = (state: State, action: Action): State => {
  switch (action.type) {
    case Type.AddApple:
      return { ...state, numApples: state.numApples + 1 }
    default:
      return state
  }
}


// VIEW

require("./hello.scss")

const alertYo = (what: string) => alert(what)

type Props = Dispatcher & {
  n1: number,
  n2: number,
  state: State
}

const Hello = ({ n1, n2, state, dispatch }: Props) =>
  <div className="hello">
    <h1>Hello world!</h1>
    <p>
      Welcome to hot-reloading React written in TypeScript! {n1} {n2}
    </p>
    <p>Number of apples: {state.numApples}</p>
    <button onClick={() => dispatch(addApple())}>Add Apple</button>
  </div>

export const view = moize.reactSimple(Hello)
