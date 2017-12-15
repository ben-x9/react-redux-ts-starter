require("normalize.css")

import * as React from "react"
import * as ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { createStore, applyMiddleware, compose } from "redux"
import { AppContainer } from "react-hot-loader"
import * as Root from "Root"
import dispatch from "./dispatchMiddleware"
import {
  Dispatcher as $Dispatcher,
  DispatchComponent as $DispatchComponent
} from "./helpers"

export type Dispanpmtcher = $Dispatcher
export const DispatchComponent = $DispatchComponent


// Initalize store
const store = createStore(Root.update)
type Store = typeof store
interface Win {
  store: Store,
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any
}
const win = window as any as Win
const composeEnhancers = win.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
win.store = win.store ||
  createStore(Root.update, composeEnhancers(applyMiddleware(dispatch)))
win.store.replaceReducer(Root.update)

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={win.store}>
        <Root.view />
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
