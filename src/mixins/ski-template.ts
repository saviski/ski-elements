import { setRootSkidata } from '@ski/data/data.js'
import { Mixin } from '@ski/mixins/mixins.js'

export const rootSkiData = Symbol('rootSkiData')

export default function skitemplate(): Mixin<CustomElementConstructor> {
  return <T extends CustomElementConstructor>(superclass: T): T =>
    class extends superclass {
      [rootSkiData]?: any

      connectedCallback() {
        super.connectedCallback && super.connectedCallback()
        setRootSkidata(this.shadowRoot!, this[rootSkiData] || this)
      }
    }
}
