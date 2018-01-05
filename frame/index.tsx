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
import { RouteToUri, UriToRoute } from "Router"
import { randomBytes } from "crypto"

export type Dispatcher = $Dispatcher
export const DispatchComponent = $DispatchComponent

export type Goto<Route> = Router.Action<Route>
export type GotoType = Router.ActionType
export const GotoType = Router.ActionType.Goto
export const goto = Router.goto

type StoreType = Dispatcher

let RootElement: () => JSX.Element

type Update<State, Action> = (state: State, action: Action) => State

export const load = function<State extends {},
                      Action extends Redux.Action,
                      Route>(
    RootElement: (state: State) => JSX.Element/*  | $DispatchComponent<State> */,
    update: Update<State, Action>,
    routeToUri: RouteToUri<Route>,
    uriToRoute: UriToRoute<Route>) {

  // const routerUpdate = Router.load(routeToUri, uriToRoute)

  const wrappedUpdate = (state: State, action: Action) => {
    Router.update(action as any as Router.Action<Route>, routeToUri)
    return update(state, action)
  }

  // Initalize store
  const composeEnhancers =
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  let store = createStore(wrappedUpdate, composeEnhancers(applyMiddleware(dispatch)))

  class Index extends DispatchComponent<any> {
    unloadRouter: () => void

    componentWillMount() {
      this.unloadRouter = Router.load(
        this.props.dispatch,
        routeToUri,
        uriToRoute
      )
    }

    componentWillUnmount() {
      this.unloadRouter()
    }

    render() {
      return <RootElement {...this.props as State}/>
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

  return (update: Update<State, Action>) => { store.replaceReducer(update) }
}

