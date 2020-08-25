import { define } from '@ski/decorators'
import SkiSync from './core/ski-sync.component'

@define('event-trigger')
@define('ski-event-trigger')
export default class SkiEventTrigger extends SkiSync {
  apply(name: string, value: any, attr: Attr) {
    throw new Error('Method not implemented.')
  }
  toggle(name: string, enable: boolean, attr: Attr) {
    throw new Error('Method not implemented.')
  }
}
