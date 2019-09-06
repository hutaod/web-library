import { say2 } from './word.js'

export function say(name) {
  return 'hello ' + name + say2(name)
}
