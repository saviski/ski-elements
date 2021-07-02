import { mix, MixinWith } from '@ski/mixins/mixins.js'
import skitemplate from '../mixins/ski-template.js'

export default class SkiComponent extends skitemplate()(HTMLElement) {
  static with: MixinWith<typeof SkiComponent>['with'] = mix(SkiComponent).with
}
