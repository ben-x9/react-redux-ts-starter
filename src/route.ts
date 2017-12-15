import createHistory from "history/createBrowserHistory"
import { Dispatch } from "helpers"
const history = createHistory()

export type T = NotFound | Home | NextPage

export enum Type {
  NotFound = "NotFound",
  Home = "Home",
  NextPage = "NextPage"
}

export interface NotFound {
  type: Type.NotFound
}
export const notFound: NotFound = { type: Type.NotFound }

export interface Home {
  type: Type.Home
}
export const home: Home = { type: Type.Home }

export interface NextPage {
  type: Type.NextPage
}
export const nextPage: NextPage = { type: Type.NextPage }

const toUri = (route: T) => {
  switch (route.type) {
    case Type.NotFound: return ""
    case Type.Home: return "/"
    case Type.NextPage: return "/nextpage"
  }
}

const fromUri = (uri: string): T => {
  if (uri === "/") {
    return home
  } else if (uri === "/nextpage") {
    return nextPage
  } else {
    return notFound
  }
}

export const load = (dispatch: Dispatch) => {
  dispatch(goto(fromUri(window.location.pathname), true))
  return history.listen((location, action) => {
    if (action === "POP") dispatch(goto(fromUri(location.pathname), true))
  })
}

// UPDATE

export type Action = Goto

export enum Type {
  Goto = "Goto"
}

interface Goto {
  type: Type.Goto
  route: T,
  viaHistory: boolean
}
export const goto = (route: T, viaHistory = false): Goto => ({
  type: Type.Goto,
  route,
  viaHistory
})

export const update = (action: Action) => {
  switch (action.type) {
    case Type.Goto:
      if (!action.viaHistory) history.push(toUri(action.route))
      return
  }
}
