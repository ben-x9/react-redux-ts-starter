import { Route, RouteType, home, fromUri, toUri } from "routes"
import NotFound from "NotFound"
import * as Home from "Home"
import * as NextPage from "NextPage"
import { React, load, Goto, Dispatcher } from "reactive-elm"

// STATE

export type State = typeof init
export const init = {
  route: home as Route,
  home: Home.init,
  nextPage: NextPage.init
}

// UPDATE

export type Action = Goto<Route> | Home.Action | NextPage.Action

export const update = (state: State = init,
                       action: Action & Dispatcher): State => {
  if (Home.reactsTo(action)) {
    return { ...state, home: Home.update(state.home, action) }
  }
  if (NextPage.reactsTo(action)) {
    return { ...state, nextPage: NextPage.update(state.nextPage, action) }
  }
  return state
}

// VIEW

require("./root.scss")

const Root = ({ route, home, nextPage, dispatch }: State & Dispatcher) => {
  switch (route.type) {
    case RouteType.NotFound:
      return <NotFound />
    case RouteType.Home:
      return <Home.view {...home} dispatch={dispatch} />
    case RouteType.NextPage:
      return <NextPage.view {...nextPage} dispatch={dispatch} />
  }
}

export const view  = Root
