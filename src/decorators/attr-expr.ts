import { MethodDecorator } from '@ski/decorators/decorators.js'
import { inject, mixinAttributes } from '@ski/mixins/mixins.js'
import { LiveExpression, nodedata } from '@ski/evalstream/evalstream.js'

class ExpressionAttributeDecorator extends MethodDecorator<HTMLElement, any, any> {
  decorateMethod({ constructor, property, descriptor } = this.params) {
    inject(constructor, mixinAttributes).defineAttribute(property, {
      async set(this: HTMLElement, expression: string = '') {
        const evaluator = new LiveExpression(expression, this, property)
        const stream = evaluator.run(nodedata(this))
        for await (const result of stream) descriptor.set!(result)
      },
    })
  }
}

export const expression_attr = ExpressionAttributeDecorator.decorator()
