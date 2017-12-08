require("normalize.css")

import * as React from "react"
import * as ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { createStore, applyMiddleware, compose } from "redux"
import { AppContainer } from "react-hot-loader"
import IndexComponent from "./IndexComponent"
import dispatch from "./dispatchMiddleware"
import { update } from "Root"
import {
  Dispatcher as $Dispatcher,
  DispatchComponent as $DispatchComponent
} from "./helpers"

export type Dispanpmtcher = $Dispatcher
export const DispatchComponent = $DispatchComponent

// Initalize store
const store = createStore(update)
type Store = typeof store
interface Win {
  store: Store,
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any
}
const win = window as any as Win
const composeEnhancers = win.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
win.store = win.store ||
  createStore(update, composeEnhancers(applyMiddleware(dispatch)))
win.store.replaceReducer(update)

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={win.store}>
        <IndexComponent />
      </Provider>
    </AppContainer>,
    document.getElementById("root")
  )
}

render()

// Webpack Hot Module Replacement API
const mod: Module = module as any as Module
if (mod.hot) {
  mod.hot.accept()
}
