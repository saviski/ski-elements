import { attr, tag } from '@ski/decorators/decorators.js'
import { LiveExpression, nodedata } from '@ski/evalstream/evalstream.js'

@tag('ski-val')
export default class SkiVal extends HTMLElement {
  //
  @attr value?: string

  constructor() {
    super()
    this.run(this.getAttribute('value') || this.textContent || '')
  }

  async run(expression: string) {
    const text = document.createTextNode('')
    this.replaceWith(text)
    const evaluator = new LiveExpression<any>(expression, text, 'expression')
    const evalStream = evaluator.run(nodedata(text))

    for await (let value of evalStream) {
      if (!text.ownerDocument) {
        evalStream.return(null)
        break
      }
      text.textContent = String(value)
    }
  }
}
