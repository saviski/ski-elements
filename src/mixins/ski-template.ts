import { setRootSkidata } from '@ski/data/data.js'

export const rootSkiData = Symbol('rootSkiData')

export default function skitemplate() {
  return <T extends CustomElementConstructor>(superclass: T) =>
    class extends superclass {
      [rootSkiData]?: any

      connectedCallback() {
        super.connectedCallback?.()
        this.shadowRoot && setRootSkidata(this.shadowRoot, this[rootSkiData] || this)
      }
    }
}
