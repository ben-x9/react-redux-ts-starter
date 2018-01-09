import * as React from "react"
import { Dispatcher } from "helpers"
import * as Route from "route"
import NotFound from "NotFound"
import * as Home from "Home"
import * as NextPage from "NextPage"
import { load, Goto, GotoType } from "frame"


// STATE

export type State = typeof init
export const init = {
  route: Route.home as Route.T,
  home: Home.init,
  nextPage: NextPage.init
}

// UPDATE

export type Action = Goto<Route.T> | Home.Action | NextPage.Action

export const update = (state: State = init,
                       action: Action & Dispatcher): State => {
  switch (action.type) {
    case GotoType:
      return { ...state, route: action.route }
    default:
      const home = Home.update(state.home, action as Home.Action & Dispatcher)
      if (home !== state.home) return { ...state, home }

      const nextPage = NextPage.update(
        state.nextPage,
        action as NextPage.Action
      )
      if (nextPage !== state.nextPage) return { ...state, nextPage }

      return state
  }
}

// VIEW

require("./root.scss")

const Root = ({ route, home, nextPage, dispatch }: State & Dispatcher) => {
  switch (route.type) {
    case Route.Type.NotFound:
      return <NotFound />
    case Route.Type.Home:
      return <Home.view {...home} dispatch={dispatch} />
    case Route.Type.NextPage:
      return <NextPage.view {...nextPage} dispatch={dispatch} />
  }
}

load<State, Action, Route.T>(Root, update, Route.toUri, Route.fromUri)

// Webpack Hot Module Replacement API
const mod: Module = module as any as Module
if (mod.hot) {
  mod.hot.accept()
}
