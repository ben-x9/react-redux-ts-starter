import { React, Dispatcher, AnyAction } from "reactive-elm"
import moize from "moize"

// STATE

export type State = typeof init
export const init = {
  lightOn: false
}

// UPDATE

export type Action = Toggle

export enum ActionType {
  Toggle = "Toggle"
}

export const reactsTo = (action: AnyAction): action is Action => {
  switch (action.type) {
    case ActionType.Toggle:
      return true
    default:
      return false
  }
}

interface Toggle { type: ActionType.Toggle }
const toggle: Toggle = ({ type: ActionType.Toggle })

export const update = (state: State, action: Action) => {
  switch (action.type) {
    case ActionType.Toggle: return { ...state, lightOn: !state.lightOn }
    default: return state
  }
}

// VIEW

require("./next-page.scss")

const NextPage = ({ lightOn, dispatch }: State & Dispatcher) =>
  <div className="next-page">
    <h1>Next Page</h1>
    <p>The light is {lightOn ? "on" : "off"}</p>
    <button onClick={() => dispatch(toggle)}>Toggle</button>
  </div>

export const view = moize.reactSimple(NextPage)
