import { tag } from '@ski/decorators/decorators.js'
import { expression_attr } from '../../decorators/attr-expr.js'

class SkiCondiction extends HTMLElement {
  //
  wrapperBegin = document.createComment(`<${this.localName}>`)
  wrapperEnd = document.createComment(`</${this.localName}>`)
  content = Array.from(this.childNodes)
  fallback: ChildNode[] = []

  constructor() {
    super()
    this.content = Array.from(this.childNodes)
    if (this.nextElementSibling instanceof SkiElse) {
      this.fallback = Array.from(this.nextElementSibling.childNodes)
      this.nextElementSibling.remove()
    }
    this.replaceWith(this.wrapperBegin)
    this.wrapperBegin.after(this.wrapperEnd)
    this.toggle(false)
  }

  removeNodes(nodeList: ChildNode[]) {
    nodeList.forEach(node => node.remove())
  }

  toggle(show: boolean) {
    this.wrapperBegin.after(...(show ? this.content : this.fallback))
    this.removeNodes(show ? this.fallback : this.content)
  }
}

@tag('ski-if')
export class SkiIf extends SkiCondiction {
  @expression_attr
  set if(result: any) {
    this.toggle(result)
  }
}

@tag('ski-unless')
export class SkiUnless extends SkiCondiction {
  @expression_attr
  set unless(result: any) {
    this.toggle(!result)
  }
}

@tag('ski-else')
export class SkiElse extends HTMLElement {}
