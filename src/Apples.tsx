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

require("./apples.scss")

const Apples = ({ numApples, dispatch }: State & Dispatcher) =>
  <div className="hello">
    <p>Number of apples: {numApples}</p>
    <button onClick={() => dispatch(addApple())}>Add Apple</button>
  </div>

export const view = moize.reactSimple(Apples)
