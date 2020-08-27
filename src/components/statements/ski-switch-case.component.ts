import { define, attr } from '@ski/decorators/decorators.js'
import { expression_attr } from '../../decorators/attr-expr.js'

@define('ski-switch')
export class SkiSwitch extends HTMLElement {
  cases!: SkiCase[]
  active: ChildNode = this

  constructor() {
    super()
    this.cases = Array.from(this.children).filter(
      element => element instanceof SkiCase
    ) as SkiCase[]
    this.switch(undefined)
  }

  @expression_attr
  set switch(result: any) {
    this.active.replaceWith((this.active = this.match(result)))
  }

  private match(value: any): ChildNode {
    return (
      this.cases.find(element => element.case == value) ||
      this.cases.find(element => element.default) ||
      document.createComment(`<${this.nodeName}>`)
    )
  }
}

@define('ski-case')
export class SkiCase extends HTMLElement {
  @attr case?: string
  @attr default?: boolean
}
