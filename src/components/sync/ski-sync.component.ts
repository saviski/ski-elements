import { LiveExpression } from '@ski/evalstream/evalstream.js'
import { nodedata } from '@ski/evalstream/evalstream.js'

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
    const expression = new LiveExpression(attr.value, this.target, attr.name)
    const stream = expression.run(nodedata(this.target))
    for await (let data of stream)
      attr.name.endsWith('?')
        ? this.toggle(attr.name.slice(0, -1), Boolean(data), attr)
        : this.apply(attr.name, data, attr)
  }

  abstract apply(name: string, value: any, attr: Attr)

  abstract toggle(name: string, enable: boolean, attr: Attr)
}
