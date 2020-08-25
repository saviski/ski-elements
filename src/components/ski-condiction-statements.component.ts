import { attr, prototype, define } from '@ski/decorators'

class SkiCondiction extends HTMLElement {
  //
  @prototype('ski-else') fallback!: string
  placeholder: ChildNode

  constructor() {
    super()
    const tag = this.tagName.toLowerCase()
    this.placeholder =
      this.fallback && this.nextElementSibling?.matches(`[${this.fallback}]`)
        ? this.nextElementSibling
        : document.createComment(`<${tag}></${tag}>`)
  }

  toggle(show: boolean) {
    show
      ? this.placeholder.parentNode && this.placeholder.replaceWith(this)
      : this.parentNode && this.replaceWith(this.placeholder)
  }
}

@define('ski-if')
export class SkiIf extends SkiCondiction {
  @attr set if(show: 'if' | undefined) {
    this.toggle(show !== undefined)
  }
}

@define('ski-unless')
export class SkiUnless extends SkiCondiction {
  @attr set unless(hide: 'unless' | undefined) {
    this.toggle(hide === undefined)
  }
}

@define('ski-else')
export class SkiElse extends HTMLElement {}
