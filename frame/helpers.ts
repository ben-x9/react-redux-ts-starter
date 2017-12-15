import { PureComponent } from "react"
import * as ReactRedux from "react-redux"
import { Action as $Action } from "redux"

export type Action = $Action

export type Dispatch = ReactRedux.Dispatch<Action>

export type Dispatcher = {dispatch: Dispatch}

export class DispatchComponent<P> extends PureComponent<P & Dispatcher> {
  // dispatch(action: Action) {
  //   return this.props.dispatch(action)
  // }
}
