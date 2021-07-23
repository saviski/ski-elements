export * from './components/ski-component.js'
export * from './components/ski-import.component.js'
export * from './components/ski-data.component.js'
export * from './components/ski-component.component.js'

export * from './components/statements/ski-if-unless-else.js'
export * from './components/statements/ski-list.component.js'
export * from './components/statements/ski-switch-case.component.js'

export * from './components/sync/ski-attr.component.js'
export * from './components/sync/ski-class.component.js'
export * from './components/sync/ski-style.component.js'
export * from './components/sync/ski-val.component.js'
export * from './components/sync/ski-string.component.js'

export * from './decorators/attr-expr.js'

declare global {
  interface HTMLElement {
    connectedCallback?(): void
    disconnectedCallback?(): void
    adoptedCallback?(): void
    attributeChangedCallback?(attribute: string, old?: string | null, value?: string | null): void
  }
}
