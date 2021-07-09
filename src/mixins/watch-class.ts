import { spy } from '@ski/spy/spy.js'
import { rootSkiData } from './ski-template.js'

export default function watchClass() {
  return superclass =>
    class extends superclass {
      get [rootSkiData]() {
        return spy(this, true)
      }
    }
}
