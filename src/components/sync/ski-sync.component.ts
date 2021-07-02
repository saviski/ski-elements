import { SkiStreamExpression } from '@ski/eval-stream/eval-stream.js'
import { skidata } from '@ski/data/data.js'

export default abstract class SkiSync extends HTMLElement {
  get target(): HTMLElement {
    const targetId = this.getAttribute('target')
    const target = targetId ? document.getElementById(targetId) : this.parentElement
    if (!target) throw new Error('Missing target')
    return target
  }

  connectedCallback() {
    this.remove()
    for (const attr of this.attributes) this.execute(attr)
  }

  async execute(attr: Attr) {
    const expression = new SkiStreamExpression(attr.value, this.target)
    const stream = expression.run(skidata(this.target))
    for await (let data of stream)
      attr.name.endsWith('?')
        ? this.toggle(attr.name.slice(0, -1), Boolean(data), attr)
        : this.apply(attr.name, data, attr)
  }

  abstract apply(name: string, value: any, attr: Attr)

  abstract toggle(name: string, enable: boolean, attr: Attr)
}
