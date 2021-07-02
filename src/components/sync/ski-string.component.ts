import { tag } from '@ski/decorators/decorators.js'
import SkiVal from './ski-val.component.js'

@tag('ski-string')
export default class SkiStringTemplate extends SkiVal {
  //
  async run(expression: string) {
    super.run('`' + expression + '`')
  }
}
