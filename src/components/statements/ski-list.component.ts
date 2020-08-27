import { define } from '@ski/decorators/decorators.js'
import { assignSkidata } from '@ski/data/data.js'

@define('ski-list')
export default class SkiList<T> extends HTMLElement {
  //
  wrapperBegin = document.createComment(`<${this.localName}>`)
  wrapperEnd = document.createComment(`</${this.localName}>`)

  nodeMap = new WeakMap<object, ChildNode>()
  templateContent!: DocumentFragment
  nodes: ChildNode[] = []

  constructor() {
    super()
    if (this.firstElementChild instanceof HTMLTemplateElement)
      this.templateContent = this.firstElementChild.content
    else {
      this.templateContent = document.createDocumentFragment()
      this.templateContent.append(...this.childNodes)
    }
    this.replaceWith(this.wrapperBegin)
    this.wrapperBegin.after(this.wrapperEnd)
  }

  set of(value: T[]) {
    const varname = this.getAttribute('for')
    const indexname = this.getAttribute('index')

    const nodes = value.map((item, index) => {
      const node = this.getNode(item)
      const data = varname
        ? { [varname]: item, [indexname || 'index']: index }
        : typeof item == 'object'
        ? item
        : {}
      for (const childNode of node.childNodes) assignSkidata(childNode, data)
      return node
    })
    this.nodes.forEach(node => nodes.includes(node) || node.remove())
    this.wrapperBegin.after(...nodes)
    this.nodes = nodes
  }

  getNode(item: any): ChildNode {
    let node = item && typeof item == 'object' && this.nodeMap.get(item)
    if (!node) {
      node = this.templateContent.cloneNode(true) as ChildNode
      item && typeof item == 'object' && this.nodeMap.set(item, node)
    }
    return node
  }
}
