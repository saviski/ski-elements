import watchClass from '../mixins/watch-class.js'
import { decorator, Constructor } from '@ski/decorators/decorators.js'

export const watch = decorator<Constructor>(({ constructor }) =>
  watchClass()(constructor)
)
