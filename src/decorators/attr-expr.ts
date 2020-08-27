import { decorator, attr } from '@ski/decorators/decorators.js'
import { SkiStreamExpression } from '@ski/eval-stream/eval-stream.js'
import { skidata } from '@ski/data/data.js'

export const expression_attr = decorator<CustomElementConstructor | ((v: any) => void)>(
  ({ prototype, propertyKey, descriptor }) => {
    return attr<any, PropertyKey>(prototype, propertyKey, <ThisType<HTMLElement>>{
      async set(expression: string) {
        const evaluator = new SkiStreamExpression(expression, this)
        const stream = evaluator.run(skidata(this))
        for await (const result of stream) descriptor.set!(result)
      },
    })
  }
)
