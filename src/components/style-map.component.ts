import { define } from '@ski/decorators'
import SkiSync from './core/ski-sync.component.js'

@define('style-map')
@define('ski-style-sync')
export default class SkiStyleMap extends SkiSync {
  apply(name: string, value: any) {
    this.target.style.setProperty(name, value)
  }

  toggle(name: string, enable: boolean, attr: Attr) {}
}

const UNITS = [
  'px',
  'em',
  'ex',
  'ch',
  'rem',
  'lh',
  'vw',
  'vh',
  'vmin',
  'vmax',
  'deg',
  'grad',
  'rad',
  'turn',
  's',
  'ms',
]

for (let unit of UNITS)
  Object.defineProperty(Number.prototype, unit, {
    get() {
      return this + unit
    },
  })

Object.defineProperty(Number.prototype, 'percent', {
  get() {
    return this + '%'
  },
})
