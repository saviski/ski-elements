import { Mixin } from '@ski/mixins/mixins.js'

export default class SkiComponent extends HTMLElement {
  static with = new Mixin(SkiComponent).with
}
