import { define } from '@ski/decorators'
import { assignSkidata } from '@ski/data'

@define('ski-list')
export default class SkiList<T> extends HTMLElement {
  childMap = new WeakMap()
  templateContent!: DocumentFragment

  connectedCallback() {
    if (!this.templateContent) {
      if (this.firstElementChild instanceof HTMLTemplateElement)
        this.templateContent = this.firstElementChild.content
      else {
        this.templateContent = document.createDocumentFragment()
        this.templateContent.append(...this.childNodes)
      }
    }
  }

  set of(value: T[]) {
    const varname = this.getAttribute('for')

    //TODO: do not use innerHTML to remove elements here
    this.innerHTML = ''
    this.append(
      ...value.map((item, index) => {
        const node = this.getNode(item)
        for (const childNode of node.childNodes)
          assignSkidata(
            childNode,
            varname ? { [varname]: item, index } : typeof item == 'object' ? item : {}
          )
        return node
      })
    )
  }

  getNode(item: any): Node {
    let node = typeof item == 'object' && this.childMap.get(item)
    if (!node) {
      node = this.templateContent.cloneNode(true)
      typeof item == 'object' && this.childMap.set(item, node)
    }
    return node
  }
}
