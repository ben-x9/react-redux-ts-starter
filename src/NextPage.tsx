import * as React from "React"
import { Dispatcher } from "helpers"
import moize from "moize"

// STATE

export type State = typeof init
export const init = {
  lightOn: false
}

// UPDATE

export type Action = Toggle

enum Type {
  Toggle = "Toggle"
}

interface Toggle { type: Type.Toggle }
const toggle: Toggle = ({ type: Type.Toggle })

export const update = (state: State, action: Action) => {
  switch (action.type) {
    case Type.Toggle: return { ...state, lightOn: !state.lightOn }
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
