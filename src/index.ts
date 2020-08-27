import SkiEventTrigger from './components/event-trigger.component.js'
import { ImportComponent } from './components/import.component.js'
import SkiData from './components/ski-data.component.js'
import { SkiComponentDeclaration } from './components/ski-declaration.component.js'
import { SkiElse, SkiIf, SkiUnless } from './components/statements/ski-if-unless-else.js'
import SkiList from './components/statements/ski-list.component.js'
import { SkiCase, SkiSwitch } from './components/statements/ski-switch-case.component.js'
import SkiComponent from './components/ski.component.js'
import SkiSetAttr from './components/sync/set-attr.component.js'
import SkiSetClass from './components/sync/set-class.component.js'
import SkiSetStyle from './components/sync/set-style.component.js'
import SkiVal from './components/sync/val.component.js'
import { expression_attr } from './decorators/attr-expr.js'
import { skicomponent } from './decorators/ski-component.js'
import skitemplate from './mixins/ski-template.js'
import watchClass from './mixins/watch-class.js'
import SkiStringTemplate from './components/sync/string-template.component.js'

declare global {
  interface HTMLElement {
    connectedCallback?(): void
    disconnectedCallback?(): void
    adoptedCallback?(): void
    attributeChangedCallback?(
      attribute: string,
      old?: string | null,
      value?: string | null
    ): void
  }
}

export {
  skitemplate,
  watchClass,
  skicomponent,
  ImportComponent,
  SkiComponent,
  SkiComponentDeclaration,
  SkiSetClass,
  SkiEventTrigger,
  SkiIf,
  SkiUnless,
  SkiElse,
  SkiData,
  SkiList,
  SkiVal,
  SkiSetStyle,
  SkiSetAttr,
  SkiSwitch,
  SkiCase,
  SkiStringTemplate,
  expression_attr,
}
