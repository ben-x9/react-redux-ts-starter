import { Dispatch } from "helpers"
// import { $uriToRoute, $routeToUri } from "index"
import createHistory from "history/createBrowserHistory"
const history = createHistory()

export const load = (dispatch: Dispatch) => {
  dispatch(goto($uriToRoute(window.location.pathname), true))
  return history.listen((location, action) => {
    if (action === "POP") dispatch(goto($uriToRoute(location.pathname), true))
  })
}

// UPDATE

export type Action<Route> = Goto<Route>

export enum Type {
  Goto = "Goto"
}

interface Goto<Route> {
  type: Type.Goto
  route: Route,
  viaHistory: boolean
}
export const goto = <Route>(route: Route, viaHistory = false): Goto<Route> => ({
  type: Type.Goto,
  route,
  viaHistory
})

export const update = <Route>(action: Action<Route>) => {
  switch (action.type) {
    case Type.Goto:
      if (!action.viaHistory) history.push($routeToUri(action.route))
      return
  }
}
