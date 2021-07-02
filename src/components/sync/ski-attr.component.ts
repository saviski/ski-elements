import SkiSync from './ski-sync.component.js'
import { tag } from '@ski/decorators/decorators.js'

const camelCase = (name: string) => name.replace(/-([a-z])/g, g => g[1].toUpperCase())

@tag('attr-map')
@tag('ski-attr')
export default class SkiSetAttr extends SkiSync {
  apply(name: string, value: any) {
    if (name.includes('.') || typeof value == 'object' || typeof value == 'function') {
      let chain = name.split('.').map(camelCase)
      let property = chain.pop()!
      let object = chain.reduce((data, name) => data[name] ?? data[name], this.target)
      object[property] = value
    } else {
      this.target.setAttribute(name, value)
    }
  }

  toggle(name: string, enable: boolean) {
    this.target.toggleAttribute(name, enable)
  }
}
