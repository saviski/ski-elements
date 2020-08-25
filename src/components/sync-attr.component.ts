import SkiSync from './core/ski-sync.component.js'
import { define } from '@ski/decorators'

const camelCase = (name: string) => name.replace(/-([a-z])/g, g => g[1].toUpperCase())

@define('sync-attr')
@define('attr-list')
@define('ski-attr')
export default class SkiSynconizedAttributes extends SkiSync {
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
