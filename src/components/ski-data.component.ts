import { tag, event, prop } from '@ski/decorators/decorators.js'
import { Emitter } from '@ski/events/events.js'
import { setRootSkidata } from '@ski/data/data.js'

const onRequestData = new Emitter(
  'requestdata',
  class extends Event {
    readonly target!: SkiData

    set skidata(data: any) {
      this.target.skidata = data
    }
  }
)

@tag('ski-data')
export default class SkiData extends HTMLElement {
  //
  @event onrequestdata = onRequestData.event

  connectedCallback() {
    onRequestData.emit(this)
  }

  @prop set skidata(data: any) {
    // A proxy here is required to restrict the object __proto__ chain
    // otherwise, for example, { __proto__: htmlElement }.attributes will fail
    // we need to ignore the third param "receiver" from Reflect.get
    const proxy = new Proxy(data, { get: (t, p) => t[p] })
    const value = Object.create(proxy)
    setRootSkidata(this, value)
  }
}
