import SkiSync from './core/ski-sync.component.js'
import { define } from '@ski/decorators'

@define('ski-class-sync')
@define('class-list')
/**
 * Toggle element classes defined as attribute with live updates
 * @param attr An attribute with name starting with . (dot)
 * The attribute name can be chained like .name1.name2.name3
 *
 * @explample condictional element class
 * ```html
 * <span .name1.name2="expressionA" .name3="expressionB">text</span>
 * ```
 * will be transformed into:
 * ```html
 * <span class="name1 name2">text</span>
 * ```
 * if expressionA evaluates to `true` and expressionB evaluates to `false`
 *
 * if expression is missing, the condiction is considered to be truty and the class is added to the element class list
 * @explample conditionless element class
 * ```html
 * <span .name1 .name2>text</span>
 * ```
 * will be transformed into:
 * ```html
 * <span class="name1 name2">text</span>
 * ```
 */
export default class SkiClassList extends SkiSync {
  apply(name: string, enable: any, attr: Attr) {
    const classes = name.split('.')
    const toggle = enable || (enable === undefined && Boolean(attr.value))
    for (let name of classes) name && this.target.classList.toggle(name, toggle)
  }

  toggle(name: string, enable: boolean, attr: Attr) {
    this.apply(name, enable, attr)
  }
}
