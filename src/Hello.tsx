import * as React from "react"
import { increment } from "actions"
import moize from "moize"

require("./hello.scss")

const Hello = ({ n1, n2 }: {n1: number, n2: number}) =>
  <div className="hello">
    <h1>Hello world!</h1>
    <div>
      Welcome to hot-reloading React written in TypeScript! {n1} {n2}
    </div>
  </div>

export default moize.reactSimple(Hello)
