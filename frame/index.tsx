require("normalize.css")

import * as React from "react"
import * as ReactDOM from "react-dom"
import { Provider, connect } from "react-redux"
import * as Redux from "redux"
import { createStore, applyMiddleware, compose, Store } from "redux"
import { AppContainer } from "react-hot-loader"
import * as Router from "Router"
import dispatch from "./dispatchMiddleware"
import {
  Dispatcher as $Dispatcher,
  DispatchComponent as $DispatchComponent,
  Dispatcher
} from "./helpers"
import { PureComponent } from "react"

export type Dispanpmtcher = $Dispatcher
export const DispatchComponent = $DispatchComponent

type StoreType = Dispatcher

let RootElement: () => JSX.Element
type UriToRoute<Route> = (uri: string) => Route
// export let $uriToRoute: UriToRoute
type RouteToUri<Route> = (route: Route) => string
// export let $routeToUri: RouteToUri

type Update<State, Action> = (state: State, action: Action) => State

const load = function<State, Action extends Redux.Action, Route>(
               RootElement: () => JSX.Element,
               update: Update<State, Action>,
               routeToUri: RouteToUri<Route>,
               uriToRoute: UriToRoute<Route>) {

  const routerUpdate = Router.load()

  const wrappedUpdate = (state: State, action: Action) => {
    Router.update(action as Router.Action<Route>)
    update(state, action)
  }

  // Initalize store
  let store = createStore(update)
  type Store = typeof store
  const composeEnhancers =
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  store = createStore(update, composeEnhancers(applyMiddleware(dispatch)))

  class Index extends DispatchComponent<State> {
    unloadRouter: () => void

    componentWillMount() {
      this.unloadRouter = Router.load(this.props.dispatch)
    }

    componentWillUnmount() {
      this.unloadRouter()
    }

    render() {
      return <RootElement />
    }
  }

  const View = connect((s: any) => s)(Index)

  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <View />
      </Provider>
    </AppContainer>,
    document.getElementById("root")
  )

  return (update: Update<State>) => { store.replaceReducer(update) }
}

