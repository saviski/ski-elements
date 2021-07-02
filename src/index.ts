import { ImportComponent } from './components/ski-import.component.js'
import SkiData from './components/ski-data.component.js'
import { SkiComponentDeclaration } from './components/ski-component.component.js'
import { SkiElse, SkiIf, SkiUnless } from './components/statements/ski-if-unless-else.js'
import SkiList from './components/statements/ski-list.component.js'
import { SkiCase, SkiSwitch } from './components/statements/ski-switch-case.component.js'
import SkiComponent from './components/ski-component.js'
import SkiSetAttr from './components/sync/ski-attr.component.js'
import SkiSetClass from './components/sync/ski-class.component.js'
import SkiSetStyle from './components/sync/ski-style.component.js'
import SkiVal from './components/sync/ski-val.component.js'
import { expression_attr } from './decorators/attr-expr.js'
import { skicomponent } from './decorators/ski-component.js'
import skitemplate from './mixins/ski-template.js'
import watchClass from './mixins/watch-class.js'
import SkiStringTemplate from './components/sync/ski-string.component.js'

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
