require("jsdom-global")()
const test = it
import { expect } from "chai"

import { update, initialState, addApple } from "Apples"

describe("Apples", () => {
  test("add apple", () => {
    const state = update(initialState, addApple())
    expect(state.numApples).to.eq(initialState.numApples + 1)
  })
})
