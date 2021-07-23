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
    const evaluator = new LiveExpression(expression, text, 'expression')
    const evalStream = evaluator.run(nodedata(text))
    // TODO: disconnect stream when text node is removed forever
    for await (let value of evalStream)
      if (text.ownerDocument) text.textContent = value?.toString()
      else evalStream.return(null)
  }
}
