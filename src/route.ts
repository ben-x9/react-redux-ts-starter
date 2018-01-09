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

export const toUri = (route: T) => {
  switch (route.type) {
    case Type.NotFound: return ""
    case Type.Home: return "/"
    case Type.NextPage: return "/nextpage"
  }
}

export const fromUri = (uri: string): T => {
  if (uri === "/") {
    return home
  } else if (uri === "/nextpage") {
    return nextPage
  } else {
    return notFound
  }
}
