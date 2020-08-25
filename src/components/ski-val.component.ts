import { define } from '@ski/decorators'
import { SkiObservableExpresion } from '@ski/eval-stream'
import { skidata } from '@ski/data'

@define('ski-val')
export default class SkiVal extends HTMLElement {
  constructor(content?: string) {
    super()
    if (content && !this.innerText) this.innerText = content
    this.run()
  }

  async run() {
    const text = document.createTextNode('')
    this.replaceWith(text)
    const expression = new SkiObservableExpresion(this.textContent!, text)
    const evalStream = expression.run(skidata(text))
    // TODO: disconnect stream when text node is removed forever
    for await (let value of evalStream)
      if (text.ownerDocument) text.textContent = value
      else evalStream.return()
  }
}
