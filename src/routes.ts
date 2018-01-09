export type Route = NotFound | Home | NextPage

export enum RouteType {
  NotFound = "NotFound",
  Home = "Home",
  NextPage = "NextPage"
}

export interface NotFound {
  type: RouteType.NotFound
}
export const notFound: NotFound = { type: RouteType.NotFound }

export interface Home {
  type: RouteType.Home
}
export const home: Home = { type: RouteType.Home }

export interface NextPage {
  type: RouteType.NextPage
}
export const nextPage: NextPage = { type: RouteType.NextPage }

export const toUri = (route: Route) => {
  switch (route.type) {
    case RouteType.NotFound: return ""
    case RouteType.Home: return "/"
    case RouteType.NextPage: return "/nextpage"
  }
}

export const fromUri = (uri: string): Route => {
  if (uri === "/") {
    return home
  } else if (uri === "/nextpage") {
    return nextPage
  } else {
    return notFound
  }
}
