import { tag } from '@ski/decorators/decorators.js'
import { SkiStreamExpression } from '@ski/eval-stream/eval-stream.js'
import { skidata } from '@ski/data/data.js'

@tag('ski-val')
export default class SkiVal extends HTMLElement {
  //
  constructor() {
    super()
    this.run(this.getAttribute('value') || this.textContent || '')
  }

  async run(expression: string) {
    const text = document.createTextNode('')
    this.replaceWith(text)
    const evaluator = new SkiStreamExpression(expression, text)
    const evalStream = evaluator.run(skidata(text))
    // TODO: disconnect stream when text node is removed forever
    for await (let value of evalStream)
      if (text.ownerDocument) text.textContent = value
      else evalStream.return()
  }
}
