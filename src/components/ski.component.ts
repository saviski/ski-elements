import { skicomponent } from '../decorators/ski-component'
import { mix, MixinWith } from '@ski/mixins'

export default class SkiComponent extends skicomponent(HTMLElement) {
  static with: MixinWith<typeof SkiComponent>['with'] = mix(SkiComponent).with
}
