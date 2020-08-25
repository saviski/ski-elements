import { SkiObservableExpresion } from '@ski/eval-stream'
import { skidata } from '@ski/data'

export default abstract class SkiSync extends HTMLElement {
  target!: HTMLElement

  connectedCallback() {
    this.target = this.parentElement!
    this.remove()
    for (const attr of this.attributes) this.execute(attr)
  }

  async execute(attr: Attr) {
    const expression = new SkiObservableExpresion(attr.value, this.target)
    const stream = expression.run(skidata(this.target))
    for await (let data of stream)
      attr.name.endsWith('?')
        ? this.toggle(attr.name.slice(0, -1), Boolean(data), attr)
        : this.apply(attr.name, data, attr)
  }

  abstract apply(name: string, value: any, attr: Attr)

  abstract toggle(name: string, enable: boolean, attr: Attr)
}
