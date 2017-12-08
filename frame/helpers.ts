import { PureComponent } from "react"
import { Dispatch } from "react-redux"
import { Action } from "redux"

export type Dispatcher = {dispatch: Dispatch<Action>}

export class DispatchComponent<P> extends PureComponent<P & Dispatcher> {
  // dispatch(action: Action) {
  //   return this.props.dispatch(action)
  // }
}
