import { React, Dispatcher, AnyAction } from "reactive-elm"
import moize from "moize"

// STATE

export const initialState = {
  numApples: 0
}
export type State = typeof initialState

// UPDATE

type Action = AddApple

enum ActionType {
  AddApple = "AddApple"
}

export const reactsTo = (action: AnyAction): action is Action => {
  switch (action.type) {
    case ActionType.AddApple:
      return true
    default:
      return false
  }
}

interface AddApple {
  type: ActionType.AddApple
}
export const addApple = (): AddApple => ({
  type: ActionType.AddApple
})

export const update = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.AddApple:
      return { ...state, numApples: state.numApples + 1 }
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
