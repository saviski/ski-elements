import { importModuleContent } from '../util/import-module-content.js'
import { mix, attributes, content, baseURI } from '@ski/mixins/mixins.js'
import { define } from '@ski/decorators/decorators.js'

@define('ski-component')
export class SkiComponentDeclaration extends HTMLElement {
  //
  private content: DocumentFragment

  componentClass?: typeof HTMLElement

  constructor() {
    super()
    if (this.firstElementChild instanceof HTMLTemplateElement)
      this.content = this.firstElementChild.content
    else {
      this.content = document.createDocumentFragment()
      this.content.append(...this.childNodes)
    }
    this.createComponent()
  }

  get templateAttributes() {
    return Object.fromEntries(
      this.getAttribute('attributes')
        ?.trim()
        .split(/,?\s+/)
        .map(name => [name, undefined]) ?? []
    )
  }

  get name() {
    return this.getAttribute('name')
  }

  get extends() {
    return this.getAttribute('extends') || undefined
  }

  async createComponent() {
    const componentBaseURI = this.getRootNode().baseURI

    const modules = await Promise.all(
      Array.from(this.content.querySelectorAll<HTMLScriptElement>('script')).map(
        module => (module.remove(), importModuleContent(module, componentBaseURI))
      )
    ).then(list => Object.assign({}, ...list))

    const componentClass: typeof HTMLElement =
      modules.default || (await this.createClass(this.extends))

    const componentWithTemplate = mix(componentClass).with(
      content(this.content),
      baseURI(componentBaseURI)
    )

    customElements.define(this.name || componentClass['is'], componentWithTemplate)
    this.componentClass = componentClass
  }

  private async createClass(extendsComponent?: string) {
    const baseComponent: typeof HTMLElement = extendsComponent
      ? (await customElements.whenDefined(extendsComponent),
        await customElements.get(extendsComponent))
      : HTMLElement

    return mix(baseComponent).with(attributes(this.templateAttributes))
  }
}
