/**
 * Increment and get a sequential number. This uses lambda and dynamo to implement
 * an atomic counter in a distributed environment.
 */

import promisify from 'es6-promisify'
import aws from 'aws-sdk'

const lambda = new aws.Lambda({
  region: 'us-east-1'
})

export async function incrementAndGet(counterName) {
  const invokeLambda = promisify(lambda.invoke.bind(lambda))

  const data = await invokeLambda({
    FunctionName: 'ape-dam-atomic-counter',
    Payload: JSON.stringify({ counterName })
  })

  const out = data.Payload
    .replace(/['']/g, '')
    .replace(/\"/g, '')

  return out
}
