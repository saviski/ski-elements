import { define } from '@ski/decorators/decorators.js'
import SkiVal from './val.component.js'

@define('ski-string-template')
export default class SkiStringTemplate extends SkiVal {
  //
  async run(expression: string) {
    super.run('`' + expression + '`')
  }
}
