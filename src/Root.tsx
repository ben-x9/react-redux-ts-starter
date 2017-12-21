import * as React from "react"
import { connect } from "react-redux"
import { Dispatcher, DispatchComponent, Dispatch } from "helpers"
import * as Routes from "routes"
import NotFound from "NotFound"
import * as Home from "Home"
import * as NextPage from "NextPage"


// STATE

export type State = typeof init
export const init = {
  route: Route.home as Route.T,
  home: Home.init,
  nextPage: NextPage.init
}

// UPDATE

export type Action = Route.Action | Home.Action | NextPage.Action

export const update = (state: State = init,
                       action: Action & Dispatcher): State => {
  // Route.update(action as Route.Action)
  switch (action.type) {
    case Route.Type.Goto:
      return { ...state, route: action.route }
    default:
      const home = Home.update(state.home, action as Home.Action & Dispatcher)
      if (home !== state.home) return { ...state, home }
      const nextPage = NextPage.update(state.nextPage,
                                       action as NextPage.Action & Dispatcher)
      if (nextPage !== state.nextPage) return { ...state, nextPage }
      return state
  }
}

// VIEW

require("./root.scss")

class Root extends DispatchComponent<State> {
  unloadRouter: () => void

  componentWillMount() {
    this.unloadRouter = Route.load(this.props.dispatch)
  }

  componentWillUnmount() {
    this.unloadRouter()
  }

  render() {
    const props = this.props
    switch (props.route.type) {
      case Route.Type.NotFound:
        return <NotFound />
      case Route.Type.Home:
        return <Home.view {...props.home} dispatch={props.dispatch} />
      case Route.Type.NextPage:
        return <NextPage.view {...props.nextPage} dispatch={props.dispatch}/>
    }
  }
}



// Webpack Hot Module Replacement API
const mod: Module = module as any as Module
if (mod.hot) {
  mod.hot.accept()
}
