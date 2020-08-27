import { define, attr, prop } from '@ski/decorators/decorators.js'
import { setRootSkidata } from '@ski/data/data.js'

@define('ski-data')
export default class SkiData extends HTMLElement {
  @attr onrequestdata?: string

  connectedCallback() {
    if (this.onrequestdata) this.skidata = new Function(this.onrequestdata)()
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
