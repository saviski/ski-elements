import '../util/request-document.js'
import { tag } from '@ski/decorators/decorators.js'

const imports = new Set<string>()

@tag('import-component')
@tag('ski-import')
export class ImportComponent extends HTMLElement {
  //
  target = this.attachShadow({ mode: 'open' })

  async connectedCallback() {
    if (this.getAttribute('src')) throw Error(this.localName + ' src tag is required')
    this.import(this.target)
  }

  get baseURI() {
    let src = this.getAttribute('src')
    return new URL(src!, this.getRootNode().baseURI).href
  }

  async import(container: ShadowRoot) {
    if (imports.has(this.baseURI)) return

    let base = document.createElement('base')
    base.href = this.baseURI
    try {
      const response = await fetch(base.href)
      const content = await response.document()
      document.head.prepend(base)
      container.append(content)
      imports.add(base.href)
    } catch (e) {
      throw new Error(`${e}\n\tat <${this.localName}> src ('${base.href}')`)
    } finally {
      base.remove()
    }
  }
}
