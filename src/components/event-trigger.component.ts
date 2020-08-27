import { define } from '@ski/decorators/decorators.js'
import SkiSync from './sync/ski-sync.component.js'

@define('event-trigger')
@define('ski-event-trigger')
export default class SkiEventTrigger extends SkiSync {
  apply() {
    throw new Error('Method not implemented.')
  }
  toggle() {
    throw new Error('Method not implemented.')
  }
}
