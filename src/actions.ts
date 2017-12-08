import { Dispatcher } from "helpers"

export type Action = Dispatcher & (
  Increment |
  IncrementAgain
)

export enum Type {
  Increment = "Increment",
  IncrementAgain = "IncrementAgain"
}

export interface Increment {
  type: Type.Increment
  by: number
}
export const increment = (by: number): Increment => ({
  type: Type.Increment,
  by
})

export interface IncrementAgain {
  type: Type.IncrementAgain
  by: number
}
export const incrementAgain = (by: number): IncrementAgain => ({
  type: Type.IncrementAgain,
  by
})
