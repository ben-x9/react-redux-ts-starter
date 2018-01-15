import * as Root from "Root"
import { load } from "reactive-elm"
import { Route, toUri, fromUri } from "routes"

load<Root.State, Root.Action, Route>(
  Root.view,
  Root.update,
  toUri,
  fromUri
)

// Webpack Hot Module Replacement API
const mod: Module = module as any as Module
if (mod.hot) {
  mod.hot.accept()
}
