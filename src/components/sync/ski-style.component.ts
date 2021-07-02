import { tag } from '@ski/decorators/decorators.js'
import SkiSync from './ski-sync.component.js'

@tag('style-map')
@tag('ski-style')
export default class SkiSetStyle extends SkiSync {
  apply(name: string, value: any) {
    this.target.style.setProperty(name, value)
  }

  toggle() {}
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
