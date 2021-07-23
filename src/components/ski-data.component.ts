import { $nodedata } from '@ski/evalstream/evalstream.js'
import { tag, event } from '@ski/decorators/decorators.js'
import { Emitter } from '@ski/events/events.js'

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

  skidata: any

  get [$nodedata]() {
    onRequestData.emit(this)
    return this.skidata
  }
}
